<script lang="ts">
	import type { Station } from '$lib/types';
	import { lines } from '$lib/data/lines';

	interface Props {
		selectedStation: Station | null;
		onStationSelect: (station: Station) => void;
	}

	let { selectedStation, onStationSelect }: Props = $props();

	// Configuración del mapa esquemático - tamaños reducidos
	const config = {
		width: 320,
		height: 220,
		stationRadius: 1.2,
		transferRadius: 1.8,
		lineWidth: 1.2,
		glowWidth: 3
	};

	// Estaciones con posiciones esquemáticas optimizadas - más espaciadas
	type SchematicStation = {
		x: number;
		y: number;
		name: string;
		lines: string[];
		isTerminal?: boolean;
	};

	const schematicStations: Record<string, SchematicStation> = {
		// === LÍNEA 1 (Roja) - Horizontal principal ===
		'san-pablo': { x: 30, y: 100, name: 'San Pablo', lines: ['L1', 'L5'], isTerminal: false },
		neptuno: { x: 40, y: 100, name: 'Neptuno', lines: ['L1'] },
		pajaritos: { x: 50, y: 100, name: 'Pajaritos', lines: ['L1'] },
		'las-rejas': { x: 60, y: 100, name: 'Las Rejas', lines: ['L1'] },
		ecuador: { x: 70, y: 100, name: 'Ecuador', lines: ['L1'] },
		usach: { x: 80, y: 100, name: 'Usach', lines: ['L1'] },
		'estacion-central': { x: 90, y: 100, name: 'Est. Central', lines: ['L1'] },
		ula: { x: 100, y: 100, name: 'ULA', lines: ['L1'] },
		republica: { x: 110, y: 100, name: 'República', lines: ['L1'] },
		'los-heroes': { x: 120, y: 100, name: 'Los Héroes', lines: ['L1', 'L2'] },
		'la-moneda': { x: 130, y: 100, name: 'La Moneda', lines: ['L1'] },
		'u-de-chile': { x: 140, y: 100, name: 'U. de Chile', lines: ['L1', 'L3'] },
		'santa-lucia': { x: 150, y: 100, name: 'Santa Lucía', lines: ['L1'] },
		'u-catolica': { x: 160, y: 100, name: 'U. Católica', lines: ['L1'] },
		baquedano: { x: 170, y: 100, name: 'Baquedano', lines: ['L1', 'L5'] },
		salvador: { x: 182, y: 94, name: 'Salvador', lines: ['L1'] },
		'manuel-montt': { x: 194, y: 88, name: 'M. Montt', lines: ['L1'] },
		'pedro-de-valdivia': { x: 206, y: 82, name: 'P. Valdivia', lines: ['L1'] },
		'los-leones': { x: 218, y: 76, name: 'Los Leones', lines: ['L1', 'L6'] },
		tobalaba: { x: 230, y: 70, name: 'Tobalaba', lines: ['L1', 'L4'] },
		'el-golf': { x: 242, y: 64, name: 'El Golf', lines: ['L1'] },
		alcantara: { x: 254, y: 58, name: 'Alcántara', lines: ['L1'] },
		'escuela-militar': { x: 266, y: 52, name: 'Esc. Militar', lines: ['L1'] },
		manquehue: { x: 278, y: 46, name: 'Manquehue', lines: ['L1'] },
		'hernando-magallanes': { x: 290, y: 40, name: 'H. Magallanes', lines: ['L1'] },
		'los-dominicos': { x: 302, y: 34, name: 'Los Dominicos', lines: ['L1'], isTerminal: true },

		// === LÍNEA 2 (Amarilla) - Vertical ===
		'vespucio-norte': { x: 120, y: 20, name: 'Vespucio Norte', lines: ['L2'], isTerminal: true },
		zapadores: { x: 120, y: 30, name: 'Zapadores', lines: ['L2'] },
		dorsal: { x: 120, y: 40, name: 'Dorsal', lines: ['L2'] },
		einstein: { x: 120, y: 50, name: 'Einstein', lines: ['L2'] },
		'patronato': { x: 120, y: 60, name: 'Patronato', lines: ['L2'] },
		'cerro-blanco': { x: 120, y: 70, name: 'Cerro Blanco', lines: ['L2'] },
		'cal-y-canto': { x: 120, y: 80, name: 'Cal y Canto', lines: ['L2', 'L3'] },
		'puente-cal-y-canto': { x: 120, y: 90, name: 'Puente Cal y Canto', lines: ['L2'] },
		// los-heroes ya está en L1 (y=100)
		toesca: { x: 120, y: 110, name: 'Toesca', lines: ['L2'] },
		'parque-ohiggins': { x: 120, y: 120, name: "Parque O'Higgins", lines: ['L2', 'L6'] },
		rondizzoni: { x: 120, y: 130, name: 'Rondizzoni', lines: ['L2'] },
		franklin: { x: 120, y: 140, name: 'Franklin', lines: ['L2'] },
		'el-llano': { x: 120, y: 150, name: 'El Llano', lines: ['L2'] },
		'san-miguel': { x: 120, y: 160, name: 'San Miguel', lines: ['L2'] },
		'la-cisterna': { x: 120, y: 170, name: 'La Cisterna', lines: ['L2', 'L4A'] },
		'lo-ovalle': { x: 120, y: 180, name: 'Lo Ovalle', lines: ['L2'] },
		'ciudad-del-nino': { x: 120, y: 190, name: 'Ciudad del Niño', lines: ['L2'], isTerminal: true },

		// === LÍNEA 3 (Café) ===
		'los-libertadores': { x: 145, y: 30, name: 'Los Libertadores', lines: ['L3'], isTerminal: true },
		'cardenal-caro': { x: 145, y: 40, name: 'Cardenal Caro', lines: ['L3'] },
		'vivaceta': { x: 145, y: 50, name: 'Vivaceta', lines: ['L3'] },
		'conchali': { x: 145, y: 60, name: 'Conchalí', lines: ['L3'] },
		'plaza-chacabuco': { x: 145, y: 70, name: 'Pza. Chacabuco', lines: ['L3'] },
		// cal-y-canto: se une con L2
		'plaza-de-armas': { x: 140, y: 90, name: 'Pza. de Armas', lines: ['L3', 'L5'] },
		// u-de-chile: se une con L1
		'parque-almagro': { x: 150, y: 110, name: 'Parque Almagro', lines: ['L3'] },
		'matta': { x: 160, y: 120, name: 'Matta', lines: ['L3'] },
		'irarrazaval': { x: 170, y: 130, name: 'Irarrázaval', lines: ['L3', 'L5'] },
		'montt-varas': { x: 180, y: 140, name: 'Montt-Varas', lines: ['L3'] },
		'plaza-egana': { x: 190, y: 150, name: 'Plaza Egaña', lines: ['L3', 'L4'] },
		'los-orientales': { x: 200, y: 160, name: 'Los Orientales', lines: ['L3'] },
		'fernando-castillo': { x: 210, y: 170, name: 'F. Castillo V.', lines: ['L3'], isTerminal: true },

		// === LÍNEA 4 (Azul) ===
		// tobalaba: combinación con L1
		'cristobal-colon': { x: 242, y: 76, name: 'C. Colón', lines: ['L4'] },
		'francisco-bilbao': { x: 254, y: 82, name: 'F. Bilbao', lines: ['L4'] },
		'principe-de-gales': { x: 254, y: 94, name: 'P. de Gales', lines: ['L4'] },
		'simon-bolivar': { x: 254, y: 106, name: 'S. Bolívar', lines: ['L4'] },
		grecia: { x: 254, y: 118, name: 'Grecia', lines: ['L4'] },
		'los-orientales-l4': { x: 254, y: 130, name: 'Los Orientales', lines: ['L4'] },
		quilin: { x: 254, y: 142, name: 'Quilín', lines: ['L4'] },
		'las-torres': { x: 242, y: 150, name: 'Las Torres', lines: ['L4'] },
		macul: { x: 230, y: 150, name: 'Macul', lines: ['L4'] },
		// plaza-egana: combinación con L3
		'los-presidentes': { x: 200, y: 160, name: 'Los Presidentes', lines: ['L4'] },
		'vicente-valdes': { x: 200, y: 170, name: 'V. Valdés', lines: ['L4', 'L4A', 'L5'] },
		'rojas-magallanes': { x: 200, y: 182, name: 'Rojas Magallanes', lines: ['L4'] },
		'trinidad': { x: 200, y: 194, name: 'Trinidad', lines: ['L4'], isTerminal: true },

		// === LÍNEA 4A (Celeste) ===
		// la-cisterna: combinación con L2
		'santa-rosa': { x: 140, y: 170, name: 'Santa Rosa', lines: ['L4A'] },
		'la-granja': { x: 160, y: 170, name: 'La Granja', lines: ['L4A'] },
		'santa-julia': { x: 180, y: 170, name: 'Santa Julia', lines: ['L4A'] },
		// vicente-valdes: combinación con L4/L5

		// === LÍNEA 5 (Verde) ===
		'plaza-de-maipu': { x: 10, y: 140, name: 'Pza. Maipú', lines: ['L5'], isTerminal: true },
		'santiago-bueras': { x: 20, y: 134, name: 'S. Bueras', lines: ['L5'] },
		'del-sol': { x: 30, y: 128, name: 'Del Sol', lines: ['L5'] },
		'monte-tabor': { x: 40, y: 122, name: 'Monte Tabor', lines: ['L5'] },
		'laguna-sur': { x: 50, y: 116, name: 'Laguna Sur', lines: ['L5'] },
		'barrancas': { x: 60, y: 110, name: 'Barrancas', lines: ['L5'] },
		pudahuel: { x: 70, y: 104, name: 'Pudahuel', lines: ['L5'] },
		// san-pablo: combinación con L1
		'lo-prado': { x: 40, y: 100, name: 'Lo Prado', lines: ['L5'] },
		'quinta-normal': { x: 100, y: 100, name: 'Quinta Normal', lines: ['L5'] },
		'cumming': { x: 110, y: 100, name: 'Cumming', lines: ['L5'] },
		'santa-ana': { x: 130, y: 100, name: 'Santa Ana', lines: ['L5'] },
		// plaza-de-armas: combinación con L3
		'bellas-artes': { x: 150, y: 100, name: 'Bellas Artes', lines: ['L5'] },
		// baquedano: combinación con L1
		'parque-bustamante': { x: 180, y: 106, name: 'P. Bustamante', lines: ['L5'] },
		'santa-isabel': { x: 190, y: 112, name: 'Santa Isabel', lines: ['L5'] },
		// irarrazaval: combinación con L3
		nuble: { x: 180, y: 140, name: 'Ñuble', lines: ['L5'] },
		'rodrigo-de-araya': { x: 190, y: 146, name: 'R. de Araya', lines: ['L5'] },
		'carlos-valdovinos': { x: 200, y: 152, name: 'C. Valdovinos', lines: ['L5'] },
		'camino-agricola': { x: 200, y: 162, name: 'C. Agrícola', lines: ['L5'] },
		// vicente-valdes: combinación con L4/L4A
		'san-joaquin': { x: 210, y: 178, name: 'San Joaquín', lines: ['L5'] },
		pedrero: { x: 220, y: 184, name: 'Pedrero', lines: ['L5'] },
		mirador: { x: 230, y: 190, name: 'Mirador', lines: ['L5'] },
		bellavista: { x: 240, y: 196, name: 'Bellavista L.P.', lines: ['L5'], isTerminal: true },

		// === LÍNEA 6 (Morada) ===
		cerrillos: { x: 70, y: 150, name: 'Cerrillos', lines: ['L6'], isTerminal: true },
		'lo-valledor': { x: 80, y: 144, name: 'Lo Valledor', lines: ['L6'] },
		'pedro-aguirre-cerda': { x: 90, y: 138, name: 'P. A. Cerda', lines: ['L6'] },
		'franklin-l6': { x: 100, y: 132, name: 'Franklin', lines: ['L6'] },
		'bio-bio': { x: 110, y: 126, name: 'Bío Bío', lines: ['L6'] },
		// parque-ohiggins: combinación con L2
		'hospitales': { x: 175, y: 88, name: 'Hospitales', lines: ['L6'] },
		'nunoa': { x: 185, y: 82, name: 'Ñuñoa', lines: ['L3', 'L6'] },
		'estadio-nacional': { x: 195, y: 76, name: 'Est. Nacional', lines: ['L6'] },
		'ines-de-suarez': { x: 205, y: 70, name: 'I. de Suárez', lines: ['L6'] }
		// los-leones: combinación con L1
	};

	// Definición de las líneas con paths SVG - ajustados al nuevo layout
	const schematicLines = [
		{
			id: 'L1',
			color: '#D60D27',
			path: 'M 30,100 H 170 Q 178,100 186,94 L 302,34'
		},
		{
			id: 'L2',
			color: '#FAB515',
			path: 'M 120,20 V 190'
		},
		{
			id: 'L3',
			color: '#9A5B29',
			path: 'M 145,30 V 70 L 120,80 M 140,90 L 140,100 L 210,170'
		},
		{
			id: 'L4',
			color: '#2D2B73',
			path: 'M 230,70 L 254,82 V 142 L 190,150 V 194'
		},
		{
			id: 'L4A',
			color: '#0471B9',
			path: 'M 120,170 H 200'
		},
		{
			id: 'L5',
			color: '#179859',
			path: 'M 10,140 L 30,100 H 170 Q 180,106 190,112 L 170,130 V 170 L 200,170 L 240,196'
		},
		{
			id: 'L6',
			color: '#9A3488',
			path: 'M 70,150 L 120,120 M 175,88 L 218,76'
		}
	];

	let hoveredStation = $state<string | null>(null);
	let scale = $state(1);
	let panX = $state(0);
	let panY = $state(0);
	let isPanning = $state(false);
	let startPan = $state({ x: 0, y: 0 });

	function handleStationClick(stationId: string) {
		const data = schematicStations[stationId];
		if (!data) return;

		const station: Station = {
			id: stationId,
			name: data.name,
			coordinates: [-70.65, -33.45],
			lines: data.lines,
			inauguratedAt: '',
			history: `Historia de la estación ${data.name}. El origen de su nombre y su importancia en la red de metro.`,
			isTransfer: data.lines.length > 1,
			isTerminal: data.isTerminal ?? false,
			isAccessible: true
		};
		onStationSelect(station);
	}

	function getLineColor(lineId: string): string {
		const line = lines.find((l) => l.id === lineId);
		return line?.color ?? '#888';
	}

	function isTransfer(station: SchematicStation): boolean {
		return station.lines.length > 1;
	}

	// Determina si mostrar el nombre de la estación
	function shouldShowLabel(station: SchematicStation, id: string): boolean {
		// Mostrar si: está seleccionada, hover, es terminal, o es combinación
		return (
			selectedStation?.id === id ||
			hoveredStation === id ||
			station.isTerminal === true ||
			station.lines.length > 1
		);
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		const delta = e.deltaY > 0 ? 0.9 : 1.1;
		scale = Math.max(0.5, Math.min(4, scale * delta));
	}

	function handleMouseDown(e: MouseEvent) {
		if (e.button === 0) {
			isPanning = true;
			startPan = { x: e.clientX - panX, y: e.clientY - panY };
		}
	}

	function handleMouseMove(e: MouseEvent) {
		if (isPanning) {
			panX = e.clientX - startPan.x;
			panY = e.clientY - startPan.y;
		}
	}

	function handleMouseUp() {
		isPanning = false;
	}

	function resetView() {
		scale = 1;
		panX = 0;
		panY = 0;
	}

	function zoomIn() {
		scale = Math.min(4, scale * 1.3);
	}

	function zoomOut() {
		scale = Math.max(0.5, scale / 1.3);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative h-full w-full overflow-hidden bg-gray-900"
	onwheel={handleWheel}
	onmousedown={handleMouseDown}
	onmousemove={handleMouseMove}
	onmouseup={handleMouseUp}
	onmouseleave={handleMouseUp}
>
	<!-- Header -->
	<header class="absolute left-4 top-4 z-20">
		<h1 class="text-2xl font-black tracking-tight text-white">
			Metro<span class="text-red-500">Story</span>
		</h1>
		<p class="text-xs font-medium text-gray-400">Mapa Esquemático</p>
	</header>

	<!-- Controles de zoom -->
	<div class="absolute right-4 top-4 z-20 flex flex-col gap-1">
		<button
			onclick={zoomIn}
			class="flex h-8 w-8 items-center justify-center rounded bg-gray-800/90 text-white shadow transition-colors hover:bg-gray-700"
			title="Acercar"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
		</button>
		<button
			onclick={zoomOut}
			class="flex h-8 w-8 items-center justify-center rounded bg-gray-800/90 text-white shadow transition-colors hover:bg-gray-700"
			title="Alejar"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
			</svg>
		</button>
		<button
			onclick={resetView}
			class="flex h-8 w-8 items-center justify-center rounded bg-gray-800/90 text-white shadow transition-colors hover:bg-gray-700"
			title="Restablecer"
		>
			<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
				/>
			</svg>
		</button>
	</div>

	<!-- SVG del mapa -->
	<svg
		viewBox="0 0 {config.width} {config.height}"
		class="h-full w-full"
		style="transform: scale({scale}) translate({panX / scale}px, {panY / scale}px); cursor: {isPanning
			? 'grabbing'
			: 'grab'}"
		preserveAspectRatio="xMidYMid meet"
	>
		<defs>
			<!-- Filtro de glow suave -->
			<filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
				<feGaussianBlur stdDeviation="1" result="coloredBlur" />
				<feMerge>
					<feMergeNode in="coloredBlur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<!-- Glow de líneas (capa inferior) -->
		{#each schematicLines as line (line.id)}
			<path
				d={line.path}
				fill="none"
				stroke={line.color}
				stroke-width={config.glowWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
				opacity="0.12"
				filter="url(#glow)"
			/>
		{/each}

		<!-- Líneas del metro -->
		{#each schematicLines as line (line.id)}
			<path
				d={line.path}
				fill="none"
				stroke={line.color}
				stroke-width={config.lineWidth}
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		{/each}

		<!-- Estaciones -->
		{#each Object.entries(schematicStations) as [id, station] (id)}
			{@const transfer = isTransfer(station)}
			{@const isSelected = selectedStation?.id === id}
			{@const isHovered = hoveredStation === id}
			{@const showLabel = shouldShowLabel(station, id)}

			<g
				class="cursor-pointer"
				onmouseenter={() => (hoveredStation = id)}
				onmouseleave={() => (hoveredStation = null)}
				onclick={() => handleStationClick(id)}
				role="button"
				tabindex="0"
				onkeydown={(e) => e.key === 'Enter' && handleStationClick(id)}
			>
				<!-- Glow de estación al hover -->
				{#if isHovered || isSelected}
					<circle
						cx={station.x}
						cy={station.y}
						r={transfer ? config.transferRadius + 2 : config.stationRadius + 1.5}
						fill={getLineColor(station.lines[0])}
						opacity="0.5"
						filter="url(#glow)"
					/>
				{/if}

				<!-- Círculo exterior (color de línea) -->
				<circle
					cx={station.x}
					cy={station.y}
					r={transfer ? config.transferRadius : config.stationRadius}
					fill={isSelected ? getLineColor(station.lines[0]) : 'white'}
					stroke={getLineColor(station.lines[0])}
					stroke-width={transfer ? 0.8 : 0.5}
				/>

				<!-- Indicador de combinación (segundo anillo) -->
				{#if transfer && station.lines.length >= 2}
					<circle
						cx={station.x}
						cy={station.y}
						r={config.transferRadius - 0.6}
						fill="none"
						stroke={getLineColor(station.lines[1])}
						stroke-width="0.5"
					/>
				{/if}

				<!-- Nombre de la estación - solo si debe mostrarse -->
				{#if showLabel}
					<text
						x={station.x}
						y={station.y - (transfer ? 4 : 3)}
						text-anchor="middle"
						dominant-baseline="middle"
						class="pointer-events-none select-none"
						fill="white"
						font-size="2"
						font-weight={transfer ? '600' : '400'}
						opacity={isHovered || isSelected ? 1 : 0.85}
					>
						{station.name}
					</text>
				{/if}
			</g>
		{/each}
	</svg>

	<!-- Leyenda compacta -->
	<div class="absolute bottom-4 left-4 rounded-lg bg-gray-800/90 p-3 shadow-lg backdrop-blur-sm">
		<h3 class="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Líneas</h3>
		<div class="grid grid-cols-2 gap-x-4 gap-y-1">
			{#each lines as line (line.id)}
				<div class="flex items-center gap-1.5">
					<div class="h-1.5 w-5 rounded-full" style="background-color: {line.color}"></div>
					<span class="text-[10px] text-white">{line.name}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Info de estación seleccionada -->
	{#if selectedStation}
		<div class="absolute bottom-4 right-4 max-w-xs rounded-lg bg-gray-800/90 p-3 shadow-lg backdrop-blur-sm">
			<div class="flex items-center gap-1.5">
				{#each selectedStation.lines as lineId}
					<span
						class="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
						style="background-color: {getLineColor(lineId)}; color: white"
					>
						{lineId}
					</span>
				{/each}
			</div>
			<h3 class="mt-1.5 text-sm font-bold text-white">{selectedStation.name}</h3>
		</div>
	{:else}
		<div class="absolute bottom-4 right-4 text-[10px] text-gray-500">
			Scroll para zoom · Arrastra para mover
		</div>
	{/if}
</div>
