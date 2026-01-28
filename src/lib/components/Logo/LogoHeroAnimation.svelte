<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;
	let animationFrame: number;
	let isDestroyed = false;

	// Configuration
	const METRO_RED = '#d60d27';
	const METRO_YELLOW = '#fab515';
	const METRO_GREEN = '#179859';

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		life: number;
		maxLife: number;
		color: string;
		size: number;
	}

	onMount(() => {
		if (!container) return;

		const width = container.clientWidth;
		const height = 400;
		const centerX = width / 2;
		const centerY = height / 2;

		// Create SVG
		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', '100%')
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`)
			.attr('preserveAspectRatio', 'xMidYMid meet')
			.style('overflow', 'visible');

		// Gradient definitions
		const defs = svg.append('defs');

		// Radial glow gradient
		const glowGradient = defs
			.append('radialGradient')
			.attr('id', 'rhombusGlow')
			.attr('cx', '50%')
			.attr('cy', '50%')
			.attr('r', '50%');

		glowGradient
			.append('stop')
			.attr('offset', '0%')
			.attr('stop-color', METRO_RED)
			.attr('stop-opacity', 0.6);

		glowGradient
			.append('stop')
			.attr('offset', '100%')
			.attr('stop-color', METRO_RED)
			.attr('stop-opacity', 0);

		// Connection line gradient
		const lineGradient = defs
			.append('linearGradient')
			.attr('id', 'connectionGradient')
			.attr('x1', '0%')
			.attr('y1', '0%')
			.attr('x2', '100%')
			.attr('y2', '0%');

		lineGradient.append('stop').attr('offset', '0%').attr('stop-color', METRO_RED);

		lineGradient.append('stop').attr('offset', '50%').attr('stop-color', METRO_YELLOW);

		lineGradient.append('stop').attr('offset', '100%').attr('stop-color', METRO_GREEN);

		// Blur filter for glow
		const filter = defs
			.append('filter')
			.attr('id', 'glow')
			.attr('x', '-50%')
			.attr('y', '-50%')
			.attr('width', '200%')
			.attr('height', '200%');

		filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');

		const feMerge = filter.append('feMerge');
		feMerge.append('feMergeNode').attr('in', 'coloredBlur');
		feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

		// Background subtle grid pattern
		const gridGroup = svg.append('g').attr('class', 'grid').attr('opacity', 0.05);

		for (let i = 0; i < width; i += 40) {
			gridGroup
				.append('line')
				.attr('x1', i)
				.attr('y1', 0)
				.attr('x2', i)
				.attr('y2', height)
				.attr('stroke', METRO_RED)
				.attr('stroke-width', 0.5);
		}
		for (let i = 0; i < height; i += 40) {
			gridGroup
				.append('line')
				.attr('x1', 0)
				.attr('y1', i)
				.attr('x2', width)
				.attr('y2', i)
				.attr('stroke', METRO_RED)
				.attr('stroke-width', 0.5);
		}

		// Particle system container
		const particleGroup = svg.append('g').attr('class', 'particles');
		let particles: Particle[] = [];

		// Rhombus positions
		const rhombusSize = 50;
		const spacing = 80;
		const positions = [
			{ x: centerX - spacing, y: centerY, color: METRO_RED, label: 'V' },
			{ x: centerX, y: centerY, color: METRO_RED, label: 'B' },
			{ x: centerX + spacing, y: centerY, color: METRO_RED, label: 'M' }
		];

		// Connection paths (curved)
		const connectionGroup = svg.append('g').attr('class', 'connections');

		// Animated connection line 1
		const pathData1 = `M ${positions[0].x} ${positions[0].y} Q ${(positions[0].x + positions[1].x) / 2} ${positions[0].y - 30} ${positions[1].x} ${positions[1].y}`;
		const connection1 = connectionGroup
			.append('path')
			.attr('d', pathData1)
			.attr('fill', 'none')
			.attr('stroke', 'url(#connectionGradient)')
			.attr('stroke-width', 2)
			.attr('opacity', 0)
			.attr('stroke-dasharray', '5,5');

		// Animated connection line 2
		const pathData2 = `M ${positions[1].x} ${positions[1].y} Q ${(positions[1].x + positions[2].x) / 2} ${positions[1].y - 30} ${positions[2].x} ${positions[2].y}`;
		const connection2 = connectionGroup
			.append('path')
			.attr('d', pathData2)
			.attr('fill', 'none')
			.attr('stroke', 'url(#connectionGradient)')
			.attr('stroke-width', 2)
			.attr('opacity', 0)
			.attr('stroke-dasharray', '5,5');

		// Glow circles behind rhombuses
		const glowGroup = svg.append('g').attr('class', 'glows');

		positions.forEach((pos, i) => {
			glowGroup
				.append('circle')
				.attr('cx', pos.x)
				.attr('cy', pos.y)
				.attr('r', rhombusSize * 1.5)
				.attr('fill', 'url(#rhombusGlow)')
				.attr('opacity', 0)
				.attr('class', `glow-${i}`);
		});

		// Rhombus group
		const rhombusGroup = svg.append('g').attr('class', 'rhombuses');

		// Create rhombus path
		function createRhombusPath(size: number): string {
			const half = size / 2;
			return `M 0 ${-half} L ${half} 0 L 0 ${half} L ${-half} 0 Z`;
		}

		// Draw rhombuses
		const rhombuses = positions.map((pos, i) => {
			const g = rhombusGroup
				.append('g')
				.attr('transform', `translate(${pos.x}, ${pos.y})`)
				.attr('class', `rhombus-group-${i}`)
				.style('cursor', 'pointer');

			// Main rhombus
			g.append('path')
				.attr('d', createRhombusPath(rhombusSize))
				.attr('fill', pos.color)
				.attr('filter', 'url(#glow)')
				.attr('opacity', 0)
				.attr('transform', 'scale(0)')
				.attr('class', 'rhombus-main');

			// Outer ring on hover
			g.append('path')
				.attr('d', createRhombusPath(rhombusSize + 10))
				.attr('fill', 'none')
				.attr('stroke', pos.color)
				.attr('stroke-width', 2)
				.attr('opacity', 0)
				.attr('class', 'rhombus-ring');

			return g;
		});

		// Entrance animation
		function animateEntrance() {
			// Animate rhombuses appearing
			rhombuses.forEach((rhombus, i) => {
				rhombus
					.select('.rhombus-main')
					.transition()
					.delay(i * 200)
					.duration(800)
					.ease(d3.easeBackOut.overshoot(1.5))
					.attr('opacity', 1)
					.attr('transform', 'scale(1)');

				// Glow pulse
				svg
					.select(`.glow-${i}`)
					.transition()
					.delay(i * 200 + 400)
					.duration(600)
					.attr('opacity', 0.5)
					.transition()
					.duration(1000)
					.attr('opacity', 0.2);
			});

			// Show connections after rhombuses
			connection1
				.transition()
				.delay(800)
				.duration(800)
				.attr('opacity', 0.6)
				.attrTween('stroke-dashoffset', function () {
					const length = (this as SVGPathElement).getTotalLength();
					return d3.interpolate(length, 0);
				});

			connection2
				.transition()
				.delay(1000)
				.duration(800)
				.attr('opacity', 0.6)
				.attrTween('stroke-dashoffset', function () {
					const length = (this as SVGPathElement).getTotalLength();
					return d3.interpolate(length, 0);
				});
		}

		// Continuous pulse animation
		function pulseAnimation() {
			rhombuses.forEach((rhombus, i) => {
				function pulse() {
					if (isDestroyed) return;
					rhombus
						.select('.rhombus-main')
						.transition()
						.delay(i * 300)
						.duration(1500)
						.ease(d3.easeSinInOut)
						.attr('transform', 'scale(1.05)')
						.transition()
						.duration(1500)
						.ease(d3.easeSinInOut)
						.attr('transform', 'scale(1)')
						.on('end', pulse);
				}
				setTimeout(pulse, 1800 + i * 300);
			});
		}

		// Particle effect
		function createParticle(x: number, y: number, color: string) {
			const angle = Math.random() * Math.PI * 2;
			const speed = 0.5 + Math.random() * 1;
			return {
				x,
				y,
				vx: Math.cos(angle) * speed,
				vy: Math.sin(angle) * speed,
				life: 1,
				maxLife: 60 + Math.random() * 40,
				color,
				size: 2 + Math.random() * 3
			};
		}

		function updateParticles() {
			// Add new particles occasionally
			if (Math.random() < 0.15) {
				const pos = positions[Math.floor(Math.random() * positions.length)];
				particles.push(createParticle(pos.x + (Math.random() - 0.5) * 30, pos.y + (Math.random() - 0.5) * 30, pos.color));
			}

			// Update existing particles
			particles = particles.filter((p) => {
				p.x += p.vx;
				p.y += p.vy;
				p.vy -= 0.01; // subtle upward drift
				p.life++;
				return p.life < p.maxLife;
			});

			// Render particles
			const particleSelection = particleGroup.selectAll<SVGCircleElement, Particle>('circle').data(particles);

			particleSelection
				.enter()
				.append('circle')
				.merge(particleSelection)
				.attr('cx', (d) => d.x)
				.attr('cy', (d) => d.y)
				.attr('r', (d) => d.size * (1 - d.life / d.maxLife))
				.attr('fill', (d) => d.color)
				.attr('opacity', (d) => 0.6 * (1 - d.life / d.maxLife));

			particleSelection.exit().remove();
		}

		// Hover interactions
		rhombuses.forEach((rhombus, i) => {
			rhombus
				.on('mouseenter', function () {
					d3.select(this)
						.select('.rhombus-ring')
						.transition()
						.duration(300)
						.attr('opacity', 1)
						.attr('transform', 'scale(1.1)');

					d3.select(this).select('.rhombus-main').transition().duration(300).attr('transform', 'scale(1.15)');

					// Burst of particles
					for (let j = 0; j < 8; j++) {
						particles.push(
							createParticle(
								positions[i].x + (Math.random() - 0.5) * 20,
								positions[i].y + (Math.random() - 0.5) * 20,
								positions[i].color
							)
						);
					}
				})
				.on('mouseleave', function () {
					d3.select(this).select('.rhombus-ring').transition().duration(300).attr('opacity', 0).attr('transform', 'scale(1)');

					d3.select(this).select('.rhombus-main').transition().duration(300).attr('transform', 'scale(1)');
				});
		});

		// Animation loop
		function animate() {
			if (isDestroyed) return;
			updateParticles();
			animationFrame = requestAnimationFrame(animate);
		}

		// Floating connection dots
		const dotGroup = svg.append('g').attr('class', 'dots');

		function createTravelingDot(pathElement: SVGPathElement, delay: number) {
			if (isDestroyed) return;
			const length = pathElement.getTotalLength();

			const dot = dotGroup
				.append('circle')
				.attr('r', 4)
				.attr('fill', METRO_YELLOW)
				.attr('filter', 'url(#glow)')
				.attr('opacity', 0);

			function travel() {
				if (isDestroyed) {
					dot.remove();
					return;
				}
				dot
					.attr('opacity', 0)
					.transition()
					.delay(delay)
					.duration(100)
					.attr('opacity', 1)
					.transition()
					.duration(2000)
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
					.on('end', () => setTimeout(travel, Math.random() * 2000));
			}

			setTimeout(travel, 2000 + delay);
		}

		// Initialize
		animateEntrance();
		pulseAnimation();
		animate();

		// Create traveling dots after connections appear
		setTimeout(() => {
			createTravelingDot(connection1.node()!, 0);
			createTravelingDot(connection2.node()!, 500);
		}, 2000);
	});

	onDestroy(() => {
		isDestroyed = true;
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
		}
	});
</script>

<div bind:this={container} class="logo-hero-animation"></div>

<style>
	.logo-hero-animation {
		width: 100%;
		min-height: 400px;
		position: relative;
	}

	.logo-hero-animation :global(svg) {
		display: block;
	}
</style>
