<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import type { Station, MetroLine } from '$lib/types';

	interface Props {
		stations: Station[];
		lines: MetroLine[];
		selectedStation: Station | null;
		onStationSelect: (station: Station) => void;
	}

	let { stations, lines, selectedStation, onStationSelect }: Props = $props();

	let container: HTMLDivElement;
	let map: mapboxgl.Map | null = null;

	const accessToken = import.meta.env.VITE_MAPBOX_TOKEN;
	// Light theme style for the map
	const style = import.meta.env.VITE_MAPBOX_STYLE || 'mapbox://styles/mapbox/light-v11';
	const center = [-70.65, -33.45] as [number, number];
	const zoom = 12;

	// Mapeo de colores por línea (basado en los datos del GeoJSON existente)
	const lineColors: [string, string][] = [
		['LINEA 1', '#D60D27'],
		['LINEA 2', '#FAB515'],
		['LINEA 3', '#9A5B29'],
		['LINEA 4', '#2D2B73'],
		['LINEA 4A', '#0471B9'],
		['LINEA 5', '#179859'],
		['LINEA 6', '#9A3488'],
		['Linea 1', '#D60D27'],
		['Linea 2', '#FAB515'],
		['Linea 3', '#9A5B29'],
		['Linea 4', '#2D2B73'],
		['Linea 4A', '#0471B9'],
		['Linea 5', '#179859'],
		['Linea 6', '#9A3488']
	];

	onMount(() => {
		if (!accessToken) {
			console.error('Mapbox token no configurado');
			return;
		}

		mapboxgl.accessToken = accessToken;

		map = new mapboxgl.Map({
			container,
			style,
			center,
			zoom,
			minZoom: 10,
			maxZoom: 18
		});

		map.on('load', () => {
			if (!map) return;

			// Cargar GeoJSON de líneas
			map.addSource('metro-lines', {
				type: 'geojson',
				data: '/lines.geojson'
			});

			// Cargar GeoJSON de estaciones
			map.addSource('metro-stations', {
				type: 'geojson',
				data: '/stops.geojson'
			});

			// === CAPAS DE LÍNEAS ===

			// Glow exterior de las líneas (efecto neón)
			map.addLayer({
				id: 'metro-lines-glow',
				type: 'line',
				source: 'metro-lines',
				paint: {
					'line-color': [
						'match',
						['get', 'linea'],
						...lineColors.flat(),
						'#888888'
					],
					'line-width': ['interpolate', ['linear'], ['zoom'], 10, 12, 14, 20],
					'line-opacity': 0.15,
					'line-blur': 8
				}
			});

			// Línea principal
			map.addLayer({
				id: 'metro-lines-layer',
				type: 'line',
				source: 'metro-lines',
				paint: {
					'line-color': [
						'match',
						['get', 'linea'],
						...lineColors.flat(),
						'#888888'
					],
					'line-width': ['interpolate', ['linear'], ['zoom'], 10, 3, 14, 5, 18, 7],
					'line-opacity': 1
				},
				layout: {
					'line-cap': 'round',
					'line-join': 'round'
				}
			});

			// === CAPAS DE ESTACIONES ===

			// Glow de estaciones
			map.addLayer({
				id: 'metro-stations-glow',
				type: 'circle',
				source: 'metro-stations',
				paint: {
					'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 8, 14, 16, 18, 24],
					'circle-color': [
						'match',
						['get', 'linea'],
						...lineColors.flat(),
						'#888888'
					],
					'circle-opacity': 0.2,
					'circle-blur': 1
				}
			});

			// Círculo exterior de estación
			map.addLayer({
				id: 'metro-stations-outer',
				type: 'circle',
				source: 'metro-stations',
				paint: {
					'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 5, 14, 9, 18, 14],
					'circle-color': [
						'match',
						['get', 'linea'],
						...lineColors.flat(),
						'#888888'
					],
					'circle-opacity': 1
				}
			});

			// Círculo interior de estación (blanco)
			map.addLayer({
				id: 'metro-stations-layer',
				type: 'circle',
				source: 'metro-stations',
				paint: {
					'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 3, 14, 6, 18, 10],
					'circle-color': '#ffffff',
					'circle-opacity': 1
				}
			});

			// Capa de etiquetas mejorada - dark text for light theme
			map.addLayer({
				id: 'metro-stations-labels',
				type: 'symbol',
				source: 'metro-stations',
				layout: {
					'text-field': ['get', 'nombre'],
					'text-font': ['DIN Pro Bold', 'Arial Unicode MS Bold'],
					'text-size': ['interpolate', ['linear'], ['zoom'], 12, 10, 14, 12, 18, 16],
					'text-offset': [0, 1.8],
					'text-anchor': 'top',
					'text-max-width': 8
				},
				paint: {
					'text-color': '#1a1918',
					'text-halo-color': 'rgba(255, 255, 255, 0.95)',
					'text-halo-width': 2,
					'text-halo-blur': 0.5
				},
				minzoom: 12
			});

			// Interactividad - buscar por nombre
			map.on('click', 'metro-stations-layer', (e) => {
				if (!e.features?.[0]) return;
				const props = e.features[0].properties;
				if (!props?.nombre) return;

				// Buscar estación por nombre (normalizado)
				const stationName = props.nombre.toLowerCase().replace(/\s+/g, '-');
				const station = stations.find(
					(s) => s.id === stationName || s.name.toUpperCase() === props.nombre
				);

				if (station) {
					onStationSelect(station);
				} else {
					// Si no existe en nuestros datos, crear una estación temporal
					const coords = (e.features[0].geometry as GeoJSON.Point).coordinates as [
						number,
						number
					];
					const tempStation: Station = {
						id: stationName,
						name: props.nombre,
						coordinates: coords,
						lines: [props.linea?.replace('Linea ', 'L').replace('LINEA ', 'L') || 'L1'],
						inauguratedAt: '',
						history: 'Información histórica pendiente de agregar.',
						isTransfer: false,
						isTerminal: false,
						isAccessible: true
					};
					onStationSelect(tempStation);
				}
			});

			map.on('mouseenter', 'metro-stations-layer', () => {
				if (map) map.getCanvas().style.cursor = 'pointer';
			});

			map.on('mouseleave', 'metro-stations-layer', () => {
				if (map) map.getCanvas().style.cursor = '';
			});
		});
	});

	onDestroy(() => {
		map?.remove();
	});

	// Efecto para centrar en estación seleccionada
	$effect(() => {
		if (selectedStation && map) {
			map.flyTo({
				center: selectedStation.coordinates,
				zoom: 15,
				duration: 1000
			});
		}
	});
</script>

<div bind:this={container} class="h-full w-full"></div>
