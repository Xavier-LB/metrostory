<script lang="ts">
	import type { PageData } from './$types';
	import LineBadge from '$lib/components/UI/LineBadge.svelte';
	import { sourcesById, dataDisclaimer } from '$lib/data/sources';
	import { allLinesById } from '$lib/data/lines';

	let { data }: { data: PageData } = $props();

	const station = $derived(data.station);
	const stationLines = $derived(data.stationLines);

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

	function getPrimaryLineColor(): string {
		const lineId = station.lines[0];
		const line = allLinesById[lineId];
		return line?.color ?? '#d60d27';
	}

	// Create SEO-optimized description
	function getSeoDescription(): string {
		let desc = `${station.name} - Estación del Metro de Santiago`;
		if (station.nameOrigin) {
			desc += `. ${station.nameOrigin.substring(0, 120)}`;
		}
		if (desc.length > 160) {
			desc = desc.substring(0, 157) + '...';
		}
		return desc;
	}

	// Create JSON-LD structured data for the station
	function getJsonLd() {
		return {
			'@context': 'https://schema.org',
			'@type': 'Place',
			name: `Estación ${station.name}`,
			description: station.nameOrigin || station.history,
			address: {
				'@type': 'PostalAddress',
				addressLocality: station.commune || 'Santiago',
				addressRegion: 'Región Metropolitana',
				addressCountry: 'CL'
			},
			geo: {
				'@type': 'GeoCoordinates',
				latitude: station.coordinates[1],
				longitude: station.coordinates[0]
			},
			isPartOf: {
				'@type': 'TransportHub',
				name: 'Metro de Santiago',
				url: 'https://www.metro.cl'
			},
			additionalType: 'https://schema.org/TrainStation',
			publicAccess: true,
			isAccessibleForFree: false
		};
	}

	// Create FAQ JSON-LD for common questions
	function getFaqJsonLd() {
		const faqs: Array<{ question: string; answer: string }> = [];

		if (station.nameOrigin) {
			faqs.push({
				question: `¿Qué significa ${station.name}? ¿Por qué se llama así la estación?`,
				answer: station.nameOrigin
			});
		}

		if (station.history) {
			faqs.push({
				question: `¿Cuál es la historia de la estación ${station.name}?`,
				answer: station.history
			});
		}

		if (station.curiosity) {
			faqs.push({
				question: `¿Qué dato curioso tiene la estación ${station.name}?`,
				answer: station.curiosity
			});
		}

		if (faqs.length === 0) return null;

		return {
			'@context': 'https://schema.org',
			'@type': 'FAQPage',
			mainEntity: faqs.map((faq) => ({
				'@type': 'Question',
				name: faq.question,
				acceptedAnswer: {
					'@type': 'Answer',
					text: faq.answer
				}
			}))
		};
	}

	const jsonLd = getJsonLd();
	const faqJsonLd = getFaqJsonLd();
</script>

