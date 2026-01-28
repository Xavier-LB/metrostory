<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;
	let isDestroyed = false;

	const METRO_RED = '#d60d27';
	const METRO_YELLOW = '#fab515';
	const METRO_GREEN = '#179859';
	const METRO_BROWN = '#9a5b29';

	interface Node {
		id: string;
		label: string;
		description: string;
		color: string;
		x?: number;
		y?: number;
	}

	interface Link {
		source: string;
		target: string;
		strength: number;
	}

	onMount(() => {
		if (!container) return;

		const width = container.clientWidth;
		const height = 500;

		const nodes: Node[] = [
			{ id: 'vialidad', label: 'Vialidad', description: 'Superficie urbana', color: METRO_RED },
			{ id: 'buses', label: 'Buses', description: 'Transporte superficie', color: METRO_YELLOW },
			{ id: 'metro', label: 'Metro', description: 'Transporte subterráneo', color: METRO_GREEN },
			{ id: 'ciudadanos', label: 'Ciudadanos', description: '3+ millones/día', color: METRO_BROWN }
		];

		const links: Link[] = [
			{ source: 'vialidad', target: 'buses', strength: 0.8 },
			{ source: 'vialidad', target: 'metro', strength: 0.6 },
			{ source: 'buses', target: 'metro', strength: 0.9 },
			{ source: 'ciudadanos', target: 'vialidad', strength: 0.5 },
			{ source: 'ciudadanos', target: 'buses', strength: 0.7 },
			{ source: 'ciudadanos', target: 'metro', strength: 0.9 }
		];

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', '100%')
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('preserveAspectRatio', 'xMidYMid meet');

		// Defs for effects
		const defs = svg.append('defs');

		// Glow filter
		const filter = defs
			.append('filter')
			.attr('id', 'nodeGlow')
			.attr('x', '-100%')
			.attr('y', '-100%')
			.attr('width', '300%')
			.attr('height', '300%');

		filter.append('feGaussianBlur').attr('stdDeviation', '8').attr('result', 'blur');

		const feMerge = filter.append('feMerge');
		feMerge.append('feMergeNode').attr('in', 'blur');
		feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

		// Arrow marker
		defs
			.append('marker')
			.attr('id', 'arrowhead')
			.attr('viewBox', '0 -5 10 10')
			.attr('refX', 40)
			.attr('refY', 0)
			.attr('markerWidth', 6)
			.attr('markerHeight', 6)
			.attr('orient', 'auto')
			.append('path')
			.attr('d', 'M0,-5L10,0L0,5')
			.attr('fill', 'rgba(202, 32, 39, 0.4)');

		// Create force simulation
		const simulation = d3
			.forceSimulation(nodes as d3.SimulationNodeDatum[])
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d: d3.SimulationNodeDatum) => (d as Node).id)
					.distance(120)
			)
			.force('charge', d3.forceManyBody().strength(-400))
			.force('center', d3.forceCenter(width / 2, height / 2))
			.force('collision', d3.forceCollide().radius(60));

		// Draw links
		const linkGroup = svg.append('g').attr('class', 'links');

		const link = linkGroup
			.selectAll('line')
			.data(links)
			.enter()
			.append('line')
			.attr('stroke', METRO_RED)
			.attr('stroke-opacity', (d) => d.strength * 0.4)
			.attr('stroke-width', (d) => d.strength * 3)
			.attr('marker-end', 'url(#arrowhead)');

		// Animated flow particles along links
		const flowGroup = svg.append('g').attr('class', 'flow');

		function createFlowParticle(linkData: Link, index: number) {
			if (isDestroyed) return;
			const sourceNode = nodes.find((n) => n.id === linkData.source);
			const targetNode = nodes.find((n) => n.id === linkData.target);
			if (!sourceNode || !targetNode) return;

			const particle = flowGroup.append('circle').attr('r', 3).attr('fill', METRO_YELLOW).attr('opacity', 0);

			function animate() {
				if (isDestroyed || !sourceNode?.x || !targetNode?.x) {
					particle.remove();
					return;
				}

				particle
					.attr('cx', sourceNode.x!)
					.attr('cy', sourceNode.y!)
					.attr('opacity', 0)
					.transition()
					.duration(100)
					.attr('opacity', 0.8)
					.transition()
					.duration(1500 + Math.random() * 1000)
					.ease(d3.easeLinear)
					.attr('cx', targetNode.x!)
					.attr('cy', targetNode.y!)
					.transition()
					.duration(100)
					.attr('opacity', 0)
					.on('end', () => {
						if (!isDestroyed) setTimeout(animate, 500 + Math.random() * 2000);
					});
			}

			setTimeout(animate, index * 300);
		}

		// Create flow particles for each link
		links.forEach((l, i) => createFlowParticle(l, i));

		// Node groups
		const nodeGroup = svg.append('g').attr('class', 'nodes');

		const node = nodeGroup
			.selectAll('g')
			.data(nodes)
			.enter()
			.append('g')
			.attr('class', 'node')
			.style('cursor', 'pointer')
			.call(
				d3
					.drag<SVGGElement, Node>()
					.on('start', (event, d) => {
						if (!event.active) simulation.alphaTarget(0.3).restart();
						d.fx = d.x;
						d.fy = d.y;
					})
					.on('drag', (event, d) => {
						d.fx = event.x;
						d.fy = event.y;
					})
					.on('end', (event, d) => {
						if (!event.active) simulation.alphaTarget(0);
						d.fx = null;
						d.fy = null;
					}) as unknown as (
					selection: d3.Selection<SVGGElement, Node, SVGGElement, unknown>
				) => void
			);

		// Outer glow circle
		node
			.append('circle')
			.attr('r', 50)
			.attr('fill', (d) => d.color)
			.attr('opacity', 0.1)
			.attr('class', 'outer-glow');

		// Main rhombus shape
		node
			.append('path')
			.attr('d', 'M 0 -30 L 30 0 L 0 30 L -30 0 Z')
			.attr('fill', (d) => d.color)
			.attr('filter', 'url(#nodeGlow)')
			.attr('class', 'main-shape');

		// Label background
		node
			.append('rect')
			.attr('x', -40)
			.attr('y', 35)
			.attr('width', 80)
			.attr('height', 24)
			.attr('rx', 12)
			.attr('fill', 'white')
			.attr('opacity', 0.9);

		// Label
		node
			.append('text')
			.attr('y', 52)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-display)')
			.attr('font-size', '12px')
			.attr('font-weight', '600')
			.attr('fill', (d) => d.color)
			.text((d) => d.label);

		// Hover effects
		node
			.on('mouseenter', function (event, d) {
				d3.select(this)
					.select('.main-shape')
					.transition()
					.duration(200)
					.attr('d', 'M 0 -35 L 35 0 L 0 35 L -35 0 Z');

				d3.select(this).select('.outer-glow').transition().duration(200).attr('r', 60).attr('opacity', 0.2);

				// Highlight connected links
				link
					.transition()
					.duration(200)
					.attr('stroke-opacity', (l) => (l.source === d.id || l.target === d.id || (l.source as Node).id === d.id || (l.target as Node).id === d.id ? 0.8 : 0.1));
			})
			.on('mouseleave', function () {
				d3.select(this).select('.main-shape').transition().duration(200).attr('d', 'M 0 -30 L 30 0 L 0 30 L -30 0 Z');

				d3.select(this).select('.outer-glow').transition().duration(200).attr('r', 50).attr('opacity', 0.1);

				link.transition().duration(200).attr('stroke-opacity', (l) => l.strength * 0.4);
			});

		// Simulation tick
		simulation.on('tick', () => {
			link
				.attr('x1', (d) => (d.source as Node).x!)
				.attr('y1', (d) => (d.source as Node).y!)
				.attr('x2', (d) => (d.target as Node).x!)
				.attr('y2', (d) => (d.target as Node).y!);

			node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
		});

		// Entrance animation
		node.attr('opacity', 0).transition().delay((d, i) => i * 200).duration(600).ease(d3.easeBackOut).attr('opacity', 1);

		link.attr('stroke-opacity', 0).transition().delay(800).duration(600).attr('stroke-opacity', (d) => d.strength * 0.4);
	});

	onDestroy(() => {
		isDestroyed = true;
	});
</script>

<div bind:this={container} class="connected-system-viz"></div>

<style>
	.connected-system-viz {
		width: 100%;
		min-height: 500px;
		position: relative;
		background: linear-gradient(135deg, rgba(214, 13, 39, 0.02) 0%, rgba(23, 152, 89, 0.02) 100%);
		border-radius: 1rem;
	}

	.connected-system-viz :global(.node) {
		transition: transform 0.1s ease-out;
	}
</style>
