<script lang="ts">
	import type { Station, MetroLine } from '$lib/types';
	import LineBadge from '$lib/components/UI/LineBadge.svelte';

	interface Props {
		station: Station;
		linesById: Record<string, MetroLine>;
		onClose: () => void;
	}

	let { station, linesById, onClose }: Props = $props();

	function formatDate(dateStr: string): string {
		if (!dateStr) return 'Fecha no disponible';
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-CL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function formatNumber(num: number): string {
		return num.toLocaleString('es-CL');
	}

	// Get primary line color
	function getPrimaryLineColor(): string {
		const lineId = station.lines[0];
		const line = linesById[lineId];
		return line?.color ?? '#d60d27';
	}
</script>

<div class="animate-slide-in flex h-full flex-col bg-[var(--bg-secondary)]">
	<!-- Header with accent line -->
	<header class="relative border-b border-[var(--border-light)] px-6 pb-6 pt-8">
		<!-- Colored accent bar -->
		<div
			class="absolute left-0 right-0 top-0 h-1"
			style="background-color: {getPrimaryLineColor()}"
		></div>

		<div class="flex items-start justify-between">
			<div class="flex-1">
				<!-- Line badges -->
				<div class="mb-3 flex flex-wrap gap-2">
					{#each station.lines as lineId}
						{@const line = linesById[lineId]}
						{#if line}
							<LineBadge {line} />
						{/if}
					{/each}
				</div>

				<!-- Station name -->
				<h2 class="font-display text-2xl font-bold text-[var(--text-primary)]">
					{station.name}
				</h2>

				<!-- Quick badges -->
				<div class="mt-3 flex flex-wrap gap-2">
					{#if station.isTransfer}
						<span
							class="font-ui rounded-full bg-[var(--metro-l4a)]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--metro-l4a)]"
						>
							Combinación
						</span>
					{/if}
					{#if station.isTerminal}
						<span
							class="font-ui rounded-full bg-[var(--metro-l2)]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--metro-l3)]"
						>
							Terminal
						</span>
					{/if}
					{#if station.isAccessible}
						<span
							class="font-ui rounded-full bg-[var(--metro-l5)]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--metro-l5)]"
						>
							Accesible
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
	<div class="flex-1 overflow-y-auto px-6 py-6">
		<!-- Quick facts grid -->
		<section class="mb-8">
			<h3
				class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
			>
				Información
			</h3>

			<div class="grid gap-4">
				<!-- Inauguration -->
				<div
					class="flex items-center gap-4 rounded-xl bg-[var(--bg-tertiary)] p-4 transition-colors duration-200 hover:bg-[var(--bg-accent)]"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg"
						style="background-color: {getPrimaryLineColor()}15"
					>
						<svg
							class="h-5 w-5"
							style="color: {getPrimaryLineColor()}"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<div>
						<p class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
							Inauguración
						</p>
						<p class="font-body text-sm text-[var(--text-primary)]">
							{formatDate(station.inauguratedAt)}
						</p>
					</div>
				</div>

				<!-- Architect -->
				{#if station.architect}
					<div
						class="flex items-center gap-4 rounded-xl bg-[var(--bg-tertiary)] p-4 transition-colors duration-200 hover:bg-[var(--bg-accent)]"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg"
							style="background-color: {getPrimaryLineColor()}15"
						>
							<svg
								class="h-5 w-5"
								style="color: {getPrimaryLineColor()}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
								/>
							</svg>
						</div>
						<div>
							<p class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
								Arquitecto
							</p>
							<p class="font-body text-sm text-[var(--text-primary)]">{station.architect}</p>
						</div>
					</div>
				{/if}

				<!-- Daily passengers -->
				{#if station.dailyPassengers}
					<div
						class="flex items-center gap-4 rounded-xl bg-[var(--bg-tertiary)] p-4 transition-colors duration-200 hover:bg-[var(--bg-accent)]"
					>
						<div
							class="flex h-10 w-10 items-center justify-center rounded-lg"
							style="background-color: {getPrimaryLineColor()}15"
						>
							<svg
								class="h-5 w-5"
								style="color: {getPrimaryLineColor()}"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
						</div>
						<div>
							<p class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
								Pasajeros diarios
							</p>
							<p class="font-body text-sm text-[var(--text-primary)]">
								{formatNumber(station.dailyPassengers)}
							</p>
						</div>
					</div>
				{/if}
			</div>
		</section>

		<!-- History -->
		<section>
			<h3
				class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
			>
				Historia del nombre
			</h3>

			<div class="relative rounded-xl bg-[var(--bg-tertiary)] p-5">
				<!-- Decorative quote mark -->
				<div class="absolute -left-1 -top-2 font-display text-4xl text-[var(--border-medium)]">
					"
				</div>

				<p class="font-body relative z-10 text-[15px] leading-relaxed text-[var(--text-secondary)]">
					{station.history}
				</p>
			</div>
		</section>
	</div>

	<!-- Footer -->
	<footer class="border-t border-[var(--border-light)] px-6 py-4">
		<p class="font-ui text-center text-[10px] text-[var(--text-muted)]">
			Coordenadas: {station.coordinates[1].toFixed(4)}, {station.coordinates[0].toFixed(4)}
		</p>
	</footer>
</div>
