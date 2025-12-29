<script lang="ts">
	import type { MetroLine } from '$lib/types';
	import { sourcesById, dataDisclaimer } from '$lib/data/sources';
	import { getStationsByLine } from '$lib/data/stations';
	import { onMount } from 'svelte';

	interface Props {
		line: MetroLine;
		onClose: () => void;
	}

	let { line, onClose }: Props = $props();

	const stationsOnLine = $derived(getStationsByLine(line.id));

	// Scroll animation state
	let scrollContainer: HTMLElement;
	let timelineSection: HTMLElement;
	let stationElements: HTMLElement[] = [];
	let scrollProgress = $state(0);
	let activeStationIndex = $state(0);
	let visitedStations = $state<Set<number>>(new Set([0]));

	function formatDate(dateStr: string): string {
		if (!dateStr) return 'Fecha no disponible';
		if (dateStr.length === 4) return dateStr;
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-CL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function getRodaduraLabel(rodadura: string): string {
		return rodadura === 'neumatica' ? 'Neumáticos' : 'Ruedas de acero';
	}

	function getAutomationLabel(level: string): string {
		if (level === 'GoA4') return 'Automático (sin conductor)';
		if (level === 'GoA2') return 'Semi-automático';
		return 'Conducción manual';
	}

	function getConstructionLabel(method: string | undefined): string {
		if (!method) return '';
		const labels: Record<string, string> = {
			trinchera_abierta: 'Trinchera abierta (cut & cover)',
			tunel_profundo: 'Túnel profundo',
			viaducto: 'Viaducto elevado',
			NATM: 'Nuevo Método Austríaco (NATM)'
		};
		return labels[method] || method;
	}

	function handleScroll() {
		if (!timelineSection || !scrollContainer || stationElements.length === 0) return;

		const containerRect = scrollContainer.getBoundingClientRect();
		const sectionRect = timelineSection.getBoundingClientRect();

		// Calculate how much of the timeline section is scrolled
		const sectionTop = sectionRect.top - containerRect.top;
		const sectionHeight = sectionRect.height;
		const containerHeight = containerRect.height;

		// Progress: 0 when section starts entering, 1 when fully scrolled past
		const visibleStart = -sectionTop;
		const totalScroll = sectionHeight - containerHeight * 0.5;
		scrollProgress = Math.max(0, Math.min(1, visibleStart / totalScroll));

		// Find which station is currently in view
		const viewportCenter = containerRect.top + containerHeight * 0.4;

		for (let i = stationElements.length - 1; i >= 0; i--) {
			const el = stationElements[i];
			if (!el) continue;
			const rect = el.getBoundingClientRect();
			if (rect.top <= viewportCenter) {
				activeStationIndex = i;
				// Mark this and all previous stations as visited
				for (let j = 0; j <= i; j++) {
					visitedStations.add(j);
				}
				visitedStations = visitedStations; // trigger reactivity
				break;
			}
		}
	}

	onMount(() => {
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
			// Initial check
			setTimeout(handleScroll, 100);
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('scroll', handleScroll);
			}
		};
	});
</script>

