<script lang="ts">
	import { stations, lines, linesById } from '$lib';
	import type { Station } from '$lib/types';
	import MetroMap from '$lib/components/Map/MetroMap.svelte';
	import StationPanel from '$lib/components/Station/StationPanel.svelte';

	let selectedStation = $state<Station | null>(null);
	let isPanelOpen = $state(false);

	// Total real de estaciones del Metro de Santiago (136 únicas, no duplicadas por combinaciones)
	const TOTAL_STATIONS = 136;

	function handleStationSelect(station: Station) {
		selectedStation = station;
		isPanelOpen = true;
	}

	function handleClose() {
		isPanelOpen = false;
		setTimeout(() => {
			selectedStation = null;
		}, 300);
	}
</script>

<svelte:head>
	<title>MetroStory - Historia del Metro de Santiago</title>
</svelte:head>

<div class="relative h-screen w-screen overflow-hidden bg-[var(--bg-primary)]">
	<!-- Decorative metro line accent at top -->
	<div class="metro-gradient absolute left-0 right-0 top-0 z-50 h-1"></div>

	<!-- Main Layout -->
	<div class="flex h-full">
		<!-- Map Container -->
		<div class="relative flex-1">
			<!-- Map with rounded corners and shadow -->
			<div class="absolute inset-4 overflow-hidden rounded-2xl shadow-[var(--shadow-xl)]">
				<MetroMap {stations} {lines} {selectedStation} onStationSelect={handleStationSelect} />
			</div>

			<!-- Header - Metro identity -->
			<header
				class="animate-slide-up absolute left-8 top-8 z-20 flex items-center gap-5"
			>
				<!-- Logo badge -->
				<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--metro-l1)] shadow-lg">
					<img src="/logo.svg" alt="MetroStory" class="h-8 w-8 brightness-0 invert" />
				</div>

				<!-- Title block -->
				<div class="glass rounded-xl border border-[var(--border-light)] px-5 py-3 shadow-[var(--shadow-lg)]">
					<h1 class="font-display text-lg font-bold uppercase tracking-wide text-[var(--text-primary)]">
						MetroStory
					</h1>
					<p class="font-display text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--text-tertiary)]">
						Historia del Metro de Santiago
					</p>
				</div>
			</header>

			<!-- Line Legend -->
			<div
				class="glass animate-slide-up absolute bottom-8 left-8 z-20 rounded-2xl border border-[var(--border-light)] p-5 shadow-[var(--shadow-lg)]"
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

			<!-- Stats Card -->
			<div
				class="glass animate-slide-up absolute bottom-8 right-8 z-20 rounded-2xl border border-[var(--border-light)] p-5 shadow-[var(--shadow-lg)]"
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
				</div>
			</div>

			<!-- Instructions hint -->
			<div class="animate-fade-in absolute right-8 top-8 z-20" style="animation-delay: 400ms">
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
		</div>

		<!-- Station Panel Sidebar -->
		<aside
			class="relative z-30 w-[420px] flex-shrink-0 transform border-l border-[var(--border-light)] bg-[var(--bg-secondary)] transition-transform duration-300 ease-out {isPanelOpen
				? 'translate-x-0'
				: 'translate-x-full'}"
		>
			{#if selectedStation}
				<StationPanel station={selectedStation} {linesById} onClose={handleClose} />
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
