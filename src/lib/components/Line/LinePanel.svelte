<script lang="ts">
	import type { MetroLine } from '$lib/types';
	import { sourcesById, dataDisclaimer } from '$lib/data/sources';
	import { getStationsByLine } from '$lib/data/stations';

	interface Props {
		line: MetroLine;
		onClose: () => void;
	}

	let { line, onClose }: Props = $props();

	const stationsOnLine = $derived(getStationsByLine(line.id));

	function formatDate(dateStr: string): string {
		if (!dateStr) return 'Fecha no disponible';
		// Handle future years like "2027"
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
						{line.id.replace('L', '')}
					</div>
					<div>
						<h2 class="font-display text-2xl font-bold text-[var(--text-primary)]">
							{line.name}
						</h2>
						<p class="font-ui text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
							{#if line.status === 'operational'}
								En operación desde {formatDate(line.inauguratedAt)}
							{:else if line.status === 'construction'}
								En construcción - {line.inauguratedAt}
							{:else}
								Planificada - {line.inauguratedAt}
							{/if}
						</p>
					</div>
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
	<div class="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
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

		<!-- Stations list -->
		{#if stationsOnLine.length > 0}
			<section class="mb-8">
				<h3
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Estaciones
				</h3>

				<div class="space-y-1">
					{#each stationsOnLine as station}
						<div class="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-[var(--bg-tertiary)]">
							<div class="h-2 w-2 rounded-full" style="background-color: {line.color}"></div>
							<span class="font-body text-sm text-[var(--text-secondary)]">{station.name}</span>
							{#if station.isTransfer}
								<span class="rounded-full bg-[var(--bg-accent)] px-1.5 py-0.5 text-[8px] font-bold uppercase text-[var(--text-tertiary)]">
									Combinación
								</span>
							{/if}
						</div>
					{/each}
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
