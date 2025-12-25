<script lang="ts">
	import { lines, futureLines } from '$lib';

	interface Props {
		value: Date;
		onchange: (date: Date) => void;
		minYear?: number;
		maxYear?: number;
	}

	let { value = $bindable(), onchange, minYear = 1975, maxYear = 2033 }: Props = $props();

	let isPlaying = $state(false);
	let playInterval: ReturnType<typeof setInterval> | null = null;

	// Calcular el rango total en meses para mayor precisión
	const totalMonths = $derived((maxYear - minYear) * 12);

	// Convertir fecha a valor del slider (0-100)
	function dateToSlider(date: Date): number {
		const months = (date.getFullYear() - minYear) * 12 + date.getMonth();
		return (months / totalMonths) * 100;
	}

	// Convertir valor del slider a fecha
	function sliderToDate(sliderValue: number): Date {
		const total = totalMonths;
		const months = Math.round((sliderValue / 100) * total);
		const year = minYear + Math.floor(months / 12);
		const month = months % 12;
		return new Date(year, month, 1);
	}

	let sliderValue = $derived(dateToSlider(value));

	function handleSliderChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const newDate = sliderToDate(parseFloat(target.value));
		value = newDate;
		onchange(newDate);
	}

	// Hitos importantes (inauguraciones de líneas)
	const milestones = $derived(
		[...lines, ...futureLines]
			.map((line) => {
				const dateStr = line.inauguratedAt;
				// Manejar fechas completas y solo años
				const date = dateStr.includes('-')
					? new Date(dateStr)
					: new Date(parseInt(dateStr), 0, 1);
				return {
					id: line.id,
					name: line.name,
					color: line.color,
					date,
					position: dateToSlider(date)
				};
			})
			.filter((m) => m.position >= 0 && m.position <= 100)
			.sort((a, b) => a.position - b.position)
	);

	// Años para mostrar en el slider
	const yearMarks = $derived(
		Array.from({ length: Math.floor((maxYear - minYear) / 10) + 1 }, (_, i) => {
			const year = minYear + i * 10;
			return {
				year,
				position: ((year - minYear) / (maxYear - minYear)) * 100
			};
		})
	);

	// Controles de reproducción
	function togglePlay() {
		if (isPlaying) {
			stopPlay();
		} else {
			startPlay();
		}
	}

	function startPlay() {
		isPlaying = true;
		playInterval = setInterval(() => {
			const currentMonths = (value.getFullYear() - minYear) * 12 + value.getMonth();
			if (currentMonths >= totalMonths) {
				stopPlay();
				return;
			}
			const newDate = sliderToDate(((currentMonths + 1) / totalMonths) * 100);
			value = newDate;
			onchange(newDate);
		}, 100); // Avanza un mes cada 100ms
	}

	function stopPlay() {
		isPlaying = false;
		if (playInterval) {
			clearInterval(playInterval);
			playInterval = null;
		}
	}

	function goToStart() {
		stopPlay();
		const startDate = new Date(minYear, 0, 1);
		value = startDate;
		onchange(startDate);
	}

	function goToPresent() {
		stopPlay();
		const now = new Date();
		value = now;
		onchange(now);
	}

	// Formatear fecha para mostrar
	function formatDate(date: Date): string {
		const months = [
			'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
			'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
		];
		return `${months[date.getMonth()]} ${date.getFullYear()}`;
	}

	// Limpiar intervalo al destruir componente
	$effect(() => {
		return () => {
			if (playInterval) {
				clearInterval(playInterval);
			}
		};
	});
</script>

<div class="timeline-container glass rounded-xl border border-[var(--border-light)] p-3 shadow-[var(--shadow-md)]">
	<!-- Header con fecha actual y controles -->
	<div class="mb-3 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<button
				onclick={goToStart}
				class="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)]"
				title="Ir al inicio (1975)"
				aria-label="Ir al inicio (1975)"
			>
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
				</svg>
			</button>
			<button
				onclick={togglePlay}
				class="flex h-8 w-8 items-center justify-center rounded-full transition-colors {isPlaying
					? 'bg-[var(--metro-l1)] text-white'
					: 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)]'}"
				title={isPlaying ? 'Pausar' : 'Reproducir evolución'}
				aria-label={isPlaying ? 'Pausar' : 'Reproducir evolución'}
			>
				{#if isPlaying}
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 9v6m4-6v6" />
					</svg>
				{:else}
					<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M8 5v14l11-7z" />
					</svg>
				{/if}
			</button>
			<button
				onclick={goToPresent}
				class="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-accent)] hover:text-[var(--text-primary)]"
				title="Ir al presente"
				aria-label="Ir al presente"
			>
				<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
				</svg>
			</button>
		</div>

		<!-- Fecha actual -->
		<div class="text-right">
			<p class="font-display text-lg font-bold text-[var(--text-primary)]">
				{formatDate(value)}
			</p>
			<p class="text-[9px] uppercase tracking-wide text-[var(--text-muted)]">
				Línea de tiempo
			</p>
		</div>
	</div>

	<!-- Slider con marcadores -->
	<div class="relative">
		<!-- Marcadores de años -->
		<div class="absolute -top-1 left-0 right-0 flex justify-between px-1">
			{#each yearMarks as mark (mark.year)}
				<span
					class="text-[8px] text-[var(--text-muted)]"
					style="position: absolute; left: {mark.position}%; transform: translateX(-50%)"
				>
					{mark.year}
				</span>
			{/each}
		</div>

		<!-- Slider -->
		<div class="relative mt-4 pt-2">
			<!-- Track background con hitos -->
			<div class="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[var(--bg-accent)]">
				<!-- Progreso -->
				<div
					class="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[var(--metro-l1)] to-[var(--metro-l5)]"
					style="width: {sliderValue}%"
				></div>
			</div>

			<!-- Marcadores de líneas -->
			{#each milestones as milestone (milestone.id)}
				<div
					class="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm transition-transform hover:scale-125"
					style="left: {milestone.position}%; background-color: {milestone.color}"
					title="{milestone.name}: {milestone.date.getFullYear()}"
				></div>
			{/each}

			<!-- Input range -->
			<input
				type="range"
				min="0"
				max="100"
				step="0.1"
				value={sliderValue}
				oninput={handleSliderChange}
				class="timeline-slider relative z-10 h-6 w-full cursor-pointer appearance-none bg-transparent"
			/>
		</div>
	</div>

	<!-- Leyenda de líneas activas en la fecha -->
	<div class="mt-3 flex flex-wrap gap-1.5 border-t border-[var(--border-light)] pt-2">
		{#each milestones.filter((m) => m.date <= value) as line (line.id)}
			<div
				class="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold text-white shadow-sm"
				style="background-color: {line.color}"
				title="{line.name}"
			>
				{line.id.replace('L', '').replace('-ext', '')}
			</div>
		{/each}
		{#if milestones.filter((m) => m.date <= value).length === 0}
			<span class="text-[10px] italic text-[var(--text-muted)]">Sin líneas inauguradas</span>
		{/if}
	</div>
</div>

<style>
	/* Estilos del slider */
	.timeline-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--metro-l1);
		cursor: pointer;
		border: 3px solid white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		transition: transform 0.15s ease;
	}

	.timeline-slider::-webkit-slider-thumb:hover {
		transform: scale(1.15);
	}

	.timeline-slider::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--metro-l1);
		cursor: pointer;
		border: 3px solid white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	.timeline-slider::-webkit-slider-runnable-track {
		height: 6px;
		background: transparent;
	}

	.timeline-slider::-moz-range-track {
		height: 6px;
		background: transparent;
	}
</style>
