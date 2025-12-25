<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import mapboxgl from 'mapbox-gl';
	import along from '@turf/along';
	import length from '@turf/length';
	import { lineString, featureCollection, point } from '@turf/helpers';
	import type { Station, MetroLine } from '$lib/types';
	import type { Feature, LineString, Point, FeatureCollection } from 'geojson';
	import {
		getAnimationSpeed,
		getTrainCount,
		normalizeLineId,
		getCurrentHeadway
	} from '$lib/data/frequencies';

	interface Props {
		stations: Station[];
		lines: MetroLine[];
		selectedStation: Station | null;
		onStationSelect: (station: Station) => void;
		disableFlyToOnMobile?: boolean;
	}

	let { stations, lines, selectedStation, onStationSelect, disableFlyToOnMobile = false }: Props = $props();

	// Detectar si es móvil
	function isMobile(): boolean {
		if (typeof window === 'undefined') return false;
		return window.innerWidth < 768;
	}

	let container: HTMLDivElement;
	let map: mapboxgl.Map | null = null;
	let animationId: number | null = null;

	// Datos de trenes animados
	interface Train {
		id: string;
		lineId: string;
		color: string;
		coordinates: [number, number][];
		length: number;
		progress: number; // 0-1
		speed: number;
		direction: 1 | -1;
	}

	let trains: Train[] = [];

	// Colores de líneas para trenes
	const lineColorMap: Record<string, string> = {
		'LINEA 1': '#D60D27',
		'LINEA 2': '#FAB515',
		'LINEA 3': '#9A5B29',
		'LINEA 4': '#2D2B73',
		'LINEA 4A': '#0471B9',
		'LINEA 5': '#179859',
		'LINEA 6': '#9A3488'
	};

	// Inicializar trenes desde el GeoJSON usando frecuencias reales
	async function initTrains() {
		const response = await fetch('/lines.geojson');
		const geojson = await response.json();

		trains = [];
		let trainId = 0;

		for (const feature of geojson.features) {
			if (!feature.geometry) continue;

			const lineaName = feature.properties?.linea || 'LINEA 1';
			const lineId = normalizeLineId(lineaName);
			const color = lineColorMap[lineaName] || '#888888';

			// Extraer coordenadas según el tipo de geometría
			let allCoords: [number, number][][] = [];

			if (feature.geometry.type === 'LineString') {
				allCoords.push(feature.geometry.coordinates as [number, number][]);
			} else if (feature.geometry.type === 'MultiLineString') {
				allCoords = feature.geometry.coordinates as [number, number][][];
			}

			// Crear trenes para cada segmento
			for (const coords of allCoords) {
				if (coords.length < 2) continue;

				const line = lineString(coords);
				const lineLength = length(line, { units: 'kilometers' });

				if (lineLength < 0.5) continue; // Ignorar segmentos muy cortos

				// Calcular número de trenes basado en frecuencia real
				const numTrains = getTrainCount(lineId, lineLength);
				// Velocidad basada en frecuencia real
				const baseSpeed = getAnimationSpeed(lineId, lineLength);

				for (let i = 0; i < numTrains; i++) {
					trains.push({
						id: `train-${trainId++}`,
						lineId: lineaName,
						color,
						coordinates: coords,
						length: lineLength,
						progress: i / numTrains, // Distribuir trenes uniformemente
						speed: baseSpeed * (0.9 + Math.random() * 0.2), // Pequeña variación
						direction: i % 2 === 0 ? 1 : -1 // Alternar direcciones
					});
				}
			}
		}
	}

	// Obtener posición del tren en la línea
	function getTrainPosition(train: Train): [number, number] {
		const line = lineString(train.coordinates);
		const distance = train.progress * train.length;
		const pos = along(line, distance, { units: 'kilometers' });
		return pos.geometry.coordinates as [number, number];
	}

	// Calcular bearing (ángulo de dirección) del tren
	function getTrainBearing(train: Train): number {
		const line = lineString(train.coordinates);
		const distance = train.progress * train.length;
		const nextDistance = Math.min(train.length, distance + 0.1);

		const pos1 = along(line, distance, { units: 'kilometers' });
		const pos2 = along(line, nextDistance, { units: 'kilometers' });

		const [lng1, lat1] = pos1.geometry.coordinates;
		const [lng2, lat2] = pos2.geometry.coordinates;

		// Calcular bearing en grados
		const dLng = ((lng2 - lng1) * Math.PI) / 180;
		const lat1Rad = (lat1 * Math.PI) / 180;
		const lat2Rad = (lat2 * Math.PI) / 180;

		const y = Math.sin(dLng) * Math.cos(lat2Rad);
		const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);

		let bearing = (Math.atan2(y, x) * 180) / Math.PI;

		// Si va en dirección contraria, invertir
		if (train.direction === -1) {
			bearing += 180;
		}

		return bearing;
	}

	// Actualizar posiciones de trenes
	function updateTrains() {
		for (const train of trains) {
			train.progress += train.speed * train.direction;

			// Rebote en los extremos
			if (train.progress >= 1) {
				train.progress = 1;
				train.direction = -1;
			} else if (train.progress <= 0) {
				train.progress = 0;
				train.direction = 1;
			}
		}
	}

	// Crear GeoJSON de trenes para el mapa
	function getTrainsGeoJSON(): FeatureCollection<Point> {
		const features = trains.map((train) => {
			const coords = getTrainPosition(train);
			const bearing = getTrainBearing(train);
			return point(coords, {
				id: train.id,
				color: train.color,
				lineId: train.lineId,
				bearing: bearing
			});
		});
		return featureCollection(features);
	}

	// Loop de animación
	function animate() {
		updateTrains();

		if (map && map.getSource('trains')) {
			(map.getSource('trains') as mapboxgl.GeoJSONSource).setData(getTrainsGeoJSON());
		}

		animationId = requestAnimationFrame(animate);
	}

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

			// Cargar GeoJSON de estaciones (coordenadas correctas sobre las líneas)
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

			// === TRENES ANIMADOS (estilo Mini Metro) ===
			initTrains().then(() => {
				if (!map) return;

				// Crear icono de tren rectangular para cada color de línea
				const trainColors = [
					{ id: 'train-l1', color: '#D60D27' },
					{ id: 'train-l2', color: '#FAB515' },
					{ id: 'train-l3', color: '#9A5B29' },
					{ id: 'train-l4', color: '#2D2B73' },
					{ id: 'train-l4a', color: '#0471B9' },
					{ id: 'train-l5', color: '#179859' },
					{ id: 'train-l6', color: '#9A3488' }
				];

				// Crear iconos de tren rectangulares (orientados paralelos a la línea)
				for (const { id, color } of trainColors) {
					const size = 40;
					const width = size * 0.55; // Ancho del tren
					const height = size * 0.9; // Largo del tren (en dirección de movimiento)
					const canvas = document.createElement('canvas');
					canvas.width = size;
					canvas.height = size;
					const ctx = canvas.getContext('2d')!;

					// Centrar el rectángulo
					const x = (size - width) / 2;
					const y = (size - height) / 2;
					const radius = 4;

					// Sombra sutil
					ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
					ctx.shadowBlur = 3;
					ctx.shadowOffsetY = 1;

					// Rectángulo redondeado con color de línea
					ctx.beginPath();
					ctx.roundRect(x, y, width, height, radius);
					ctx.fillStyle = color;
					ctx.fill();

					// Borde blanco fino
					ctx.shadowColor = 'transparent';
					ctx.strokeStyle = '#ffffff';
					ctx.lineWidth = 1.5;
					ctx.stroke();

					map.addImage(id, { width: size, height: size, data: ctx.getImageData(0, 0, size, size).data });
				}

				// Fuente de datos para trenes
				map.addSource('trains', {
					type: 'geojson',
					data: getTrainsGeoJSON()
				});

				// Capa de trenes con iconos rectangulares
				map.addLayer({
					id: 'trains-layer',
					type: 'symbol',
					source: 'trains',
					layout: {
						'icon-image': [
							'match',
							['get', 'lineId'],
							'LINEA 1', 'train-l1',
							'LINEA 2', 'train-l2',
							'LINEA 3', 'train-l3',
							'LINEA 4', 'train-l4',
							'LINEA 4A', 'train-l4a',
							'LINEA 5', 'train-l5',
							'LINEA 6', 'train-l6',
							'Linea 1', 'train-l1',
							'Linea 2', 'train-l2',
							'Linea 3', 'train-l3',
							'Linea 4', 'train-l4',
							'Linea 4A', 'train-l4a',
							'Linea 5', 'train-l5',
							'Linea 6', 'train-l6',
							'train-l1' // default
						],
						'icon-size': ['interpolate', ['linear'], ['zoom'], 10, 0.25, 14, 0.4, 18, 0.6],
						'icon-rotate': ['get', 'bearing'],
						'icon-rotation-alignment': 'map',
						'icon-allow-overlap': true,
						'icon-ignore-placement': true
					}
				});

				// Iniciar animación
				animate();
			});
		});
	});

	onDestroy(() => {
		// Detener animación
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		map?.remove();
	});

	// Efecto para centrar en estación seleccionada (solo en desktop)
	$effect(() => {
		if (selectedStation && map) {
			// Skip flyTo on mobile if disabled
			if (disableFlyToOnMobile && isMobile()) {
				return;
			}
			map.flyTo({
				center: selectedStation.coordinates,
				zoom: 15,
				duration: 1000
			});
		}
	});
</script>

<div bind:this={container} class="h-full w-full"></div>
