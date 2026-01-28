<script lang="ts">
	/**
	 * VERSIÓN 3: MOSAICO COLABORATIVO
	 * Representa los 8,500 rombos tejidos del mural colaborativo del 50 aniversario
	 * Una visualización generativa que crece orgánicamente
	 */
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;
	let isDestroyed = false;

	const LINE_COLORS = [
		'#d60d27', // L1
		'#fab515', // L2
		'#9a5b29', // L3
		'#2d2b73', // L4
		'#0471b9', // L4A
		'#179859', // L5
		'#9a3488' // L6
	];

	// Configuration
	const TOTAL_RHOMBUSES = 85; // Scaled representation of 8,500
	const RHOMBUS_SIZE = 12;
	const COLS = 17;

	interface Rhombus {
		id: number;
		col: number;
		row: number;
		color: string;
		delay: number;
		scale: number;
	}

	onMount(() => {
		if (!container) return;

		const width = container.clientWidth;
		const height = 420;
		const margin = { top: 80, right: 40, bottom: 60, left: 40 };
		const gridWidth = width - margin.left - margin.right;
		const gridHeight = height - margin.top - margin.bottom;

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', '100%')
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

		// Create rhombus data
		const rhombuses: Rhombus[] = [];
		const rows = Math.ceil(TOTAL_RHOMBUSES / COLS);
		const spacingX = gridWidth / COLS;
		const spacingY = gridHeight / rows;

		for (let i = 0; i < TOTAL_RHOMBUSES; i++) {
			const col = i % COLS;
			const row = Math.floor(i / COLS);
			const offset = row % 2 === 0 ? 0 : spacingX / 2;

			rhombuses.push({
				id: i,
				col: col * spacingX + offset + spacingX / 2,
				row: row * spacingY + spacingY / 2,
				color: LINE_COLORS[Math.floor(Math.random() * LINE_COLORS.length)],
				delay: Math.random() * 2000,
				scale: 0.8 + Math.random() * 0.4
			});
		}

		// Background pattern
		const defs = svg.append('defs');

		// Create pattern for background
		const pattern = defs
			.append('pattern')
			.attr('id', 'mosaicBg')
			.attr('width', 20)
			.attr('height', 20)
			.attr('patternUnits', 'userSpaceOnUse');

		pattern.append('circle').attr('cx', 10).attr('cy', 10).attr('r', 1).attr('fill', 'var(--border-light)');

		g.append('rect').attr('width', gridWidth).attr('height', gridHeight).attr('fill', 'url(#mosaicBg)').attr('opacity', 0.5);

		// Rhombus path helper
		function rhombusPath(size: number): string {
			const h = size / 2;
			return `M 0 ${-h} L ${h} 0 L 0 ${h} L ${-h} 0 Z`;
		}

		// Create rhombus groups
		const rhombusGroup = g.append('g').attr('class', 'rhombuses');

		const rhombusElements = rhombusGroup
			.selectAll('g')
			.data(rhombuses)
			.enter()
			.append('g')
			.attr('transform', (d) => `translate(${d.col}, ${d.row})`)
			.attr('opacity', 0)
			.style('cursor', 'pointer');

		// Shadow/glow behind
		rhombusElements
			.append('path')
			.attr('d', (d) => rhombusPath(RHOMBUS_SIZE * d.scale * 1.5))
			.attr('fill', (d) => d.color)
			.attr('opacity', 0.15);

		// Main rhombus
		rhombusElements
			.append('path')
			.attr('d', (d) => rhombusPath(RHOMBUS_SIZE * d.scale))
			.attr('fill', (d) => d.color)
			.attr('stroke', 'white')
			.attr('stroke-width', 1)
			.attr('class', 'main-rhombus');

		// Entrance animation - wave pattern
		rhombusElements.each(function (d, i) {
			const element = d3.select(this);
			const waveDelay = (d.col / gridWidth) * 1000 + (d.row / gridHeight) * 500;

			element
				.transition()
				.delay(waveDelay + 500)
				.duration(600)
				.ease(d3.easeBackOut.overshoot(2))
				.attr('opacity', 1)
				.attr('transform', `translate(${d.col}, ${d.row}) scale(1)`)
				.attrTween('transform', function () {
					return function (t: number) {
						const bounce = d3.easeBackOut.overshoot(2)(t);
						return `translate(${d.col}, ${d.row}) scale(${bounce})`;
					};
				});
		});

		// Hover effects
		rhombusElements
			.on('mouseenter', function (event, d) {
				d3.select(this)
					.raise()
					.transition()
					.duration(200)
					.attr('transform', `translate(${d.col}, ${d.row}) scale(1.5)`);

				d3.select(this).select('.main-rhombus').transition().duration(200).attr('stroke-width', 2);
			})
			.on('mouseleave', function (event, d) {
				d3.select(this)
					.transition()
					.duration(200)
					.attr('transform', `translate(${d.col}, ${d.row}) scale(1)`);

				d3.select(this).select('.main-rhombus').transition().duration(200).attr('stroke-width', 1);
			});

		// Continuous subtle wave animation
		function waveAnimation() {
			if (isDestroyed) return;

			rhombusElements.each(function (d, i) {
				const element = d3.select(this);
				const phase = (Date.now() / 1000 + d.col / 50 + d.row / 30) % (Math.PI * 2);
				const scale = 1 + Math.sin(phase) * 0.05;

				element.attr('transform', `translate(${d.col}, ${d.row}) scale(${scale})`);
			});

			requestAnimationFrame(waveAnimation);
		}

		setTimeout(waveAnimation, 3000);

		// Counter animation
		const counterGroup = svg.append('g').attr('transform', `translate(${width - 120}, 50)`);

		counterGroup
			.append('rect')
			.attr('x', -50)
			.attr('y', -25)
			.attr('width', 100)
			.attr('height', 60)
			.attr('rx', 12)
			.attr('fill', 'var(--bg-secondary)')
			.attr('stroke', 'var(--border-medium)')
			.attr('stroke-width', 1);

		const counterText = counterGroup
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('y', 5)
			.attr('font-family', 'var(--font-display)')
			.attr('font-size', '24px')
			.attr('font-weight', '700')
			.attr('fill', 'var(--metro-l1)')
			.text('0');

		counterGroup
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('y', 22)
			.attr('font-family', 'var(--font-ui)')
			.attr('font-size', '9px')
			.attr('fill', 'var(--text-muted)')
			.text('de 8,500');

		// Animate counter
		const counter = { value: 0 };
		d3.select(counter)
			.transition()
			.duration(3000)
			.ease(d3.easeQuadOut)
			.tween('counter', function () {
				const interpolator = d3.interpolateNumber(0, 8500);
				return function (t: number) {
					counterText.text(Math.floor(interpolator(t)).toLocaleString('es-CL'));
				};
			});

		// Legend
		const legendGroup = svg.append('g').attr('transform', `translate(${margin.left}, ${height - 30})`);

		LINE_COLORS.forEach((color, i) => {
			const legendItem = legendGroup.append('g').attr('transform', `translate(${i * 45}, 0)`);

			legendItem.append('path').attr('d', rhombusPath(8)).attr('fill', color);

			legendItem
				.append('text')
				.attr('x', 12)
				.attr('y', 4)
				.attr('font-family', 'var(--font-ui)')
				.attr('font-size', '9px')
				.attr('fill', 'var(--text-muted)')
				.text(`L${i === 4 ? '4A' : i + 1}`);
		});
	});

	onDestroy(() => {
		isDestroyed = true;
	});
</script>

<div class="viz-container">
	<div class="viz-header">
		<span class="viz-badge" style="background: var(--metro-l3)">Versión 3</span>
		<h3 class="viz-title">Mosaico Colaborativo</h3>
		<p class="viz-description">
			<strong>8,500 rombos tejidos</strong> por pasajeros del Metro crearon un mural colaborativo
			de 24m² en celebración de los 50 años. Cada pieza representa una historia de viaje.
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
		min-height: 420px;
		position: relative;
	}
</style>