<svelte:head>
	<title>{station.name} - Significado, Historia y Origen | Metro de Santiago | MetroStory</title>
	<meta name="description" content={getSeoDescription()} />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://metrostory.lebaux.co/estacion/{station.id}" />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://metrostory.lebaux.co/estacion/{station.id}" />
	<meta
		property="og:title"
		content="{station.name} - Significado y Origen del Nombre | Metro de Santiago"
	/>
	<meta
		property="og:description"
		content={station.nameOrigin || station.history}
	/>
	<meta property="og:image" content="https://metrostory.lebaux.co/logo.png" />
	<meta property="og:site_name" content="MetroStory" />
	<meta property="og:locale" content="es_CL" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta
		name="twitter:title"
		content="{station.name} - Metro de Santiago | MetroStory"
	/>
	<meta name="twitter:description" content={getSeoDescription()} />

	<!-- Additional SEO meta tags -->
	<meta
		name="keywords"
		content="{station.name}, metro santiago, estación {station.name.toLowerCase()}, significado {station.name.toLowerCase()}, origen nombre {station.name.toLowerCase()}, {station.lines.join(', ')}, metro chile, transporte santiago"
	/>
	<meta name="author" content="MetroStory" />
	<meta name="geo.region" content="CL-RM" />
	<meta name="geo.placename" content="{station.commune || 'Santiago'}, Chile" />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
	{#if faqJsonLd}
		{@html `<script type="application/ld+json">${JSON.stringify(faqJsonLd)}</script>`}
	{/if}
</svelte:head>

<div class="min-h-screen bg-[var(--bg-primary)]">
	<!-- Header with accent line -->
	<header class="relative border-b border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 pb-6 pt-8 md:px-8 md:pb-8 md:pt-12">
		<!-- Colored accent bar -->
		<div
			class="absolute left-0 right-0 top-0 h-1"
			style="background-color: {getPrimaryLineColor()}"
		></div>

		<div class="mx-auto max-w-3xl">
			<!-- Back link -->
			<a
				href="/"
				class="mb-6 inline-flex items-center gap-2 font-display text-sm font-medium text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
				Volver al mapa
			</a>

			<!-- Line badges -->
			<div class="mb-4 flex flex-wrap gap-2">
				{#each stationLines as line}
					<LineBadge {line} />
				{/each}
			</div>

			<!-- Station name -->
			<h1 class="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
				{station.name}
			</h1>

			<!-- Quick badges -->
			<div class="mt-4 flex flex-wrap gap-2">
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
				{#if station.commune}
					<span
						class="font-ui rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-[var(--text-tertiary)]"
					>
						{station.commune}
					</span>
				{/if}
			</div>
		</div>
	</header>

	<!-- Content -->
	<main class="px-4 py-8 md:px-8 md:py-12">
		<div class="mx-auto max-w-3xl">
			<!-- Quick facts grid -->
			<section class="mb-10">
				<h2
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Datos técnicos
				</h2>

				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<!-- Inauguration -->
					<div
						class="flex items-center gap-4 rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm"
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
							class="flex items-center gap-4 rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm"
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
							class="flex items-center gap-4 rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm"
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

			<!-- Name Origin - THE KEY SEO SECTION -->
			{#if station.nameOrigin}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						¿Por qué se llama {station.name}?
					</h2>

					<div class="relative rounded-xl bg-[var(--bg-secondary)] p-6 shadow-sm">
						<!-- Decorative quote mark -->
						<div class="absolute -left-1 -top-2 font-display text-5xl text-[var(--border-medium)]">
							"
						</div>

						<p class="font-body relative z-10 text-lg leading-relaxed text-[var(--text-secondary)]">
							{station.nameOrigin}
						</p>
					</div>
				</section>
			{/if}

			<!-- History -->
			<section class="mb-10">
				<h2
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Historia
				</h2>

				<div class="rounded-xl bg-[var(--bg-secondary)] p-6 shadow-sm">
					<p class="font-body text-base leading-relaxed text-[var(--text-secondary)]">
						{station.history}
					</p>
				</div>
			</section>

			<!-- Curiosity / Fun Fact -->
			{#if station.curiosity}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						¿Sabías que...?
					</h2>

					<div
						class="rounded-xl border-l-4 bg-[var(--bg-secondary)] p-5 shadow-sm"
						style="border-color: {getPrimaryLineColor()}"
					>
						<p class="font-body text-base leading-relaxed text-[var(--text-secondary)]">
							{station.curiosity}
						</p>
					</div>
				</section>
			{/if}

			<!-- Pictogram -->
			{#if station.pictogram}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						Pictograma
					</h2>

					<div class="rounded-xl bg-[var(--bg-secondary)] p-5 shadow-sm">
						<p class="font-body text-base text-[var(--text-secondary)]">
							{station.pictogram}
						</p>
					</div>
				</section>
			{/if}

			<!-- MetroArte -->
			{#if station.artworks && station.artworks.length > 0}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						MetroArte
					</h2>

					<div class="space-y-4">
						{#each station.artworks as artwork}
							<article class="rounded-xl bg-[var(--bg-secondary)] p-5 shadow-sm">
								<h3 class="font-display text-lg font-bold text-[var(--text-primary)]">
									{artwork.title}
								</h3>
								<p class="font-body text-sm text-[var(--text-tertiary)]">
									{artwork.artist}{artwork.year ? ` (${artwork.year})` : ''}
								</p>
								<p class="mt-3 font-body text-base leading-relaxed text-[var(--text-secondary)]">
									{artwork.description}
								</p>
								{#if artwork.size}
									<p class="mt-2 font-ui text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
										{artwork.size}
									</p>
								{/if}
							</article>
						{/each}
					</div>
				</section>
			{/if}

			<!-- Ghost Station Info -->
			{#if station.isGhost && station.ghostInfo}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500"
					>
						Estación Fantasma
					</h2>

					<div class="rounded-xl border border-gray-300 bg-gray-50 p-5">
						<div class="mb-3 flex items-center gap-2">
							<span class="text-2xl">&#x1F47B;</span>
							<span class="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase text-gray-600">
								{station.ghostInfo.status === 'obra_terminada'
									? 'Obra terminada'
									: station.ghostInfo.status === 'obra_gruesa'
										? 'Obra gruesa'
										: 'Oculta'}
							</span>
						</div>
						<p class="font-body text-base text-gray-600">
							<strong>Razón:</strong>
							{station.ghostInfo.reason}
						</p>
						{#if station.ghostInfo.currentState}
							<p class="mt-2 font-body text-base text-gray-600">
								<strong>Estado actual:</strong>
								{station.ghostInfo.currentState}
							</p>
						{/if}
					</div>
				</section>
			{/if}

			<!-- Sources -->
			{#if station.sources && station.sources.length > 0}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						Fuentes
					</h2>

					<div class="space-y-2">
						{#each station.sources as sourceId}
							{@const source = sourcesById[sourceId]}
							{#if source}
								<div class="rounded-lg bg-[var(--bg-secondary)] px-4 py-3 shadow-sm">
									{#if source.url}
										<a
											href={source.url}
											target="_blank"
											rel="noopener noreferrer"
											class="font-body text-sm text-[var(--text-secondary)] underline decoration-dotted hover:text-[var(--text-primary)]"
										>
											{source.title}
										</a>
									{:else}
										<span class="font-body text-sm text-[var(--text-secondary)]">
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
	</main>

	<!-- Footer -->
	<footer class="border-t border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-6 md:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<p class="font-ui text-[10px] text-[var(--text-muted)]">
				{dataDisclaimer.text}
			</p>
			<a
				href="/"
				class="mt-4 inline-flex items-center gap-2 font-display text-sm font-medium text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
				Explorar más estaciones
			</a>
		</div>
	</footer>
</div>
