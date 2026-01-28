<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	interface Props {
		activeVersion: 1 | 2 | 3;
		onVersionChange: (version: 1 | 2 | 3) => void;
	}

	let { activeVersion, onVersionChange }: Props = $props();

	let container: HTMLDivElement;
	let isDestroyed = false;

	const METRO_RED = '#d60d27';
	const METRO_GRAY = '#4a4845';
	const METRO_LIGHT = '#e8e5e1';

	interface VersionData {
		id: 1 | 2 | 3;
		startYear: number;
		endYear: number | null;
		label: string;
		milestone: string;
	}

	const versions: VersionData[] = [
		{ id: 1, startYear: 1969, endYear: 1997, label: 'Original', milestone: 'Inauguración 1975' },
		{ id: 2, startYear: 1997, endYear: 2011, label: 'Línea 5', milestone: 'Tipografía Métrika' },
		{ id: 3, startYear: 2011, endYear: null, label: 'Actual', milestone: 'Gotham + Helvetica' }
	];

	const milestones = [
		{ year: 1969, label: 'Inicio obras', type: 'start' },
		{ year: 1975, label: 'Inauguración', type: 'major' },
		{ year: 1997, label: 'Línea 5', type: 'version' },
		{ year: 2011, label: 'Rediseño', type: 'version' },
		{ year: 2025, label: '50 años', type: 'anniversary' }
	];

	onMount(() => {
		if (!container) return;

		const margin = { top: 60, right: 40, bottom: 80, left: 40 };
		const width = container.clientWidth - margin.left - margin.right;
		const height = 300 - margin.top - margin.bottom;

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', '100%')
			.attr('height', 300)
			.attr('viewBox', `0 0 ${container.clientWidth} 300`)
			.attr('preserveAspectRatio', 'xMidYMid meet');

		const g = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

		// Defs
		const defs = svg.append('defs');

		// Gradient for active version
		const activeGradient = defs
			.append('linearGradient')
			.attr('id', 'activeVersionGradient')
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '100%')
			.attr('y2', '0%');

		activeGradient.append('stop').attr('offset', '0%').attr('stop-color', METRO_RED).attr('stop-opacity', 0.3);

		activeGradient.append('stop').attr('offset', '100%').attr('stop-color', METRO_RED).attr('stop-opacity', 0.1);

		// Scale
		const xScale = d3.scaleLinear().domain([1965, 2030]).range([0, width]);

		// Background grid
		const gridGroup = g.append('g').attr('class', 'grid');

		for (let year = 1970; year <= 2030; year += 10) {
			gridGroup
				.append('line')
				.attr('x1', xScale(year))
				.attr('y1', -20)
				.attr('x2', xScale(year))
				.attr('y2', height + 30)
				.attr('stroke', METRO_LIGHT)
				.attr('stroke-width', 1)
				.attr('stroke-dasharray', '4,4');
		}

		// Version bands
		const bandsGroup = g.append('g').attr('class', 'bands');

		function updateBands() {
			bandsGroup.selectAll('*').remove();

			versions.forEach((v) => {
				const isActive = v.id === activeVersion;
				const endYear = v.endYear || 2030;

				const band = bandsGroup
					.append('rect')
					.attr('x', xScale(v.startYear))
					.attr('y', 0)
					.attr('width', xScale(endYear) - xScale(v.startYear))
					.attr('height', height)
					.attr('fill', isActive ? 'url(#activeVersionGradient)' : 'transparent')
					.attr('stroke', isActive ? METRO_RED : METRO_LIGHT)
					.attr('stroke-width', isActive ? 2 : 1)
					.attr('rx', 8)
					.style('cursor', 'pointer')
					.on('click', () => onVersionChange(v.id));

				if (isActive) {
					band.transition().duration(300).attr('fill', 'url(#activeVersionGradient)');
				}

				// Version label at top
				bandsGroup
					.append('text')
					.attr('x', xScale(v.startYear) + (xScale(endYear) - xScale(v.startYear)) / 2)
					.attr('y', -8)
					.attr('text-anchor', 'middle')
					.attr('font-family', 'var(--font-display)')
					.attr('font-size', isActive ? '14px' : '12px')
					.attr('font-weight', isActive ? '700' : '500')
					.attr('fill', isActive ? METRO_RED : METRO_GRAY)
					.text(v.label)
					.style('cursor', 'pointer')
					.on('click', () => onVersionChange(v.id));
			});
		}

		updateBands();

		// Main timeline axis
		const axisGroup = g.append('g').attr('class', 'axis').attr('transform', `translate(0, ${height / 2})`);

		// Timeline line
		axisGroup
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', width)
			.attr('y2', 0)
			.attr('stroke', METRO_GRAY)
			.attr('stroke-width', 3)
			.attr('stroke-linecap', 'round');

		// Progress line (animated)
		const progressLine = axisGroup
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', 0)
			.attr('y2', 0)
			.attr('stroke', METRO_RED)
			.attr('stroke-width', 3)
			.attr('stroke-linecap', 'round');

		// Animate progress line
		progressLine.transition().duration(2000).ease(d3.easeQuadOut).attr('x2', xScale(2025));

		// Milestone markers
		const milestonesGroup = g.append('g').attr('class', 'milestones');

		milestones.forEach((m, i) => {
			const mg = milestonesGroup
				.append('g')
				.attr('transform', `translate(${xScale(m.year)}, ${height / 2})`)
				.attr('opacity', 0)
				.style('cursor', 'pointer');

			// Marker circle
			const markerSize = m.type === 'major' || m.type === 'anniversary' ? 12 : 8;
			const markerColor = m.type === 'anniversary' ? '#ffd700' : m.type === 'major' ? METRO_RED : METRO_GRAY;

			mg.append('circle').attr('r', markerSize).attr('fill', markerColor).attr('stroke', 'white').attr('stroke-width', 2);

			// Inner rhombus for version changes
			if (m.type === 'version') {
				mg.append('path')
					.attr('d', 'M 0 -4 L 4 0 L 0 4 L -4 0 Z')
					.attr('fill', 'white');
			}

			// Year label below
			mg.append('text')
				.attr('y', 35)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-display)')
				.attr('font-size', '14px')
				.attr('font-weight', '700')
				.attr('fill', markerColor)
				.text(m.year);

			// Event label
			mg.append('text')
				.attr('y', 52)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-ui)')
				.attr('font-size', '10px')
				.attr('fill', METRO_GRAY)
				.text(m.label);

			// Entrance animation
			mg.transition()
				.delay(500 + i * 150)
				.duration(500)
				.ease(d3.easeBackOut)
				.attr('opacity', 1);

			// Hover effect
			mg.on('mouseenter', function () {
				d3.select(this).select('circle').transition().duration(200).attr('r', markerSize + 4);
			}).on('mouseleave', function () {
				d3.select(this).select('circle').transition().duration(200).attr('r', markerSize);
			});
		});

		// Animated current year indicator
		const currentIndicator = g
			.append('g')
			.attr('class', 'current-indicator')
			.attr('transform', `translate(${xScale(2025)}, ${height / 2 - 50})`);

		currentIndicator
			.append('path')
			.attr('d', 'M 0 0 L 8 15 L -8 15 Z')
			.attr('fill', METRO_RED);

		currentIndicator
			.append('rect')
			.attr('x', -35)
			.attr('y', -30)
			.attr('width', 70)
			.attr('height', 24)
			.attr('rx', 12)
			.attr('fill', METRO_RED);

		currentIndicator
			.append('text')
			.attr('y', -13)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-display)')
			.attr('font-size', '12px')
			.attr('font-weight', '700')
			.attr('fill', 'white')
			.text('50 AÑOS');

		// Pulse animation for current indicator
		function pulseIndicator() {
			if (isDestroyed) return;
			currentIndicator
				.transition()
				.duration(1000)
				.ease(d3.easeSinInOut)
				.attr('transform', `translate(${xScale(2025)}, ${height / 2 - 53})`)
				.transition()
				.duration(1000)
				.ease(d3.easeSinInOut)
				.attr('transform', `translate(${xScale(2025)}, ${height / 2 - 50})`)
				.on('end', pulseIndicator);
		}
		setTimeout(pulseIndicator, 2500);

		// Three rhombuses below timeline
		const rhombusGroup = g.append('g').attr('class', 'rhombuses').attr('transform', `translate(${width / 2}, ${height + 30})`);

		[-30, 0, 30].forEach((offset, i) => {
			const rhombus = rhombusGroup
				.append('path')
				.attr('d', 'M 0 -8 L 8 0 L 0 8 L -8 0 Z')
				.attr('transform', `translate(${offset}, 0)`)
				.attr('fill', METRO_RED)
				.attr('opacity', 0);

			rhombus
				.transition()
				.delay(2000 + i * 100)
				.duration(400)
				.ease(d3.easeBackOut)
				.attr('opacity', 1);
		});

		// Reactive update when activeVersion changes
		$effect(() => {
			updateBands();
		});
	});

	onDestroy(() => {
		isDestroyed = true;
	});
</script>

<div bind:this={container} class="logo-evolution-timeline"></div>

<style>
	.logo-evolution-timeline {
		width: 100%;
		min-height: 300px;
		position: relative;
		padding: 1rem;
	}
</style>
