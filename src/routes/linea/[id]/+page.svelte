<script lang="ts">
	import type { PageData } from './$types';
	import LineBadge from '$lib/components/UI/LineBadge.svelte';

	let { data }: { data: PageData } = $props();

	const line = $derived(data.line);
	const lineStations = $derived(data.lineStations);

	function formatDate(dateStr: string): string {
		if (!dateStr) return 'Fecha no disponible';
		// Handle year-only dates like "2028"
		if (dateStr.length === 4) return dateStr;
		const date = new Date(dateStr);
		return date.toLocaleDateString('es-CL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function getSeoDescription(): string {
		let desc = `${line.name} del Metro de Santiago - ${line.stationCount} estaciones, ${line.length} km. `;
		if (line.description) {
			desc += line.description.substring(0, 100);
		}
		if (desc.length > 160) {
			desc = desc.substring(0, 157) + '...';
		}
		return desc;
	}

	function getJsonLd() {
		return {
			'@context': 'https://schema.org',
			'@type': 'TransitRoute',
			name: line.name,
			description: line.description,
			provider: {
				'@type': 'Organization',
				name: 'Metro de Santiago',
				url: 'https://www.metro.cl'
			},
			containsPlace: lineStations.slice(0, 10).map((station) => ({
				'@type': 'TrainStation',
				name: `Estación ${station.name}`,
				geo: {
					'@type': 'GeoCoordinates',
					latitude: station.coordinates[1],
					longitude: station.coordinates[0]
				}
			}))
		};
	}

	const jsonLd = getJsonLd();
</script>

<svelte:head>
	<title>{line.name} - Metro de Santiago | Estaciones, Historia y Mapa | MetroStory</title>
	<meta name="description" content={getSeoDescription()} />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://metrostory.lebaux.co/linea/{line.id.toLowerCase()}" />

	<!-- Open Graph -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="https://metrostory.lebaux.co/linea/{line.id.toLowerCase()}" />
	<meta property="og:title" content="{line.name} - Metro de Santiago | MetroStory" />
	<meta property="og:description" content={line.description || getSeoDescription()} />
	<meta property="og:image" content="https://metrostory.lebaux.co/logo.png" />
	<meta property="og:site_name" content="MetroStory" />
	<meta property="og:locale" content="es_CL" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="{line.name} - Metro de Santiago" />
	<meta name="twitter:description" content={getSeoDescription()} />

	<!-- Keywords -->
	<meta
		name="keywords"
		content="{line.name.toLowerCase()}, metro santiago {line.id.toLowerCase()}, linea {line.id.replace('L', '')} metro, estaciones {line.name.toLowerCase()}, mapa metro santiago, metro chile"
	/>

	<!-- JSON-LD -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>

<div class="min-h-screen bg-[var(--bg-primary)]">
	<!-- Header -->
	<header
		class="relative border-b border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 pb-6 pt-8 md:px-8 md:pb-8 md:pt-12"
	>
		<!-- Colored accent bar -->
		<div class="absolute left-0 right-0 top-0 h-1" style="background-color: {line.color}"></div>

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

			<!-- Line badge -->
			<div class="mb-4">
				<LineBadge {line} />
			</div>

			<!-- Line name -->
			<h1 class="font-display text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
				{line.name}
			</h1>

			<!-- Quick stats -->
			<div class="mt-4 flex flex-wrap gap-4">
				<span
					class="font-ui rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
				>
					{line.stationCount} estaciones
				</span>
				<span
					class="font-ui rounded-full bg-[var(--bg-tertiary)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]"
				>
					{line.length} km
				</span>
				<span
					class="font-ui rounded-full px-3 py-1 text-xs font-medium"
					style="background-color: {line.color}20; color: {line.color}"
				>
					{line.rodadura === 'neumatica' ? 'Rodado neumático' : 'Rodado férreo'}
				</span>
				{#if line.automationLevel === 'GoA4'}
					<span
						class="font-ui rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
					>
						Automática (sin conductor)
					</span>
				{/if}
			</div>
		</div>
	</header>

	<!-- Content -->
	<main class="px-4 py-8 md:px-8 md:py-12">
		<div class="mx-auto max-w-3xl">
			<!-- Description -->
			{#if line.description}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						Descripción
					</h2>
					<div class="rounded-xl bg-[var(--bg-secondary)] p-6 shadow-sm">
						<p class="font-body text-base leading-relaxed text-[var(--text-secondary)]">
							{line.description}
						</p>
					</div>
				</section>
			{/if}

			<!-- Historical Note -->
			{#if line.historicalNote}
				<section class="mb-10">
					<h2
						class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
					>
						Historia
					</h2>
					<div
						class="rounded-xl border-l-4 bg-[var(--bg-secondary)] p-6 shadow-sm"
						style="border-color: {line.color}"
					>
						<p class="font-body text-base leading-relaxed text-[var(--text-secondary)]">
							{line.historicalNote}
						</p>
					</div>
				</section>
			{/if}

			<!-- Technical Data -->
			<section class="mb-10">
				<h2
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Datos técnicos
				</h2>
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm">
						<p class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
							Inauguración
						</p>
						<p class="font-body text-lg font-semibold text-[var(--text-primary)]">
							{formatDate(line.inauguratedAt)}
						</p>
					</div>
					<div class="rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm">
						<p class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
							Terminales
						</p>
						<p class="font-body text-sm text-[var(--text-primary)]">
							{line.terminals[0]} - {line.terminals[1]}
						</p>
					</div>
					{#if line.constructionMethod}
						<div class="rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm">
							<p class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
								Método de construcción
							</p>
							<p class="font-body text-sm text-[var(--text-primary)]">
								{line.constructionMethod === 'trinchera_abierta'
									? 'Trinchera abierta'
									: line.constructionMethod === 'tunel_profundo'
										? 'Túnel profundo'
										: line.constructionMethod === 'viaducto'
											? 'Viaducto elevado'
											: line.constructionMethod === 'NATM'
												? 'NATM (túnel subterráneo)'
												: line.constructionMethod}
							</p>
						</div>
					{/if}
					<div class="rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm">
						<p class="font-ui text-[10px] uppercase tracking-wide text-[var(--text-tertiary)]">
							Estado
						</p>
						<p class="font-body text-sm text-[var(--text-primary)]">
							{line.status === 'operational'
								? 'Operacional'
								: line.status === 'construction'
									? 'En construcción'
									: 'Planificada'}
						</p>
					</div>
				</div>
			</section>

			<!-- Stations List -->
			<section class="mb-10">
				<h2
					class="font-display mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
				>
					Estaciones ({lineStations.length})
				</h2>

				<div class="space-y-2">
					{#each lineStations as station, i}
						<a
							href="/estacion/{station.id}"
							class="flex items-center gap-4 rounded-xl bg-[var(--bg-secondary)] p-4 shadow-sm transition-all hover:bg-[var(--bg-accent)] hover:shadow-md"
						>
							<!-- Station number -->
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
								style="background-color: {line.color}"
							>
								{i + 1}
							</div>

							<!-- Station info -->
							<div class="flex-1">
								<h3 class="font-display text-base font-semibold text-[var(--text-primary)]">
									{station.name}
								</h3>
								{#if station.nameOrigin}
									<p class="mt-1 line-clamp-1 font-body text-xs text-[var(--text-tertiary)]">
										{station.nameOrigin}
									</p>
								{/if}
							</div>

							<!-- Badges -->
							<div class="flex gap-1">
								{#if station.isTransfer}
									<span class="rounded-full bg-[var(--metro-l4a)]/10 px-2 py-0.5 text-[8px] font-bold uppercase text-[var(--metro-l4a)]">
										Comb.
									</span>
								{/if}
								{#if station.isTerminal}
									<span class="rounded-full bg-[var(--metro-l3)]/10 px-2 py-0.5 text-[8px] font-bold uppercase text-[var(--metro-l3)]">
										Term.
									</span>
								{/if}
							</div>

							<!-- Arrow -->
							<svg
								class="h-4 w-4 flex-shrink-0 text-[var(--text-muted)]"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</a>
					{/each}
				</div>
			</section>
		</div>
	</main>

	<!-- Footer -->
	<footer class="border-t border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-6 md:px-8">
		<div class="mx-auto max-w-3xl text-center">
			<a
				href="/"
				class="inline-flex items-center gap-2 font-display text-sm font-medium text-[var(--text-tertiary)] transition-colors hover:text-[var(--text-primary)]"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
				</svg>
				Explorar el mapa
			</a>
		</div>
	</footer>
</div>
