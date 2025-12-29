<script lang="ts">
	import type { PageData } from './$types';
	import LineBadge from '$lib/components/UI/LineBadge.svelte';
	import { allLinesById } from '$lib/data/lines';
	import { sourcesById } from '$lib/data/sources';

	let { data }: { data: PageData } = $props();

	// State
	let searchQuery = $state('');
	let selectedLine = $state<string | null>(null);
	let showOnlyTransfer = $state(false);
	let showOnlyGhost = $state(false);
	let showOnlyWithArt = $state(false);
	let sortColumn = $state<string>('name');
	let sortDirection = $state<'asc' | 'desc'>('asc');
	let expandedStation = $state<string | null>(null);
	let activeTab = $state<'stations' | 'lines' | 'sources' | 'artworks' | 'rolling-stock'>('stations');

	// Artworks by station
	const artworksByStation = $derived.by(() => {
		const map: Record<string, typeof data.artworks> = {};
		for (const artwork of data.artworks) {
			if (artwork.stationId) {
				if (!map[artwork.stationId]) map[artwork.stationId] = [];
				map[artwork.stationId].push(artwork);
			}
		}
		return map;
	});

	// Station IDs with art
	const stationIdsWithArt = $derived(new Set(Object.keys(artworksByStation)));

	// Filtering and sorting
	const filteredStations = $derived.by(() => {
		let result = [...data.stations];

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(s) =>
					s.name.toLowerCase().includes(query) ||
					s.id.toLowerCase().includes(query) ||
					s.commune?.toLowerCase().includes(query) ||
					s.nameOrigin?.toLowerCase().includes(query) ||
					s.history?.toLowerCase().includes(query) ||
					s.curiosity?.toLowerCase().includes(query)
			);
		}

		if (selectedLine) {
			const lineId = selectedLine;
			result = result.filter((s) => s.lines.includes(lineId));
		}

		if (showOnlyTransfer) {
			result = result.filter((s) => s.isTransfer);
		}

		if (showOnlyGhost) {
			result = result.filter((s) => s.isGhost);
		}

		if (showOnlyWithArt) {
			result = result.filter((s) => stationIdsWithArt.has(s.id));
		}

		result.sort((a, b) => {
			let aVal: string | number | boolean = '';
			let bVal: string | number | boolean = '';

			switch (sortColumn) {
				case 'name':
					aVal = a.name;
					bVal = b.name;
					break;
				case 'id':
					aVal = a.id;
					bVal = b.id;
					break;
				case 'commune':
					aVal = a.commune || '';
					bVal = b.commune || '';
					break;
				case 'inauguratedAt':
					aVal = a.inauguratedAt;
					bVal = b.inauguratedAt;
					break;
			}

			if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
			if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
			return 0;
		});

		return result;
	});

	function toggleExpand(stationId: string) {
		expandedStation = expandedStation === stationId ? null : stationId;
	}

	function getSource(sourceId: string) {
		return sourcesById[sourceId];
	}
</script>

<svelte:head>
	<title>Base de Datos Completa | MetroStory</title>
</svelte:head>

