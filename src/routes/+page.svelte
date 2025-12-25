<script lang="ts">
	import { stations, lines, linesById, futureLines, ghostStations, rollingStock } from '$lib';
	import type { Station, MetroLine } from '$lib/types';
	import MetroMap from '$lib/components/Map/MetroMap.svelte';
	import StationPanel from '$lib/components/Station/StationPanel.svelte';
	import LinePanel from '$lib/components/Line/LinePanel.svelte';
	import { memoria2024, expansionProjects, formatNumber } from '$lib/data/memoria2024';

	let selectedStation = $state<Station | null>(null);
	let selectedLine = $state<MetroLine | null>(null);
	let isPanelOpen = $state(false);
	let isLinePanelOpen = $state(false);
	let showInfoPanel = $state(false);
	let activeInfoTab = $state<'ghost' | 'trains'>('ghost');

	// Datos actualizados de la Memoria 2024
	const TOTAL_STATIONS = memoria2024.network.stations; // 143
	const TOTAL_LENGTH = memoria2024.network.extension; // 149

	function handleStationSelect(station: Station) {
		selectedStation = station;
		isPanelOpen = true;
		// Close line panel if open
		isLinePanelOpen = false;
	}

	function handleLineSelect(line: MetroLine) {
		selectedLine = line;
		isLinePanelOpen = true;
		// Close station panel if open
		isPanelOpen = false;
	}

	function handleClose() {
		isPanelOpen = false;
		setTimeout(() => {
			selectedStation = null;
		}, 300);
	}

	function handleLineClose() {
		isLinePanelOpen = false;
		setTimeout(() => {
			selectedLine = null;
		}, 300);
	}

	function toggleInfoPanel() {
		showInfoPanel = !showInfoPanel;
		// Close other panels when opening info panel
		if (showInfoPanel) {
			isPanelOpen = false;
			isLinePanelOpen = false;
		}
	}

	function handleInfoClose() {
		showInfoPanel = false;
	}
</script>

<svelte:head>
	<title>MetroStory - Historia del Metro de Santiago</title>
</svelte:head>

