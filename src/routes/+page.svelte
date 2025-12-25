<script lang="ts">
	import { stations, lines, linesById, futureLines, ghostStations, rollingStock } from '$lib';
	import type { Station, MetroLine } from '$lib/types';
	import MetroMap from '$lib/components/Map/MetroMap.svelte';
	import StationPanel from '$lib/components/Station/StationPanel.svelte';
	import LinePanel from '$lib/components/Line/LinePanel.svelte';

	let selectedStation = $state<Station | null>(null);
	let selectedLine = $state<MetroLine | null>(null);
	let isPanelOpen = $state(false);
	let isLinePanelOpen = $state(false);
	let showInfoPanel = $state(false);
	let activeInfoTab = $state<'future' | 'ghost' | 'trains'>('future');

	// Total real de estaciones del Metro de Santiago (136 únicas, no duplicadas por combinaciones)
	const TOTAL_STATIONS = 136;
	// Longitud total de la red
	const TOTAL_LENGTH = 140.3;

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
	}
</script>

<svelte:head>
	<title>MetroStory - Historia del Metro de Santiago</title>
</svelte:head>

<div class="relative h-screen w-screen overflow-hidden bg-[var(--bg-primary)]">
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
			class="glass animate-slide-up absolute bottom-4 left-4 z-20 hidden rounded-2xl border border-[var(--border-light)] p-4 shadow-[var(--shadow-lg)] md:bottom-8 md:left-8 md:block md:p-5"
			style="animation-delay: 100ms"
		>
			<h3
				class="font-display mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--text-tertiary)]"
			>
				Red de Metro
			</h3>
			<div class="grid grid-cols-2 gap-x-5 gap-y-2.5">
				{#each lines as line, i (line.id)}
					<button
						onclick={() => handleLineSelect(line)}
						class="group flex items-center gap-3 rounded-lg px-2 py-1.5 transition-all duration-200 hover:bg-[var(--bg-accent)]"
						style="animation-delay: {150 + i * 50}ms"
					>
						<!-- Metro circle marker -->
						<div
							class="flex h-6 w-6 items-center justify-center rounded-full shadow-sm transition-transform duration-200 group-hover:scale-110"
							style="background-color: {line.color}"
						>
							<span class="font-display text-[9px] font-bold text-white">
								{line.id.replace('L', '')}
							</span>
						</div>
						<span class="font-display text-xs font-medium text-[var(--text-secondary)]">
							{line.name}
						</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Mobile Line Legend - Compact row -->
		<div
			class="glass animate-slide-up absolute bottom-6 left-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-[var(--border-light)] p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] shadow-[var(--shadow-lg)] md:hidden"
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

		<!-- Stats Card - Hidden on mobile -->
		<div
			class="glass animate-slide-up absolute bottom-8 right-8 z-20 hidden rounded-2xl border border-[var(--border-light)] p-5 shadow-[var(--shadow-lg)] md:block"
			style="animation-delay: 200ms"
		>
			<div class="flex items-center gap-5">
				<div class="text-center">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--metro-l1)]">
						<span class="font-display text-lg font-bold text-white">{lines.length}</span>
					</div>
					<p class="font-display mt-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
						Líneas
					</p>
				</div>
				<div class="h-12 w-px bg-[var(--border-light)]"></div>
				<div class="text-center">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--metro-l4)]">
						<span class="font-display text-sm font-bold text-white">{TOTAL_STATIONS}</span>
					</div>
					<p class="font-display mt-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
						Estaciones
					</p>
				</div>
				<div class="h-12 w-px bg-[var(--border-light)]"></div>
				<div class="text-center">
					<div class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--metro-l5)]">
						<span class="font-display text-xs font-bold text-white">{TOTAL_LENGTH}</span>
					</div>
					<p class="font-display mt-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[var(--text-tertiary)]">
						Km
					</p>
				</div>
			</div>
			<!-- Explore more button -->
			<button
				onclick={toggleInfoPanel}
				class="mt-4 w-full rounded-lg bg-[var(--metro-l1)] px-4 py-2 font-display text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--metro-l1)]/90"
			>
				Explorar más
			</button>
		</div>

		<!-- Info Panel (Future Lines, Ghost Stations, Trains) -->
		{#if showInfoPanel}
			<div
				class="glass animate-fade-in absolute inset-4 z-30 rounded-2xl border border-[var(--border-light)] shadow-[var(--shadow-xl)] md:inset-auto md:bottom-8 md:right-8 md:w-[400px]"
			>
				<!-- Tabs -->
				<div class="flex border-b border-[var(--border-light)]">
					<button
						onclick={() => (activeInfoTab = 'future')}
						class="flex-1 px-4 py-4 font-display text-xs font-bold uppercase tracking-wider transition-colors {activeInfoTab === 'future'
							? 'bg-[var(--metro-l7)]/10 text-[var(--metro-l7)]'
							: 'text-[var(--text-tertiary)] hover:bg-[var(--bg-accent)]'}"
					>
						Futuro
					</button>
					<button
						onclick={() => (activeInfoTab = 'ghost')}
						class="flex-1 px-4 py-4 font-display text-xs font-bold uppercase tracking-wider transition-colors {activeInfoTab === 'ghost'
							? 'bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]'
							: 'text-[var(--text-tertiary)] hover:bg-[var(--bg-accent)]'}"
					>
						Fantasmas
					</button>
					<button
						onclick={() => (activeInfoTab = 'trains')}
						class="flex-1 px-4 py-4 font-display text-xs font-bold uppercase tracking-wider transition-colors {activeInfoTab === 'trains'
							? 'bg-[var(--metro-l5)]/10 text-[var(--metro-l5)]'
							: 'text-[var(--text-tertiary)] hover:bg-[var(--bg-accent)]'}"
					>
						Trenes
					</button>
				</div>

				<!-- Content -->
				<div class="max-h-[calc(100vh-200px)] overflow-y-auto p-4 md:max-h-[500px] md:p-5">
					{#if activeInfoTab === 'future'}
						<div class="space-y-4">
							<p class="text-sm text-[var(--text-secondary)]">
								Líneas en construcción y planificadas para 2027-2033
							</p>
							{#each futureLines as line}
								<div class="rounded-xl bg-[var(--bg-accent)] p-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-full text-white"
											style="background-color: {line.color}"
										>
											<span class="font-display text-xs font-bold">
												{line.id.replace('L', '')}
											</span>
										</div>
										<span class="font-display text-base font-bold text-[var(--text-primary)]">
											{line.name}
										</span>
										<span
											class="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold uppercase {line.status ===
											'construction'
												? 'bg-amber-100 text-amber-700'
												: 'bg-blue-100 text-blue-700'}"
										>
											{line.status === 'construction' ? 'En construcción' : 'Planificada'}
										</span>
									</div>
									<p class="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
										{line.description}
									</p>
									<div class="mt-3 flex gap-4 text-xs text-[var(--text-tertiary)]">
										<span>{line.length} km</span>
										<span>•</span>
										<span>{line.stationCount} estaciones</span>
										<span>•</span>
										<span>{line.inauguratedAt}</span>
									</div>
								</div>
							{/each}
						</div>
					{:else if activeInfoTab === 'ghost'}
						<div class="space-y-4">
							<p class="text-sm text-[var(--text-secondary)]">
								Estaciones construidas pero nunca abiertas al público
							</p>
							{#each ghostStations as station}
								<div class="rounded-xl bg-[var(--bg-accent)] p-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white"
										>
											<span class="text-sm">👻</span>
										</div>
										<span class="font-display text-base font-bold text-[var(--text-primary)]">
											{station.name}
										</span>
										<span class="ml-auto rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold uppercase text-gray-600">
											{station.lines[0]}
										</span>
									</div>
									<p class="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
										{station.history}
									</p>
									{#if station.ghostInfo}
										<div class="mt-3 rounded-lg bg-gray-100 p-3 text-xs text-gray-600">
											<strong>Estado:</strong>
											{station.ghostInfo.currentState}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{:else if activeInfoTab === 'trains'}
						<div class="space-y-4">
							<p class="text-sm text-[var(--text-secondary)]">
								Material rodante desde 1975 hasta hoy
							</p>
							{#each rollingStock as train}
								<div class="rounded-xl bg-[var(--bg-accent)] p-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-8 w-8 items-center justify-center rounded-full {train.rodadura ===
											'neumatica'
												? 'bg-[var(--metro-l1)]'
												: 'bg-[var(--metro-l4)]'} text-white"
										>
											<span class="text-sm">🚇</span>
										</div>
										<span class="font-display text-base font-bold text-[var(--text-primary)]">
											{train.model}
										</span>
										<span
											class="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold uppercase {train.status ===
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
									<div class="mt-2 text-xs text-[var(--text-tertiary)]">
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
									<ul class="mt-3 space-y-1 text-xs text-[var(--text-secondary)]">
										{#each train.characteristics.slice(0, 2) as char}
											<li>• {char}</li>
										{/each}
									</ul>
								</div>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Close button -->
				<button
					onclick={toggleInfoPanel}
					class="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-primary)] shadow-lg transition-colors hover:bg-[var(--bg-tertiary)]"
				>
					<span class="text-lg text-[var(--text-tertiary)]">×</span>
				</button>
			</div>
		{/if}

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
