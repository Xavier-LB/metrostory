<script lang="ts">
	/**
	 * VERSIÓN 4: RED CONECTADA
	 * Visualiza la integración de los tres elementos del logo:
	 * Vialidad, Buses y Metro como un sistema unificado
	 */
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;
	let isDestroyed = false;

	const COLORS = {
		vialidad: '#4a4845',
		buses: '#fab515',
		metro: '#d60d27'
	};

	interface FlowNode {
		id: string;
		label: string;
		sublabel: string;
		x: number;
		y: number;
		color: string;
		icon: string;
	}

	interface FlowPath {
		source: string;
		target: string;
		passengers: number;
		label: string;
	}

	onMount(() => {
		if (!container) return;

		const width = container.clientWidth;
		const height = 450;
		const centerX = width / 2;
		const centerY = height / 2;

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', '100%')
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const defs = svg.append('defs');

		// Gradients for each connection type
		Object.entries(COLORS).forEach(([key, color]) => {
			const gradient = defs
				.append('radialGradient')
				.attr('id', `glow-${key}`)
				.attr('cx', '50%')
				.attr('cy', '50%')
				.attr('r', '50%');

			gradient.append('stop').attr('offset', '0%').attr('stop-color', color).attr('stop-opacity', 0.6);
			gradient.append('stop').attr('offset', '100%').attr('stop-color', color).attr('stop-opacity', 0);
		});

		// Flow gradient
		const flowGradient = defs
			.append('linearGradient')
			.attr('id', 'flowGradient')
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '100%')
			.attr('y2', '0%');

		flowGradient.append('stop').attr('offset', '0%').attr('stop-color', COLORS.vialidad);
		flowGradient.append('stop').attr('offset', '50%').attr('stop-color', COLORS.buses);
		flowGradient.append('stop').attr('offset', '100%').attr('stop-color', COLORS.metro);

		// Arrow marker
		defs
			.append('marker')
			.attr('id', 'flowArrow')
			.attr('viewBox', '0 -5 10 10')
			.attr('refX', 8)
			.attr('refY', 0)
			.attr('markerWidth', 6)
			.attr('markerHeight', 6)
			.attr('orient', 'auto')
			.append('path')
			.attr('d', 'M0,-4L10,0L0,4')
			.attr('fill', COLORS.metro);

		// Nodes
		const nodes: FlowNode[] = [
			{
				id: 'vialidad',
				label: 'Vialidad',
				sublabel: 'Red vial urbana',
				x: centerX - 180,
				y: centerY,
				color: COLORS.vialidad,
				icon: 'M 0 -15 L 15 0 L 0 15 L -15 0 Z'
			},
			{
				id: 'buses',
				label: 'Buses',
				sublabel: 'Transporte superficie',
				x: centerX,
				y: centerY - 100,
				color: COLORS.buses,
				icon: 'M 0 -15 L 15 0 L 0 15 L -15 0 Z'
			},
			{
				id: 'metro',
				label: 'Metro',
				sublabel: 'Red subterránea',
				x: centerX + 180,
				y: centerY,
				color: COLORS.metro,
				icon: 'M 0 -15 L 15 0 L 0 15 L -15 0 Z'
			}
		];

		// Flows
		const flows: FlowPath[] = [
			{ source: 'vialidad', target: 'buses', passengers: 850000, label: '850K' },
			{ source: 'buses', target: 'metro', passengers: 1200000, label: '1.2M' },
			{ source: 'vialidad', target: 'metro', passengers: 450000, label: '450K' }
		];

		// Central rhombus (integration point)
		const centralGroup = svg.append('g').attr('transform', `translate(${centerX}, ${centerY + 50})`);

		centralGroup
			.append('circle')
			.attr('r', 50)
			.attr('fill', 'url(#glow-metro)')
			.attr('opacity', 0);

		centralGroup
			.append('path')
			.attr('d', 'M 0 -25 L 25 0 L 0 25 L -25 0 Z')
			.attr('fill', COLORS.metro)
			.attr('stroke', 'white')
			.attr('stroke-width', 3)
			.attr('opacity', 0)
			.attr('class', 'central-rhombus');

		centralGroup
			.append('text')
			.attr('y', 55)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-display)')
			.attr('font-size', '14px')
			.attr('font-weight', '700')
			.attr('fill', 'var(--text-primary)')
			.attr('opacity', 0)
			.attr('class', 'central-label')
			.text('Sistema Integrado');

		// Draw flow paths
		const pathGroup = svg.append('g').attr('class', 'paths');

		const flowPaths = flows.map((flow) => {
			const source = nodes.find((n) => n.id === flow.source)!;
			const target = nodes.find((n) => n.id === flow.target)!;

			// Curved path
			const midX = (source.x + target.x) / 2;
			const midY = (source.y + target.y) / 2 - 40;

			const pathD = `M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`;

			const path = pathGroup
				.append('path')
				.attr('d', pathD)
				.attr('fill', 'none')
				.attr('stroke', 'var(--border-medium)')
				.attr('stroke-width', 3)
				.attr('stroke-dasharray', '8,4')
				.attr('opacity', 0);

			// Flow label
			const labelX = midX;
			const labelY = midY - 15;

			pathGroup
				.append('rect')
				.attr('x', labelX - 25)
				.attr('y', labelY - 10)
				.attr('width', 50)
				.attr('height', 20)
				.attr('rx', 10)
				.attr('fill', 'var(--bg-secondary)')
				.attr('stroke', 'var(--border-light)')
				.attr('opacity', 0)
				.attr('class', `flow-label-bg-${flow.source}-${flow.target}`);

			pathGroup
				.append('text')
				.attr('x', labelX)
				.attr('y', labelY + 4)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-ui)')
				.attr('font-size', '11px')
				.attr('font-weight', '600')
				.attr('fill', 'var(--text-secondary)')
				.attr('opacity', 0)
				.attr('class', `flow-label-${flow.source}-${flow.target}`)
				.text(`${flow.label}/día`);

			return { path, flow, pathD };
		});

		// Draw nodes
		const nodeGroup = svg.append('g').attr('class', 'nodes');

		const nodeElements = nodes.map((node) => {
			const g = nodeGroup.append('g').attr('transform', `translate(${node.x}, ${node.y})`).attr('opacity', 0).style('cursor', 'pointer');

			// Outer glow
			g.append('circle').attr('r', 60).attr('fill', `url(#glow-${node.id})`).attr('opacity', 0.3);

			// Rhombus shape
			g.append('path').attr('d', 'M 0 -35 L 35 0 L 0 35 L -35 0 Z').attr('fill', node.color).attr('stroke', 'white').attr('stroke-width', 3).attr('class', 'node-rhombus');

			// Label
			g.append('text')
				.attr('y', 55)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-display)')
				.attr('font-size', '14px')
				.attr('font-weight', '700')
				.attr('fill', node.color)
				.text(node.label);

			g.append('text')
				.attr('y', 70)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-ui)')
				.attr('font-size', '10px')
				.attr('fill', 'var(--text-muted)')
				.text(node.sublabel);

			return { g, node };
		});

		// Animate entrance
		nodeElements.forEach(({ g }, i) => {
			g.transition()
				.delay(i * 300)
				.duration(800)
				.ease(d3.easeBackOut)
				.attr('opacity', 1);
		});

		// Animate paths
		flowPaths.forEach(({ path, flow }, i) => {
			path.transition().delay(900 + i * 200).duration(600).attr('opacity', 0.6);

			svg
				.select(`.flow-label-bg-${flow.source}-${flow.target}`)
				.transition()
				.delay(1100 + i * 200)
				.duration(400)
				.attr('opacity', 1);

			svg
				.select(`.flow-label-${flow.source}-${flow.target}`)
				.transition()
				.delay(1100 + i * 200)
				.duration(400)
				.attr('opacity', 1);
		});

		// Central rhombus animation
		centralGroup
			.select('circle')
			.transition()
			.delay(1800)
			.duration(600)
			.attr('opacity', 0.4);

		centralGroup
			.select('.central-rhombus')
			.transition()
			.delay(1800)
			.duration(800)
			.ease(d3.easeBackOut)
			.attr('opacity', 1);

		centralGroup
			.select('.central-label')
			.transition()
			.delay(2200)
			.duration(400)
			.attr('opacity', 1);

		// Animated flow particles
		function createFlowParticle(pathElement: SVGPathElement, color: string) {
			if (isDestroyed) return;

			const length = pathElement.getTotalLength();
			const particle = pathGroup.append('circle').attr('r', 4).attr('fill', color).attr('opacity', 0);

			function animate() {
				if (isDestroyed) {
					particle.remove();
					return;
				}

				particle
					.attr('opacity', 0)
					.transition()
					.duration(100)
					.attr('opacity', 0.8)
					.transition()
					.duration(1500)
					.ease(d3.easeLinear)
					.attrTween('transform', function () {
						return function (t: number) {
							const point = pathElement.getPointAtLength(t * length);
							return `translate(${point.x}, ${point.y})`;
						};
					})
					.transition()
					.duration(100)
					.attr('opacity', 0)
					.on('end', () => {
						if (!isDestroyed) setTimeout(animate, 500 + Math.random() * 1500);
					});
			}

			setTimeout(animate, 2500 + Math.random() * 1000);
		}

		// Create particles for each flow
		flowPaths.forEach(({ path, flow }) => {
			const pathNode = path.node();
			if (pathNode) {
				const source = nodes.find((n) => n.id === flow.source)!;
				for (let i = 0; i < 3; i++) {
					setTimeout(() => createFlowParticle(pathNode, source.color), i * 500);
				}
			}
		});

		// Hover effects
		nodeElements.forEach(({ g, node }) => {
			g.on('mouseenter', function () {
				d3.select(this).select('.node-rhombus').transition().duration(200).attr('d', 'M 0 -42 L 42 0 L 0 42 L -42 0 Z');

				d3.select(this).select('circle').transition().duration(200).attr('r', 70).attr('opacity', 0.5);
			}).on('mouseleave', function () {
				d3.select(this).select('.node-rhombus').transition().duration(200).attr('d', 'M 0 -35 L 35 0 L 0 35 L -35 0 Z');

				d3.select(this).select('circle').transition().duration(200).attr('r', 60).attr('opacity', 0.3);
			});
		});

		// Pulse animation for central rhombus
		function pulseCenter() {
			if (isDestroyed) return;

			centralGroup
				.select('.central-rhombus')
				.transition()
				.duration(1500)
				.ease(d3.easeSinInOut)
				.attr('d', 'M 0 -28 L 28 0 L 0 28 L -28 0 Z')
				.transition()
				.duration(1500)
				.ease(d3.easeSinInOut)
				.attr('d', 'M 0 -25 L 25 0 L 0 25 L -25 0 Z')
				.on('end', pulseCenter);
		}

		setTimeout(pulseCenter, 3000);
	});

	onDestroy(() => {
		isDestroyed = true;
	});
</script>

<div class="viz-container">
	<div class="viz-header">
		<span class="viz-badge" style="background: var(--metro-l4)">Versión 4</span>
		<h3 class="viz-title">Red Conectada</h3>
		<p class="viz-description">
			Los tres rombos del logo representan la integración de <strong>Vialidad</strong>,
			<strong>Buses</strong> y <strong>Metro</strong> en un sistema de transporte unificado
			que mueve millones de personas cada día.
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
		min-height: 450px;
		position: relative;
	}
</style>
