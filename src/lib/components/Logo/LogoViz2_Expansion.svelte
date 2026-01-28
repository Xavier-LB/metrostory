<script lang="ts">
	/**
	 * VERSIÓN 2: EXPANSIÓN
	 * Visualiza el crecimiento de la red del Metro desde 1975
	 * De 5 estaciones a 143+ estaciones
	 */
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;
	let isDestroyed = false;

	const LINE_COLORS: Record<string, string> = {
		L1: '#d60d27',
		L2: '#fab515',
		L3: '#9a5b29',
		L4: '#2d2b73',
		L4A: '#0471b9',
		L5: '#179859',
		L6: '#9a3488'
	};

	// Historical data
	const expansionData = [
		{ year: 1975, stations: 5, lines: 1, km: 8, event: 'Inauguración L1' },
		{ year: 1978, stations: 15, lines: 1, km: 16, event: 'Extensión L1' },
		{ year: 1987, stations: 26, lines: 2, km: 25, event: 'Inauguración L2' },
		{ year: 1995, stations: 46, lines: 2, km: 38, event: 'Extensión L2' },
		{ year: 1997, stations: 52, lines: 3, km: 40, event: 'Inauguración L5' },
		{ year: 2000, stations: 52, lines: 4, km: 42, event: 'Inauguración L4' },
		{ year: 2006, stations: 80, lines: 5, km: 84, event: 'Inauguración L4A' },
		{ year: 2011, stations: 95, lines: 5, km: 103, event: 'Extensión L5' },
		{ year: 2017, stations: 118, lines: 5, km: 118, event: 'Extensión L3' },
		{ year: 2019, stations: 126, lines: 6, km: 129, event: 'Inauguración L3' },
		{ year: 2024, stations: 143, lines: 6, km: 149, event: 'Extensión L6' }
	];

	onMount(() => {
		if (!container) return;

		const margin = { top: 80, right: 60, bottom: 80, left: 80 };
		const width = container.clientWidth - margin.left - margin.right;
		const height = 400 - margin.top - margin.bottom;

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', '100%')
			.attr('height', 400)
			.attr('viewBox', `0 0 ${container.clientWidth} 400`);

		const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

		// Scales
		const xScale = d3.scaleLinear().domain([1975, 2025]).range([0, width]);
		const yScale = d3.scaleLinear().domain([0, 160]).range([height, 0]);
		const radiusScale = d3.scaleSqrt().domain([0, 150]).range([0, 40]);

		// Grid
		const gridGroup = g.append('g').attr('class', 'grid');

		// Horizontal grid lines
		[0, 40, 80, 120, 160].forEach((val) => {
			gridGroup
				.append('line')
				.attr('x1', 0)
				.attr('y1', yScale(val))
				.attr('x2', width)
				.attr('y2', yScale(val))
				.attr('stroke', 'var(--border-light)')
				.attr('stroke-dasharray', '4,4');

			gridGroup
				.append('text')
				.attr('x', -10)
				.attr('y', yScale(val))
				.attr('text-anchor', 'end')
				.attr('dominant-baseline', 'middle')
				.attr('font-family', 'var(--font-ui)')
				.attr('font-size', '10px')
				.attr('fill', 'var(--text-muted)')
				.text(val);
		});

		// X axis labels
		[1975, 1985, 1995, 2005, 2015, 2025].forEach((year) => {
			gridGroup
				.append('text')
				.attr('x', xScale(year))
				.attr('y', height + 25)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-ui)')
				.attr('font-size', '11px')
				.attr('fill', 'var(--text-tertiary)')
				.text(year);
		});

		// Area chart for stations
		const areaGenerator = d3
			.area<(typeof expansionData)[0]>()
			.x((d) => xScale(d.year))
			.y0(height)
			.y1((d) => yScale(d.stations))
			.curve(d3.curveMonotoneX);

		const lineGenerator = d3
			.line<(typeof expansionData)[0]>()
			.x((d) => xScale(d.year))
			.y((d) => yScale(d.stations))
			.curve(d3.curveMonotoneX);

		// Gradient for area
		const defs = svg.append('defs');
		const areaGradient = defs
			.append('linearGradient')
			.attr('id', 'areaGradient')
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '0%')
			.attr('y2', '100%');

		areaGradient.append('stop').attr('offset', '0%').attr('stop-color', LINE_COLORS.L1).attr('stop-opacity', 0.4);
		areaGradient.append('stop').attr('offset', '100%').attr('stop-color', LINE_COLORS.L1).attr('stop-opacity', 0.05);

		// Draw area (animated)
		const areaPath = g
			.append('path')
			.datum(expansionData)
			.attr('fill', 'url(#areaGradient)')
			.attr('d', areaGenerator);

		// Draw line (animated)
		const linePath = g
			.append('path')
			.datum(expansionData)
			.attr('fill', 'none')
			.attr('stroke', LINE_COLORS.L1)
			.attr('stroke-width', 3)
			.attr('d', lineGenerator);

		// Animate line drawing
		const totalLength = (linePath.node() as SVGPathElement).getTotalLength();
		linePath
			.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
			.attr('stroke-dashoffset', totalLength)
			.transition()
			.duration(3000)
			.ease(d3.easeQuadInOut)
			.attr('stroke-dashoffset', 0);

		// Data points with rhombus shape
		const pointsGroup = g.append('g').attr('class', 'points');

		expansionData.forEach((d, i) => {
			const point = pointsGroup
				.append('g')
				.attr('transform', `translate(${xScale(d.year)}, ${yScale(d.stations)})`)
				.attr('opacity', 0)
				.style('cursor', 'pointer');

			// Outer glow
			point.append('circle').attr('r', 20).attr('fill', LINE_COLORS.L1).attr('opacity', 0.1);

			// Rhombus marker
			point
				.append('path')
				.attr('d', 'M 0 -8 L 8 0 L 0 8 L -8 0 Z')
				.attr('fill', LINE_COLORS.L1)
				.attr('stroke', 'white')
				.attr('stroke-width', 2);

			// Animate entrance
			point
				.transition()
				.delay(i * 250 + 500)
				.duration(400)
				.ease(d3.easeBackOut)
				.attr('opacity', 1);

			// Tooltip on hover
			point
				.on('mouseenter', function () {
					d3.select(this).select('circle').transition().duration(200).attr('r', 30).attr('opacity', 0.2);

					d3.select(this).select('path').transition().duration(200).attr('d', 'M 0 -12 L 12 0 L 0 12 L -12 0 Z');

					// Show tooltip
					tooltip
						.html(
							`<strong>${d.year}</strong><br/>
							${d.stations} estaciones<br/>
							${d.km} km<br/>
							<em>${d.event}</em>`
						)
						.style('left', `${xScale(d.year) + margin.left}px`)
						.style('top', `${yScale(d.stations) + margin.top - 80}px`)
						.style('opacity', 1);
				})
				.on('mouseleave', function () {
					d3.select(this).select('circle').transition().duration(200).attr('r', 20).attr('opacity', 0.1);

					d3.select(this).select('path').transition().duration(200).attr('d', 'M 0 -8 L 8 0 L 0 8 L -8 0 Z');

					tooltip.style('opacity', 0);
				});
		});

		// Tooltip element
		const tooltip = d3
			.select(container)
			.append('div')
			.attr('class', 'tooltip')
			.style('position', 'absolute')
			.style('background', 'var(--bg-secondary)')
			.style('border', '1px solid var(--border-medium)')
			.style('border-radius', '8px')
			.style('padding', '12px')
			.style('font-family', 'var(--font-body)')
			.style('font-size', '12px')
			.style('color', 'var(--text-secondary)')
			.style('box-shadow', 'var(--shadow-lg)')
			.style('pointer-events', 'none')
			.style('opacity', 0)
			.style('transition', 'opacity 0.2s');

		// Current stat display
		const currentGroup = g.append('g').attr('transform', `translate(${width - 100}, 20)`);

		const currentBg = currentGroup
			.append('rect')
			.attr('x', -60)
			.attr('y', -20)
			.attr('width', 120)
			.attr('height', 80)
			.attr('rx', 12)
			.attr('fill', LINE_COLORS.L1)
			.attr('opacity', 0.1);

		currentGroup
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-display)')
			.attr('font-size', '36px')
			.attr('font-weight', '700')
			.attr('fill', LINE_COLORS.L1)
			.text('143');

		currentGroup
			.append('text')
			.attr('y', 25)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-ui)')
			.attr('font-size', '10px')
			.attr('fill', 'var(--text-tertiary)')
			.attr('text-transform', 'uppercase')
			.text('estaciones');

		currentGroup
			.append('text')
			.attr('y', 42)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-ui)')
			.attr('font-size', '10px')
			.attr('fill', 'var(--text-muted)')
			.text('149 km de red');

		// Y-axis label
		g.append('text')
			.attr('transform', 'rotate(-90)')
			.attr('x', -height / 2)
			.attr('y', -55)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-ui)')
			.attr('font-size', '11px')
			.attr('fill', 'var(--text-tertiary)')
			.text('Número de estaciones');
	});

	onDestroy(() => {
		isDestroyed = true;
	});
</script>

<div class="viz-container">
	<div class="viz-header">
		<span class="viz-badge" style="background: var(--metro-l5)">Versión 2</span>
		<h3 class="viz-title">Expansión</h3>
		<p class="viz-description">
			De <strong>5 estaciones</strong> en 1975 a <strong>143 estaciones</strong> en 2024.
			El crecimiento orgánico de una red que conecta toda la ciudad.
		</p>
	</div>
	<div bind:this={container} class="viz-canvas"></div>
</div>

<style>
	.viz-container {
		background: var(--bg-secondary);
		border-radius: 1.5rem;
		overflow: hidden;
		box-shadow: var(--shadow-lg);
		position: relative;
	}

	.viz-header {
		padding: 1.5rem 2rem;
		border-bottom: 1px solid var(--border-light);
	}

	.viz-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		background: var(--metro-l1);
		color: white;
		font-family: var(--font-ui);
		font-size: 10px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		border-radius: 9999px;
	}

	.viz-title {
		margin-top: 0.75rem;
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.viz-description {
		margin-top: 0.5rem;
		font-family: var(--font-body);
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.viz-canvas {
		width: 100%;
		min-height: 400px;
		position: relative;
	}
</style>