<div class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
	<!-- Header -->
	<header class="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-6">
		<div class="mx-auto max-w-7xl">
			<a href="/" class="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">← Volver</a>
			<h1 class="mt-2 text-2xl font-bold">Base de Datos Completa</h1>
			<p class="mt-1 text-sm text-[var(--text-secondary)]">
				Todos los datos en formato raw. {data.stats.stationCount} estaciones, {data.stats.lineCount} líneas, {data.stats.sourceCount} fuentes, {data.stats.artworkCount} obras, {data.stats.rollingStockCount} trenes.
			</p>
		</div>
	</header>

	<!-- Tabs -->
	<nav class="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] px-4">
		<div class="mx-auto max-w-7xl flex gap-1 overflow-x-auto">
			{#each [
				{ id: 'stations', label: `Estaciones (${data.stats.stationCount})` },
				{ id: 'lines', label: `Líneas (${data.stats.lineCount + data.stats.futureLineCount})` },
				{ id: 'sources', label: `Fuentes (${data.stats.sourceCount})` },
				{ id: 'artworks', label: `MetroArte (${data.stats.artworkCount})` },
				{ id: 'rolling-stock', label: `Trenes (${data.stats.rollingStockCount})` }
			] as tab}
				<button
					class="px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors {activeTab === tab.id ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}"
					onclick={() => activeTab = tab.id as typeof activeTab}
				>
					{tab.label}
				</button>
			{/each}
		</div>
	</nav>

	<main class="px-4 py-6">
		<div class="mx-auto max-w-7xl">

			<!-- ESTACIONES TAB -->
			{#if activeTab === 'stations'}
				<!-- Filters -->
				<div class="mb-4 flex flex-wrap gap-3 items-center">
					<input
						type="search"
						bind:value={searchQuery}
						placeholder="Buscar..."
						class="rounded border border-[var(--border-light)] bg-[var(--bg-secondary)] px-3 py-2 text-sm"
					/>
					<select bind:value={selectedLine} class="rounded border border-[var(--border-light)] bg-[var(--bg-secondary)] px-3 py-2 text-sm">
						<option value={null}>Todas las líneas</option>
						{#each [...data.lines, ...data.futureLines] as line}
							<option value={line.id}>{line.id} - {line.name}</option>
						{/each}
					</select>
					<select bind:value={sortColumn} class="rounded border border-[var(--border-light)] bg-[var(--bg-secondary)] px-3 py-2 text-sm">
						<option value="name">Ordenar: Nombre</option>
						<option value="id">Ordenar: ID</option>
						<option value="commune">Ordenar: Comuna</option>
						<option value="inauguratedAt">Ordenar: Fecha</option>
					</select>
					<label class="flex items-center gap-1 text-sm">
						<input type="checkbox" bind:checked={showOnlyTransfer} /> Combinación
					</label>
					<label class="flex items-center gap-1 text-sm">
						<input type="checkbox" bind:checked={showOnlyGhost} /> Fantasma
					</label>
					<label class="flex items-center gap-1 text-sm">
						<input type="checkbox" bind:checked={showOnlyWithArt} /> Con arte
					</label>
					<span class="text-sm text-[var(--text-muted)]">{filteredStations.length} resultados</span>
				</div>

				<!-- Station list -->
				<div class="space-y-2">
					{#each filteredStations as station (station.id)}
						{@const isExpanded = expandedStation === station.id}
						{@const stationArtworks = artworksByStation[station.id] || []}
						<div class="border border-[var(--border-light)] rounded bg-[var(--bg-secondary)]">
							<!-- Header -->
							<button
								class="w-full px-3 py-2 flex items-center gap-3 text-left hover:bg-[var(--bg-accent)] text-sm"
								onclick={() => toggleExpand(station.id)}
							>
								<span class="text-[var(--text-muted)] {isExpanded ? 'rotate-90' : ''} transition-transform">▶</span>
								<code class="text-xs text-[var(--text-muted)]">{station.id}</code>
								<span class="font-medium">{station.name}</span>
								<div class="flex gap-1">
									{#each station.lines as lineId}
										{@const line = allLinesById[lineId]}
										{#if line}
											<LineBadge {line} size="sm" />
										{:else}
											<span class="text-xs bg-gray-500 text-white px-1 rounded">{lineId}</span>
										{/if}
									{/each}
								</div>
								{#if station.isTransfer}<span class="text-xs bg-blue-500/20 text-blue-400 px-1 rounded">COMB</span>{/if}
								{#if station.isTerminal}<span class="text-xs bg-green-500/20 text-green-400 px-1 rounded">TERM</span>{/if}
								{#if station.isGhost}<span class="text-xs bg-purple-500/20 text-purple-400 px-1 rounded">GHOST</span>{/if}
								{#if stationArtworks.length > 0}<span class="text-xs bg-yellow-500/20 text-yellow-400 px-1 rounded">ART:{stationArtworks.length}</span>{/if}
								{#if station.sources?.length}<span class="text-xs text-[var(--text-muted)]">[{station.sources.length} fuentes]</span>{/if}
							</button>

							<!-- Expanded content -->
							{#if isExpanded}
								<div class="border-t border-[var(--border-light)] px-3 py-3 bg-[var(--bg-primary)] text-xs font-mono space-y-3">
									<!-- All fields -->
									<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
										<div><span class="text-[var(--text-muted)]">id:</span> {station.id}</div>
										<div><span class="text-[var(--text-muted)]">name:</span> {station.name}</div>
										<div><span class="text-[var(--text-muted)]">coordinates:</span> [{station.coordinates[0]}, {station.coordinates[1]}]</div>
										<div><span class="text-[var(--text-muted)]">lines:</span> [{station.lines.join(', ')}]</div>
										<div><span class="text-[var(--text-muted)]">inauguratedAt:</span> {station.inauguratedAt}</div>
										<div><span class="text-[var(--text-muted)]">commune:</span> {station.commune || 'null'}</div>
										<div><span class="text-[var(--text-muted)]">isTransfer:</span> {station.isTransfer}</div>
										<div><span class="text-[var(--text-muted)]">isTerminal:</span> {station.isTerminal}</div>
										<div><span class="text-[var(--text-muted)]">isAccessible:</span> {station.isAccessible}</div>
										<div><span class="text-[var(--text-muted)]">isGhost:</span> {station.isGhost || false}</div>
										{#if station.formerName}
											<div><span class="text-[var(--text-muted)]">formerName:</span> {station.formerName}</div>
										{/if}
										{#if station.architect}
											<div><span class="text-[var(--text-muted)]">architect:</span> {station.architect}</div>
										{/if}
										{#if station.dailyPassengers}
											<div><span class="text-[var(--text-muted)]">dailyPassengers:</span> {station.dailyPassengers.toLocaleString()}</div>
										{/if}
									</div>

									<!-- Text fields -->
									{#if station.nameOrigin}
										<div>
											<div class="text-[var(--text-muted)] mb-1">nameOrigin:</div>
											<div class="whitespace-pre-wrap text-[var(--text-secondary)] pl-2 border-l-2 border-[var(--border-light)]">{station.nameOrigin}</div>
										</div>
									{/if}

									{#if station.history}
										<div>
											<div class="text-[var(--text-muted)] mb-1">history:</div>
											<div class="whitespace-pre-wrap text-[var(--text-secondary)] pl-2 border-l-2 border-[var(--border-light)]">{station.history}</div>
										</div>
									{/if}

									{#if station.curiosity}
										<div>
											<div class="text-[var(--text-muted)] mb-1">curiosity:</div>
											<div class="whitespace-pre-wrap text-[var(--text-secondary)] pl-2 border-l-2 border-[var(--border-light)]">{station.curiosity}</div>
										</div>
									{/if}

									{#if station.pictogram}
										<div>
											<div class="text-[var(--text-muted)] mb-1">pictogram:</div>
											<div class="whitespace-pre-wrap text-[var(--text-secondary)] pl-2 border-l-2 border-[var(--border-light)]">{station.pictogram}</div>
										</div>
									{/if}

									<!-- Ghost info -->
									{#if station.isGhost && station.ghostInfo}
										<div>
											<div class="text-[var(--text-muted)] mb-1">ghostInfo:</div>
											<div class="pl-2 border-l-2 border-purple-500/50 text-[var(--text-secondary)]">
												<div>status: {station.ghostInfo.status}</div>
												<div>reason: {station.ghostInfo.reason}</div>
												<div>visibility: {station.ghostInfo.visibility}</div>
												{#if station.ghostInfo.currentState}
													<div>currentState: {station.ghostInfo.currentState}</div>
												{/if}
											</div>
										</div>
									{/if}

									<!-- Images if any -->
									{#if station.images?.length}
										<div>
											<div class="text-[var(--text-muted)] mb-1">images ({station.images.length}):</div>
											<div class="pl-2 border-l-2 border-[var(--border-light)] space-y-1">
												{#each station.images as img, i}
													<div class="text-[var(--text-secondary)]">
														[{i}] url: {img.url}, caption: "{img.caption}"{#if img.year}, year: {img.year}{/if}{#if img.source}, source: "{img.source}"{/if}
													</div>
												{/each}
											</div>
										</div>
									{/if}

									<!-- Artworks -->
									{#if stationArtworks.length > 0}
										<div>
											<div class="text-[var(--text-muted)] mb-1">artworks ({stationArtworks.length}):</div>
											<div class="pl-2 border-l-2 border-yellow-500/50 space-y-2">
												{#each stationArtworks as art}
													<div class="text-[var(--text-secondary)]">
														<div>id: {art.id}, title: "{art.title}"</div>
														<div>artist: {art.artist}, year: {art.year || 'null'}, type: {art.type}</div>
														{#if art.size}<div>size: {art.size}</div>{/if}
														{#if art.location}<div>location: {art.location}</div>{/if}
														<div class="text-xs text-[var(--text-muted)]">description: {art.description}</div>
													</div>
												{/each}
											</div>
										</div>
									{/if}

									<!-- Sources -->
									<div>
										<div class="text-[var(--text-muted)] mb-1">sources ({station.sources?.length || 0}):</div>
										{#if station.sources?.length}
											<div class="pl-2 border-l-2 border-[var(--border-light)] space-y-1">
												{#each station.sources as sourceId}
													{@const source = getSource(sourceId)}
													<div class="text-[var(--text-secondary)]">
														{#if source}
															<span class="text-[var(--text-muted)]">{sourceId}:</span> "{source.title}"
															{#if source.url}
																<a href={source.url} target="_blank" class="text-[var(--accent)] hover:underline ml-1">[url]</a>
															{/if}
															{#if source.consultedAt}
																<span class="text-[var(--text-muted)]">(consultado: {source.consultedAt})</span>
															{/if}
														{:else}
															<span class="text-red-400">{sourceId}: NOT FOUND</span>
														{/if}
													</div>
												{/each}
											</div>
										{:else}
											<div class="pl-2 text-[var(--text-muted)]">[]</div>
										{/if}
									</div>

									<!-- Link -->
									<div class="pt-2 border-t border-[var(--border-light)]">
										<a href="/estacion/{station.id}" class="text-[var(--accent)] hover:underline">Ver página →</a>
									</div>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			<!-- LÍNEAS TAB -->
			{#if activeTab === 'lines'}
				<div class="space-y-4">
					<h2 class="text-lg font-bold">Líneas Operativas ({data.lines.length})</h2>
					<div class="space-y-2">
						{#each data.lines as line}
							<div class="border border-[var(--border-light)] rounded bg-[var(--bg-secondary)] p-3 text-xs font-mono">
								<div class="flex items-center gap-2 mb-2">
									<LineBadge {line} />
									<span class="font-bold text-sm font-sans">{line.name}</span>
									<span class="text-[var(--text-muted)]">({line.status})</span>
								</div>
								<div class="grid grid-cols-2 md:grid-cols-3 gap-1 text-[var(--text-secondary)]">
									<div>id: {line.id}</div>
									<div>color: {line.color}</div>
									<div>textColor: {line.textColor}</div>
									<div>inauguratedAt: {line.inauguratedAt}</div>
									<div>length: {line.length} km</div>
									<div>stationCount: {line.stationCount}</div>
									<div>rodadura: {line.rodadura}</div>
									<div>automationLevel: {line.automationLevel}</div>
									<div>terminals: [{line.terminals.join(', ')}]</div>
								</div>
								{#if line.constructionMethod}
									<div class="mt-1 text-[var(--text-secondary)]">constructionMethod: {line.constructionMethod}</div>
								{/if}
								{#if line.description}
									<div class="mt-2 text-[var(--text-muted)]">description: {line.description}</div>
								{/if}
								{#if line.historicalNote}
									<div class="mt-1 text-[var(--text-muted)]">historicalNote: {line.historicalNote}</div>
								{/if}
								{#if line.sources?.length}
									<div class="mt-1 text-[var(--text-muted)]">sources: [{line.sources.join(', ')}]</div>
								{/if}
							</div>
						{/each}
					</div>

					<h2 class="text-lg font-bold mt-6">Líneas Futuras ({data.futureLines.length})</h2>
					<div class="space-y-2">
						{#each data.futureLines as line}
							<div class="border border-[var(--border-light)] rounded bg-[var(--bg-secondary)] p-3 text-xs font-mono">
								<div class="flex items-center gap-2 mb-2">
									<LineBadge {line} />
									<span class="font-bold text-sm font-sans">{line.name}</span>
									<span class="text-[var(--text-muted)]">({line.status})</span>
								</div>
								<div class="grid grid-cols-2 md:grid-cols-3 gap-1 text-[var(--text-secondary)]">
									<div>id: {line.id}</div>
									<div>color: {line.color}</div>
									<div>textColor: {line.textColor}</div>
									<div>inauguratedAt: {line.inauguratedAt}</div>
									<div>length: {line.length} km</div>
									<div>stationCount: {line.stationCount}</div>
									<div>rodadura: {line.rodadura}</div>
									<div>automationLevel: {line.automationLevel}</div>
									<div>terminals: [{line.terminals.join(', ')}]</div>
								</div>
								{#if line.constructionMethod}
									<div class="mt-1 text-[var(--text-secondary)]">constructionMethod: {line.constructionMethod}</div>
								{/if}
								{#if line.description}
									<div class="mt-2 text-[var(--text-muted)]">description: {line.description}</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- FUENTES TAB -->
			{#if activeTab === 'sources'}
				<div class="space-y-2">
					{#each data.sources as source}
						<div class="border border-[var(--border-light)] rounded bg-[var(--bg-secondary)] p-3 text-xs font-mono">
							<div class="flex flex-wrap items-center gap-2">
								<code class="bg-[var(--bg-accent)] px-1 rounded">{source.id}</code>
								<span class="text-[var(--text-primary)] font-sans">{source.title}</span>
							</div>
							<div class="mt-1 text-[var(--text-secondary)]">
								{#if source.url}
									<div>url: <a href={source.url} target="_blank" class="text-[var(--accent)] hover:underline break-all">{source.url}</a></div>
								{:else}
									<div>url: null</div>
								{/if}
								{#if source.consultedAt}
									<div>consultedAt: {source.consultedAt}</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- METROARTE TAB -->
			{#if activeTab === 'artworks'}
				<div class="space-y-2">
					{#each data.artworks as artwork}
						<div class="border border-[var(--border-light)] rounded bg-[var(--bg-secondary)] p-3 text-xs font-mono">
							<div class="flex flex-wrap items-center gap-2 mb-2">
								<code class="bg-[var(--bg-accent)] px-1 rounded">{artwork.id}</code>
								<span class="text-[var(--text-primary)] font-sans font-bold">{artwork.title}</span>
								<span class="text-[var(--text-muted)]">por {artwork.artist}</span>
							</div>
							<div class="grid grid-cols-2 md:grid-cols-3 gap-1 text-[var(--text-secondary)]">
								<div>type: {artwork.type}</div>
								<div>year: {artwork.year || 'null'}</div>
								<div>stationId: {artwork.stationId || 'null'}</div>
								{#if artwork.size}<div>size: {artwork.size}</div>{/if}
								{#if artwork.location}<div>location: {artwork.location}</div>{/if}
							</div>
							<div class="mt-2 text-[var(--text-muted)]">description: {artwork.description}</div>
						</div>
					{/each}
				</div>
			{/if}

			<!-- ROLLING STOCK TAB -->
			{#if activeTab === 'rolling-stock'}
				<div class="space-y-2">
					{#each data.rollingStock as train}
						<div class="border border-[var(--border-light)] rounded bg-[var(--bg-secondary)] p-3 text-xs font-mono">
							<div class="flex flex-wrap items-center gap-2 mb-2">
								<code class="bg-[var(--bg-accent)] px-1 rounded">{train.id}</code>
								<span class="text-[var(--text-primary)] font-sans font-bold">{train.model}</span>
								<span class="text-[var(--text-muted)]">({train.status})</span>
							</div>
							<div class="grid grid-cols-2 md:grid-cols-3 gap-1 text-[var(--text-secondary)]">
								<div>manufacturer: {train.manufacturer}</div>
								<div>country: {train.country}</div>
								<div>yearIntroduced: {train.yearIntroduced}</div>
								<div>rodadura: {train.rodadura}</div>
								<div>hasAirConditioning: {train.hasAirConditioning}</div>
								<div>isAutomatic: {train.isAutomatic}</div>
								<div>lines: [{train.lines.join(', ')}]</div>
							</div>
							{#if train.characteristics?.length}
								<div class="mt-2 text-[var(--text-muted)]">characteristics: [{train.characteristics.join(', ')}]</div>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</main>

	<!-- Footer -->
	<footer class="border-t border-[var(--border-light)] bg-[var(--bg-secondary)] px-4 py-6">
		<div class="mx-auto max-w-7xl text-center text-sm text-[var(--text-secondary)]">
			<p>Datos en <a href="https://github.com/YOUR_USERNAME/metrostory/tree/main/data" target="_blank" class="text-[var(--accent)] hover:underline">GitHub</a> (JSON)</p>
		</div>
	</footer>
</div>
