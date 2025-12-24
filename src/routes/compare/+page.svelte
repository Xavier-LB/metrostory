<script lang="ts">
	import { stations, lines, linesById } from '$lib';
	import type { Station } from '$lib/types';
	import MetroMap from '$lib/components/Map/MetroMap.svelte';
	import SchematicMap from '$lib/components/Map/SchematicMap.svelte';
	import StationPanel from '$lib/components/Station/StationPanel.svelte';

	let selectedStation = $state<Station | null>(null);
	let activeMap = $state<'geographic' | 'schematic'>('geographic');

	function handleStationSelect(station: Station) {
		selectedStation = station;
	}

	function handleClose() {
		selectedStation = null;
	}
</script>

<svelte:head>
	<title>Comparar Mapas - MetroStory</title>
</svelte:head>

<div class="flex h-screen w-screen flex-col bg-gray-900">
	<!-- Header con selector -->
	<header class="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-4 py-3">
		<div>
			<h1 class="text-xl font-bold text-white">
				Comparar <span class="text-red-500">Estilos de Mapa</span>
			</h1>
			<p class="text-sm text-gray-400">Elige el estilo que prefieres para MetroStory</p>
		</div>

		<!-- Toggle de mapas -->
		<div class="flex rounded-lg bg-gray-700 p-1">
			<button
				class="rounded-md px-4 py-2 text-sm font-medium transition-all {activeMap === 'geographic'
					? 'bg-red-500 text-white'
					: 'text-gray-300 hover:text-white'}"
				onclick={() => (activeMap = 'geographic')}
			>
				🗺️ Geográfico
			</button>
			<button
				class="rounded-md px-4 py-2 text-sm font-medium transition-all {activeMap === 'schematic'
					? 'bg-red-500 text-white'
					: 'text-gray-300 hover:text-white'}"
				onclick={() => (activeMap = 'schematic')}
			>
				📐 Esquemático
			</button>
		</div>

		<a
			href="/"
			class="rounded-lg bg-gray-700 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-600 hover:text-white"
		>
			← Volver
		</a>
	</header>

	<!-- Contenido principal -->
	<div class="flex flex-1 overflow-hidden">
		<!-- Mapa activo -->
		<div class="relative flex-1">
			{#if activeMap === 'geographic'}
				<MetroMap {stations} {lines} {selectedStation} onStationSelect={handleStationSelect} />
				<div class="absolute bottom-4 right-4 max-w-xs rounded-lg bg-gray-800/90 p-4 backdrop-blur">
					<h3 class="mb-2 font-semibold text-white">🗺️ Mapa Geográfico</h3>
					<ul class="space-y-1 text-sm text-gray-300">
						<li>✓ Ubicación real de las estaciones</li>
						<li>✓ Contexto de la ciudad</li>
						<li>✓ Zoom y navegación fluida</li>
						<li>✓ Efecto glow en líneas</li>
						<li class="text-gray-500">✗ Líneas curvas menos claras</li>
					</ul>
				</div>
			{:else}
				<SchematicMap {selectedStation} onStationSelect={handleStationSelect} />
				<div class="absolute bottom-4 right-4 max-w-xs rounded-lg bg-gray-800/90 p-4 backdrop-blur">
					<h3 class="mb-2 font-semibold text-white">📐 Mapa Esquemático</h3>
					<ul class="space-y-1 text-sm text-gray-300">
						<li>✓ Diseño limpio y claro</li>
						<li>✓ Fácil de leer</li>
						<li>✓ Estilo icónico del metro</li>
						<li>✓ Animaciones suaves</li>
						<li class="text-gray-500">✗ Sin contexto geográfico</li>
					</ul>
				</div>
			{/if}
		</div>

		<!-- Panel lateral -->
		{#if selectedStation}
			<aside class="w-80 overflow-y-auto border-l border-gray-700 bg-gray-800">
				<StationPanel station={selectedStation} {linesById} onClose={handleClose} />
			</aside>
		{/if}
	</div>
</div>