<div class="animate-slide-in flex h-full flex-col bg-[var(--bg-secondary)]">
	<!-- Header with accent line -->
	<header class="relative border-b border-[var(--border-light)] px-4 pb-4 pt-6 md:px-6 md:pb-6 md:pt-8">
		<!-- Colored accent bar -->
		<div class="absolute left-0 right-0 top-0 h-1" style="background-color: {line.color}"></div>

		<div class="flex items-start justify-between">
			<div class="flex-1">
				<!-- Line badge -->
				<div class="mb-3 flex items-center gap-3">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
						style="background-color: {line.color}; color: {line.textColor}"
					>
						{line.id === 'L6-ext' ? '6' : line.id.replace('L', '')}
					</div>
					<h2 class="font-display text-2xl font-bold text-[var(--text-primary)]">
						{line.name}
					</h2>
				</div>

				<!-- Status badges -->
				<div class="mt-3 flex flex-wrap gap-2">
					<span
						class="font-ui rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wide"
						style="background-color: {line.color}15; color: {line.color}"
					>
						{line.rodadura === 'neumatica' ? 'Neumáticos' : 'Ruedas de acero'}
					</span>
					{#if line.automationLevel === 'GoA4'}
						<span
							class="font-ui rounded-full bg-[var(--metro-l3)]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--metro-l3)]"
						>
							Automático
						</span>
					{/if}
				</div>
			</div>

			<!-- Close button -->
			<button
				onclick={onClose}
				class="flex h-10 w-10 items-center justify-center rounded-full text-[var(--text-tertiary)] transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
				aria-label="Cerrar panel"
			>
				<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	</header>

	<!-- Content -->
	<div class="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6" bind:this={scrollContainer}>
		<!-- Quick facts grid -->
		<section class="mb-8">
			<h3
				class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
			>
				Datos técnicos
			</h3>

			<div class="grid grid-cols-2 gap-3">
				<!-- Length -->
				<div
					class="flex flex-col items-center justify-center rounded-xl bg-[var(--bg-tertiary)] p-4"
				>
					<span class="font-display text-2xl font-bold" style="color: {line.color}">
						{line.length}
					</span>
					<span class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
						km de extensión
					</span>
				</div>

				<!-- Stations -->
				<div
					class="flex flex-col items-center justify-center rounded-xl bg-[var(--bg-tertiary)] p-4"
				>
					<span class="font-display text-2xl font-bold" style="color: {line.color}">
						{line.stationCount}
					</span>
					<span class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
						estaciones
					</span>
				</div>
			</div>

			<div class="mt-3 space-y-2">
				<!-- Inauguration -->
				<div class="flex items-center justify-between rounded-lg bg-[var(--bg-tertiary)] px-4 py-3">
					<span class="font-ui text-xs text-[var(--text-tertiary)]">Inauguración</span>
					<span class="font-body text-sm text-[var(--text-primary)]">
						{formatDate(line.inauguratedAt)}
					</span>
				</div>

				<!-- Rodadura -->
				<div class="flex items-center justify-between rounded-lg bg-[var(--bg-tertiary)] px-4 py-3">
					<span class="font-ui text-xs text-[var(--text-tertiary)]">Rodadura</span>
					<span class="font-body text-sm text-[var(--text-primary)]">
						{getRodaduraLabel(line.rodadura)}
					</span>
				</div>

				<!-- Automation -->
				<div class="flex items-center justify-between rounded-lg bg-[var(--bg-tertiary)] px-4 py-3">
					<span class="font-ui text-xs text-[var(--text-tertiary)]">Operación</span>
					<span class="font-body text-sm text-[var(--text-primary)]">
						{getAutomationLabel(line.automationLevel)}
					</span>
				</div>

				<!-- Construction method -->
				{#if line.constructionMethod}
					<div
						class="flex items-center justify-between rounded-lg bg-[var(--bg-tertiary)] px-4 py-3"
					>
						<span class="font-ui text-xs text-[var(--text-tertiary)]">Construcción</span>
						<span class="font-body text-sm text-[var(--text-primary)]">
							{getConstructionLabel(line.constructionMethod)}
						</span>
					</div>
				{/if}
			</div>
		</section>

		<!-- Description -->
		{#if line.description}
			<section class="mb-8">
				<h3
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Descripción
				</h3>

				<div class="relative rounded-xl bg-[var(--bg-tertiary)] p-5">
					<p class="font-body text-[15px] leading-relaxed text-[var(--text-secondary)]">
						{line.description}
					</p>
				</div>
			</section>
		{/if}

		<!-- Historical note -->
		{#if line.historicalNote}
			<section class="mb-8">
				<h3
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Nota histórica
				</h3>

				<div
					class="rounded-xl border-l-4 bg-[var(--bg-accent)] p-4"
					style="border-color: {line.color}"
				>
					<p class="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
						{line.historicalNote}
					</p>
				</div>
			</section>
		{/if}

		<!-- Stations timeline with history -->
		{#if stationsOnLine.length > 0}
			<section class="mb-8" bind:this={timelineSection}>
				<div class="mb-4 flex items-center justify-between">
					<h3
						class="font-display text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						Recorrido de la línea
					</h3>
					<span class="rounded-full px-2 py-1 text-[10px] font-bold" style="background-color: {line.color}20; color: {line.color}">
						{activeStationIndex + 1} / {stationsOnLine.length}
					</span>
				</div>

				<div class="relative">
					<!-- Background track (gray) -->
					<div
						class="absolute left-[11px] top-0 bottom-0 w-1 rounded-full bg-gray-200"
					></div>

					<!-- Progress track (colored) - fills as you scroll -->
					<div
						class="absolute left-[11px] top-0 w-1 rounded-full transition-all duration-300 ease-out"
						style="background-color: {line.color}; height: {scrollProgress * 100}%"
					></div>

					<!-- Train indicator -->
					<div
						class="train-indicator absolute left-0 z-20 flex h-6 w-6 items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-out"
						style="background-color: {line.color}; top: calc({scrollProgress * 100}% - 12px)"
					>
						<svg class="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C8 2 4 3.5 4 7v9.5C4 18.5 5.5 20 7.5 20L6 22v1h2l2-3h4l2 3h2v-1l-1.5-2c2 0 3.5-1.5 3.5-3.5V7c0-3.5-4-5-8-5zm-4 13c-.83 0-1.5-.67-1.5-1.5S7.17 12 8 12s1.5.67 1.5 1.5S8.83 15 8 15zm8 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-5h-11V7h11v3z"/>
						</svg>
					</div>

					<div class="space-y-4">
						{#each stationsOnLine as station, i}
							<div
								class="station-item relative pl-8 transition-all duration-300"
								class:opacity-40={!visitedStations.has(i) && i !== activeStationIndex}
								bind:this={stationElements[i]}
							>
								<!-- Station dot -->
								<div
									class="absolute left-0 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300"
									class:scale-110={i === activeStationIndex}
									style="
										border-color: {line.color};
										background-color: {visitedStations.has(i) ? line.color : 'white'};
									"
								>
									<span
										class="text-[8px] font-bold transition-colors duration-300"
										style="color: {visitedStations.has(i) ? line.textColor : line.color}"
									>
										{i + 1}
									</span>
								</div>

								<!-- Station card -->
								<div
									class="rounded-xl bg-[var(--bg-tertiary)] p-4 transition-all duration-300"
									class:ring-2={i === activeStationIndex}
									style="--tw-ring-color: {line.color}40"
								>
									<!-- Header -->
									<div class="mb-2 flex items-start justify-between">
										<div>
											<h4 class="font-display text-base font-bold text-[var(--text-primary)]">
												{station.name}
											</h4>
											{#if station.formerName}
												<p class="text-[11px] italic text-[var(--text-muted)]">
													Antes: {station.formerName}
												</p>
											{/if}
										</div>
										<div class="flex flex-wrap justify-end gap-1">
											{#if station.isTransfer}
												<span class="rounded-full bg-[var(--bg-accent)] px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--text-tertiary)]">
													Combinación
												</span>
											{/if}
											{#if station.isTerminal}
												<span class="rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase" style="background-color: {line.color}20; color: {line.color}">
													Terminal
												</span>
											{/if}
										</div>
									</div>

									<!-- Inauguration date -->
									<p class="mb-3 text-[11px] text-[var(--text-muted)]">
										Inaugurada el {formatDate(station.inauguratedAt)}
										{#if station.commune}
											• {station.commune}
										{/if}
									</p>

									<!-- History -->
									{#if station.history}
										<p class="font-body text-sm leading-relaxed text-[var(--text-secondary)]">
											{station.history}
										</p>
									{/if}

									<!-- Name origin -->
									{#if station.nameOrigin}
										<div class="mt-3 rounded-lg bg-[var(--bg-accent)] p-3">
											<p class="text-[10px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">
												Origen del nombre
											</p>
											<p class="mt-1 font-body text-xs text-[var(--text-secondary)]">
												{station.nameOrigin}
											</p>
										</div>
									{/if}

									<!-- Curiosity -->
									{#if station.curiosity}
										<div class="mt-3 rounded-lg border-l-2 bg-[var(--bg-accent)] p-3" style="border-color: {line.color}">
											<p class="text-[10px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">
												Dato curioso
											</p>
											<p class="mt-1 font-body text-xs text-[var(--text-secondary)]">
												{station.curiosity}
											</p>
										</div>
									{/if}

									<!-- Artworks preview -->
									{#if station.artworks && station.artworks.length > 0}
										<div class="mt-3">
											<p class="text-[10px] font-bold uppercase tracking-wide text-[var(--text-tertiary)]">
												MetroArte ({station.artworks.length})
											</p>
											<div class="mt-1 flex flex-wrap gap-1">
												{#each station.artworks.slice(0, 2) as artwork}
													<span class="rounded-full bg-[var(--metro-l5)]/10 px-2 py-0.5 text-[10px] text-[var(--metro-l5)]">
														{artwork.title}
													</span>
												{/each}
												{#if station.artworks.length > 2}
													<span class="rounded-full bg-[var(--bg-accent)] px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
														+{station.artworks.length - 2} más
													</span>
												{/if}
											</div>
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}

		<!-- Sources -->
		{#if line.sources && line.sources.length > 0}
			<section class="mb-8">
				<h3
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Fuentes
				</h3>

				<div class="space-y-2">
					{#each line.sources as sourceId}
						{@const source = sourcesById[sourceId]}
						{#if source}
							<div class="rounded-lg bg-[var(--bg-tertiary)] px-3 py-2">
								{#if source.url}
									<a
										href={source.url}
										target="_blank"
										rel="noopener noreferrer"
										class="font-body text-xs text-[var(--text-secondary)] underline decoration-dotted hover:text-[var(--text-primary)]"
									>
										{source.title}
									</a>
								{:else}
									<span class="font-body text-xs text-[var(--text-secondary)]">
										{source.title}
									</span>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</section>
		{/if}
	</div>

	<!-- Footer with AI disclaimer -->
	<footer class="border-t border-[var(--border-light)] px-4 py-3 md:px-6 md:py-4">
		<p class="font-ui text-center text-[9px] text-[var(--text-muted)] md:text-[10px]">
			{dataDisclaimer.text}
		</p>
	</footer>
</div>

<style>
	.train-indicator {
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% {
			box-shadow: 0 0 0 0 var(--tw-ring-color, rgba(0,0,0,0.2));
		}
		50% {
			box-shadow: 0 0 0 8px transparent;
		}
	}

	.station-item {
		scroll-margin-top: 100px;
	}
</style>
