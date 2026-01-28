<script lang="ts">
	/**
	 * VERSIÓN 1: PULSO URBANO
	 * Visualiza los 3+ millones de pasajeros diarios como un pulso vital
	 * Los rombos laten como el corazón de la ciudad
	 */
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;
	let isDestroyed = false;

	const METRO_RED = '#d60d27';

	// Datos reales de pasajeros
	const DAILY_PASSENGERS = 3_000_000;
	const PASSENGERS_PER_SECOND = Math.floor(DAILY_PASSENGERS / (18 * 60 * 60)); // ~46 pax/seg

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

		// Radial pulse gradient
		const pulseGradient = defs
			.append('radialGradient')
			.attr('id', 'pulseGradient')
			.attr('cx', '50%')
			.attr('cy', '50%')
			.attr('r', '50%');

		pulseGradient.append('stop').attr('offset', '0%').attr('stop-color', METRO_RED).attr('stop-opacity', 0.8);
		pulseGradient.append('stop').attr('offset', '70%').attr('stop-color', METRO_RED).attr('stop-opacity', 0.2);
		pulseGradient.append('stop').attr('offset', '100%').attr('stop-color', METRO_RED).attr('stop-opacity', 0);

		// Background heartbeat line
		const ecgGroup = svg.append('g').attr('class', 'ecg');
		const ecgPath = ecgGroup
			.append('path')
			.attr('fill', 'none')
			.attr('stroke', METRO_RED)
			.attr('stroke-width', 2)
			.attr('opacity', 0.3);

		// Generate ECG-like path
		function generateECG() {
			const points: [number, number][] = [];
			const baseY = height - 60;
			const amplitude = 30;

			for (let x = 0; x < width + 100; x += 5) {
				let y = baseY;
				const phase = (x % 150) / 150;

				if (phase > 0.3 && phase < 0.35) {
					y = baseY - amplitude * 0.3;
				} else if (phase > 0.35 && phase < 0.4) {
					y = baseY + amplitude * 0.2;
				} else if (phase > 0.4 && phase < 0.5) {
					y = baseY - amplitude * 1.5;
				} else if (phase > 0.5 && phase < 0.55) {
					y = baseY + amplitude * 0.5;
				} else if (phase > 0.55 && phase < 0.65) {
					y = baseY - amplitude * 0.4;
				}

				points.push([x, y]);
			}

			return d3.line()(points) || '';
		}

		let ecgOffset = 0;
		function animateECG() {
			if (isDestroyed) return;
			ecgOffset -= 2;
			ecgPath.attr('d', generateECG()).attr('transform', `translate(${ecgOffset % 150}, 0)`);
			requestAnimationFrame(animateECG);
		}
		animateECG();

		// Pulse rings
		const pulseGroup = svg.append('g').attr('class', 'pulses').attr('transform', `translate(${centerX}, ${centerY - 30})`);

		function createPulseRing(delay: number) {
			if (isDestroyed) return;

			const ring = pulseGroup
				.append('circle')
				.attr('r', 30)
				.attr('fill', 'none')
				.attr('stroke', METRO_RED)
				.attr('stroke-width', 3)
				.attr('opacity', 0.8);

			ring
				.transition()
				.delay(delay)
				.duration(2000)
				.ease(d3.easeQuadOut)
				.attr('r', 150)
				.attr('stroke-width', 1)
				.attr('opacity', 0)
				.remove()
				.on('end', () => createPulseRing(0));
		}

		// Start multiple pulse rings
		createPulseRing(0);
		createPulseRing(500);
		createPulseRing(1000);

		// Central rhombuses with heartbeat
		const rhombusGroup = svg.append('g').attr('transform', `translate(${centerX}, ${centerY - 30})`);

		const rhombusPositions = [-50, 0, 50];
		const rhombuses = rhombusPositions.map((offset, i) => {
			const g = rhombusGroup.append('g').attr('transform', `translate(${offset}, 0)`);

			// Glow
			g.append('circle').attr('r', 35).attr('fill', 'url(#pulseGradient)');

			// Rhombus
			g.append('path')
				.attr('d', 'M 0 -25 L 25 0 L 0 25 L -25 0 Z')
				.attr('fill', METRO_RED)
				.attr('class', 'rhombus');

			return g;
		});

		// Heartbeat animation
		function heartbeat() {
			if (isDestroyed) return;

			rhombuses.forEach((r, i) => {
				r.select('.rhombus')
					.transition()
					.delay(i * 50)
					.duration(150)
					.ease(d3.easeQuadIn)
					.attr('transform', 'scale(1.2)')
					.transition()
					.duration(100)
					.ease(d3.easeQuadOut)
					.attr('transform', 'scale(0.95)')
					.transition()
					.duration(150)
					.ease(d3.easeQuadIn)
					.attr('transform', 'scale(1.1)')
					.transition()
					.duration(400)
					.ease(d3.easeQuadOut)
					.attr('transform', 'scale(1)');
			});

			setTimeout(heartbeat, 1200);
		}

		setTimeout(heartbeat, 500);

		// Passenger counter
		const counterGroup = svg.append('g').attr('transform', `translate(${centerX}, ${centerY + 80})`);

		counterGroup
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-display)')
			.attr('font-size', '48px')
			.attr('font-weight', '700')
			.attr('fill', METRO_RED)
			.attr('class', 'counter')
			.text('0');

		counterGroup
			.append('text')
			.attr('y', 30)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-ui)')
			.attr('font-size', '12px')
			.attr('fill', 'var(--text-tertiary)')
			.attr('text-transform', 'uppercase')
			.attr('letter-spacing', '0.1em')
			.text('pasajeros por segundo');

		// Animate counter
		let count = 0;
		function updateCounter() {
			if (isDestroyed) return;
			count += Math.floor(Math.random() * 3) + 1;
			if (count > PASSENGERS_PER_SECOND) count = 0;

			counterGroup
				.select('.counter')
				.text(count.toLocaleString('es-CL'));

			setTimeout(updateCounter, 50);
		}
		updateCounter();

		// Stats
		const statsGroup = svg.append('g').attr('transform', `translate(${centerX}, ${height - 20})`);

		statsGroup
			.append('text')
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-body)')
			.attr('font-size', '14px')
			.attr('fill', 'var(--text-secondary)')
			.text('3+ millones de viajes cada día — el pulso de Santiago');
	});

	onDestroy(() => {
		isDestroyed = true;
	});
</script>

<div class="viz-container">
	<div class="viz-header">
		<span class="viz-badge">Versión 1</span>
		<h3 class="viz-title">Pulso Urbano</h3>
		<p class="viz-description">
			Los tres rombos laten al ritmo de la ciudad. Cada segundo, más de <strong>46 personas</strong>
			pasan por las estaciones del Metro.
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
	}
</style>