<div class="relative h-dvh w-screen overflow-hidden bg-[var(--bg-primary)]">
	<!-- Decorative metro line accent at top -->
	<div class="metro-gradient absolute left-0 right-0 top-0 z-50 h-1"></div>

	<!-- Main Layout - Full screen map -->
	<div class="relative h-full w-full">
		<!-- Map Container - Full screen -->
		<div class="absolute inset-0">
			<MetroMap {stations} {lines} {selectedStation} onStationSelect={handleStationSelect} disableFlyToOnMobile={true} />
		</div>

		<!-- Header - Metro identity -->
		<header class="animate-slide-up absolute left-4 top-4 z-20 md:left-8 md:top-8">
			<!-- Logo -->
			<img src="/logo.svg" alt="MetroStory" class="h-14 w-auto opacity-90 md:h-20" />
		</header>

		<!-- Line Legend - Hidden on mobile, shown on md+ -->
		<div
			class="glass animate-slide-up absolute bottom-4 left-4 z-20 hidden rounded-xl border border-[var(--border-light)] p-3 shadow-[var(--shadow-lg)] md:bottom-8 md:left-8 md:block"
			style="animation-delay: 100ms"
		>
			<!-- Stats Row -->
			<div class="mb-3 flex items-center justify-center gap-6 border-b border-[var(--border-light)] pb-3">
				<div class="text-center">
					<p class="font-display text-lg font-bold text-[var(--text-primary)]">{TOTAL_LENGTH}</p>
					<p class="text-[7px] uppercase tracking-wide text-[var(--text-muted)]">km</p>
				</div>
				<div class="text-center">
					<p class="font-display text-lg font-bold text-[var(--text-primary)]">{TOTAL_STATIONS}</p>
					<p class="text-[7px] uppercase tracking-wide text-[var(--text-muted)]">estaciones</p>
				</div>
				<div class="text-center">
					<p class="font-display text-lg font-bold text-[var(--text-primary)]">{formatNumber(memoria2024.passengers.dailyAverage)}</p>
					<p class="text-[7px] uppercase tracking-wide text-[var(--text-muted)]">pax/día</p>
				</div>
			</div>

			<!-- Operating Lines -->
			<div class="grid grid-cols-2 gap-x-3 gap-y-1">
				{#each lines as line, i (line.id)}
					<button
						onclick={() => handleLineSelect(line)}
						class="group flex items-center gap-2 rounded-md px-1.5 py-1 transition-all duration-200 hover:bg-[var(--bg-accent)]"
						style="animation-delay: {150 + i * 50}ms"
					>
						<div
							class="flex h-5 w-5 items-center justify-center rounded-full shadow-sm transition-transform duration-200 group-hover:scale-110"
							style="background-color: {line.color}"
						>
							<span class="font-display text-[8px] font-bold text-white">
								{line.id.replace('L', '')}
							</span>
						</div>
						<span class="font-display text-[11px] font-medium text-[var(--text-secondary)]">
							{line.name}
						</span>
					</button>
				{/each}
			</div>

			<!-- Future Lines -->
			<div class="mt-2 border-t border-[var(--border-light)] pt-2">
				<p class="mb-1.5 text-[8px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">En expansión</p>
				<div class="space-y-0.5">
					{#each futureLines as line}
						<button
							onclick={() => handleLineSelect(line)}
							class="group flex w-full items-center gap-2 rounded-md px-1.5 py-1 text-left transition-all hover:bg-[var(--bg-accent)]"
						>
							<div
								class="flex h-4 w-4 items-center justify-center rounded-full opacity-80 transition-transform group-hover:scale-110"
								style="background-color: {line.color}"
							>
								<span class="font-display text-[7px] font-bold text-white">
									{line.id === 'L6-ext' ? '6' : line.id.replace('L', '')}
								</span>
							</div>
							<span class="font-display text-[10px] font-medium text-[var(--text-secondary)]">
								{line.name}
							</span>
							{#if line.status === 'construction'}
								<span class="ml-auto text-[8px] font-bold text-amber-600">
									{expansionProjects.find(p => p.line === line.id)?.progress || 0}%
								</span>
							{:else}
								<span class="ml-auto text-[8px] text-[var(--text-muted)]">{line.inauguratedAt}</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

			<!-- 2033 Vision + Curiosidades -->
			<div class="mt-2 flex items-center gap-2 border-t border-[var(--border-light)] pt-2">
				<div class="flex-1 rounded-md bg-[var(--bg-accent)]/50 px-2 py-1.5">
					<p class="text-[7px] font-bold uppercase text-[var(--text-tertiary)]">2033</p>
					<p class="font-display text-sm font-bold" style="color: var(--metro-l7)">{memoria2024.expansion.futureExtension} km</p>
				</div>
				<button
					onclick={toggleInfoPanel}
					class="flex items-center gap-1 rounded-md bg-[var(--bg-tertiary)] px-2.5 py-2 font-display text-[9px] font-bold uppercase text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-accent)]"
				>
					<span>Más</span>
					<svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>

		<!-- Mobile Line Legend - Compact row -->
		<div
			class="glass animate-slide-up absolute bottom-4 left-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-[var(--border-light)] p-3 shadow-[var(--shadow-lg)] md:hidden"
			style="animation-delay: 100ms"
		>
			<!-- Lines -->
			<div class="flex flex-1 items-center justify-center gap-2">
				{#each lines as line (line.id)}
					<button
						onclick={() => handleLineSelect(line)}
						class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-sm transition-transform duration-200 active:scale-95"
						style="background-color: {line.color}"
					>
						<span class="font-display text-[10px] font-bold text-white">
							{line.id.replace('L', '')}
						</span>
					</button>
				{/each}
			</div>
			<!-- Divider -->
			<div class="h-6 w-px flex-shrink-0 bg-[var(--border-light)]"></div>
			<!-- Explore more button -->
			<button
				onclick={toggleInfoPanel}
				class="flex h-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--metro-l1)] px-3 shadow-sm transition-transform duration-200 active:scale-95"
			>
				<span class="font-display text-[9px] font-bold uppercase tracking-wide text-white">Más</span>
			</button>
		</div>


		<!-- Info Panel Overlay (Ghost Stations, Trains) -->
		<aside
			class="absolute right-0 top-0 z-40 h-full w-full transform border-l border-[var(--border-light)] bg-[var(--bg-secondary)] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out md:w-[420px] {showInfoPanel
				? 'translate-x-0'
				: 'translate-x-full'}"
		>
			<div class="flex h-full flex-col">
				<!-- Header -->
				<header class="relative border-b border-[var(--border-light)] px-4 pb-4 pt-6 md:px-6 md:pb-6 md:pt-8">
					<!-- Colored accent bar -->
					<div class="metro-gradient absolute left-0 right-0 top-0 h-1"></div>

					<div class="flex items-start justify-between">
						<div class="flex-1">
							<h2 class="font-display text-2xl font-bold text-[var(--text-primary)]">
								Curiosidades
							</h2>
							<p class="mt-1 font-ui text-xs text-[var(--text-tertiary)]">
								Historias ocultas y material rodante del Metro
							</p>
						</div>

						<!-- Close button -->
						<button
							onclick={handleInfoClose}
							class="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-tertiary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
							aria-label="Cerrar panel"
						>
							<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					<!-- Tabs -->
					<div class="mt-4 flex gap-2">
						<button
							onclick={() => (activeInfoTab = 'ghost')}
							class="rounded-full px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider transition-colors {activeInfoTab === 'ghost'
								? 'bg-[var(--text-primary)] text-white'
								: 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:bg-[var(--bg-accent)]'}"
						>
							Estaciones Fantasma
						</button>
						<button
							onclick={() => (activeInfoTab = 'trains')}
							class="rounded-full px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider transition-colors {activeInfoTab === 'trains'
								? 'bg-[var(--metro-l5)] text-white'
								: 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:bg-[var(--bg-accent)]'}"
						>
							Trenes
						</button>
					</div>
				</header>

				<!-- Content -->
				<div class="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
					{#if activeInfoTab === 'ghost'}
						<div class="space-y-4">
							<p class="font-body text-sm text-[var(--text-secondary)]">
								Estaciones construidas pero nunca abiertas al público
							</p>
							{#each ghostStations as station}
								<div class="rounded-xl bg-[var(--bg-tertiary)] p-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white"
										>
											<span class="text-lg">👻</span>
										</div>
										<div class="flex-1">
											<span class="font-display text-base font-bold text-[var(--text-primary)]">
												{station.name}
											</span>
											<span class="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-[9px] font-bold uppercase text-gray-600">
												{station.lines[0]}
											</span>
										</div>
									</div>
									<p class="mt-3 font-body text-sm leading-relaxed text-[var(--text-secondary)]">
										{station.history}
									</p>
									{#if station.ghostInfo}
										<div class="mt-3 rounded-lg bg-[var(--bg-accent)] p-3 text-xs text-[var(--text-tertiary)]">
											<strong class="text-[var(--text-secondary)]">Estado:</strong>
											{station.ghostInfo.currentState}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{:else if activeInfoTab === 'trains'}
						<div class="space-y-4">
							<p class="font-body text-sm text-[var(--text-secondary)]">
								Material rodante desde 1975 hasta hoy
							</p>
							{#each rollingStock as train}
								<div class="rounded-xl bg-[var(--bg-tertiary)] p-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full {train.rodadura ===
											'neumatica'
												? 'bg-[var(--metro-l1)]'
												: 'bg-[var(--metro-l4)]'} text-white"
										>
											<span class="text-lg">🚇</span>
										</div>
										<div class="flex-1">
											<span class="font-display text-base font-bold text-[var(--text-primary)]">
												{train.model}
											</span>
										</div>
										<span
											class="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase {train.status ===
											'active'
												? 'bg-green-100 text-green-700'
												: train.status === 'retiring'
													? 'bg-amber-100 text-amber-700'
													: train.status === 'upcoming'
														? 'bg-blue-100 text-blue-700'
														: 'bg-gray-100 text-gray-600'}"
										>
											{train.status === 'active'
												? 'Activo'
												: train.status === 'retiring'
													? 'Retirándose'
													: train.status === 'upcoming'
														? 'Próximo'
														: 'Retirado'}
										</span>
									</div>
									<div class="mt-2 font-ui text-xs text-[var(--text-tertiary)]">
										{train.manufacturer} ({train.country}) • {train.yearIntroduced}
									</div>
									<div class="mt-3 flex flex-wrap gap-1.5">
										{#each train.lines as lineId}
											<span
												class="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
												style="background-color: {linesById[lineId]?.color || '#888'}"
											>
												{lineId}
											</span>
										{/each}
									</div>
									<ul class="mt-3 space-y-1 font-body text-xs text-[var(--text-secondary)]">
										{#each train.characteristics.slice(0, 3) as char}
											<li>• {char}</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		</aside>

		<!-- Instructions hint - Hidden on mobile -->
		<div class="animate-fade-in absolute right-8 top-8 z-20 hidden md:block" style="animation-delay: 400ms">
			<div
				class="glass flex items-center gap-3 rounded-xl border border-[var(--border-light)] px-4 py-2.5 shadow-[var(--shadow-md)]"
			>
				<div class="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--metro-l1)]/10">
					<div class="h-2 w-2 rounded-full bg-[var(--metro-l1)]"></div>
				</div>
				<span class="font-display text-[11px] font-medium uppercase tracking-wide text-[var(--text-secondary)]">
					Selecciona una estación
				</span>
			</div>
		</div>

		<!-- Station Panel Overlay -->
		<aside
			class="absolute right-0 top-0 z-40 h-full w-full transform border-l border-[var(--border-light)] bg-[var(--bg-secondary)] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out md:w-[420px] {isPanelOpen
				? 'translate-x-0'
				: 'translate-x-full'}"
		>
			{#if selectedStation}
				<StationPanel station={selectedStation} {linesById} onClose={handleClose} />
			{/if}
		</aside>

		<!-- Line Panel Overlay -->
		<aside
			class="absolute right-0 top-0 z-40 h-full w-full transform border-l border-[var(--border-light)] bg-[var(--bg-secondary)] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out md:w-[420px] {isLinePanelOpen
				? 'translate-x-0'
				: 'translate-x-full'}"
		>
			{#if selectedLine}
				<LinePanel line={selectedLine} onClose={handleLineClose} />
			{/if}
		</aside>
	</div>

	<!-- Subtle grain overlay -->
	<div class="grain pointer-events-none absolute inset-0"></div>
</div>

<style>
	/* Override Mapbox styles for light theme */
	:global(.mapboxgl-ctrl-attrib) {
		background: rgba(255, 255, 255, 0.85) !important;
		backdrop-filter: blur(8px);
		border-radius: 8px !important;
		padding: 4px 8px !important;
		font-family: var(--font-ui) !important;
		font-size: 10px !important;
	}

	:global(.mapboxgl-ctrl-logo) {
		opacity: 0.6;
	}
</style>
