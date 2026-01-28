<script lang="ts">
	/**
	 * VERSIÓN 5: METAMORFOSIS
	 * Animación de transformación del logo a través de sus tres versiones
	 * 1969-1997: Logo original
	 * 1997-2011: Tipografía Métrika
	 * 2011-presente: Gotham + Helvetica
	 */
	import { onMount, onDestroy } from 'svelte';
	import * as d3 from 'd3';

	let container: HTMLDivElement;
	let isDestroyed = false;

	const METRO_RED = '#d60d27';

	interface LogoVersion {
		id: number;
		year: string;
		name: string;
		typography: string;
		rhombusStyle: {
			size: number;
			spacing: number;
			strokeWidth: number;
			rounded: number;
		};
	}

	const versions: LogoVersion[] = [
		{
			id: 1,
			year: '1969-1997',
			name: 'Original',
			typography: 'Diseño geométrico puro',
			rhombusStyle: { size: 40, spacing: 55, strokeWidth: 0, rounded: 0 }
		},
		{
			id: 2,
			year: '1997-2011',
			name: 'Línea 5',
			typography: 'Tipografía Métrika',
			rhombusStyle: { size: 38, spacing: 52, strokeWidth: 2, rounded: 2 }
		},
		{
			id: 3,
			year: '2011-Presente',
			name: 'Actual',
			typography: 'Gotham + Helvetica',
			rhombusStyle: { size: 35, spacing: 48, strokeWidth: 3, rounded: 4 }
		}
	];

	onMount(() => {
		if (!container) return;

		const width = container.clientWidth;
		const height = 500;
		const centerX = width / 2;
		const centerY = height / 2 - 30;

		const svg = d3
			.select(container)
			.append('svg')
			.attr('width', '100%')
			.attr('height', height)
			.attr('viewBox', `0 0 ${width} ${height}`);

		const defs = svg.append('defs');

		// Glow filter
		const filter = defs
			.append('filter')
			.attr('id', 'morphGlow')
			.attr('x', '-50%')
			.attr('y', '-50%')
			.attr('width', '200%')
			.attr('height', '200%');

		filter.append('feGaussianBlur').attr('stdDeviation', '6').attr('result', 'blur');
		const merge = filter.append('feMerge');
		merge.append('feMergeNode').attr('in', 'blur');
		merge.append('feMergeNode').attr('in', 'SourceGraphic');

		// Shadow filter
		const shadowFilter = defs
			.append('filter')
			.attr('id', 'dropShadow')
			.attr('x', '-50%')
			.attr('y', '-50%')
			.attr('width', '200%')
			.attr('height', '200%');

		shadowFilter.append('feDropShadow').attr('dx', '0').attr('dy', '4').attr('stdDeviation', '4').attr('flood-color', 'rgba(0,0,0,0.2)');

		// Background circle
		svg
			.append('circle')
			.attr('cx', centerX)
			.attr('cy', centerY)
			.attr('r', 120)
			.attr('fill', 'none')
			.attr('stroke', 'var(--border-light)')
			.attr('stroke-width', 1)
			.attr('stroke-dasharray', '4,4')
			.attr('opacity', 0.5);

		// Logo group
		const logoGroup = svg.append('g').attr('transform', `translate(${centerX}, ${centerY})`);

		// Create rhombus path with configurable style
		function createRhombusPath(size: number, rounded: number = 0): string {
			const h = size / 2;
			if (rounded === 0) {
				return `M 0 ${-h} L ${h} 0 L 0 ${h} L ${-h} 0 Z`;
			} else {
				// Slightly rounded corners
				const r = rounded;
				return `M 0 ${-h + r}
					Q 0 ${-h} ${r} ${-h + r}
					L ${h - r} ${-r}
					Q ${h} 0 ${h - r} ${r}
					L ${r} ${h - r}
					Q 0 ${h} ${-r} ${h - r}
					L ${-h + r} ${r}
					Q ${-h} 0 ${-h + r} ${-r}
					Z`;
			}
		}

		// State
		let currentVersion = 0;

		// Draw three rhombuses
		const rhombusPositions = [-1, 0, 1];
		const rhombuses = rhombusPositions.map((pos, i) => {
			const style = versions[currentVersion].rhombusStyle;

			const g = logoGroup.append('g').attr('transform', `translate(${pos * style.spacing}, 0)`).attr('opacity', 0);

			// Glow behind
			g.append('circle').attr('r', style.size * 0.8).attr('fill', METRO_RED).attr('opacity', 0.15).attr('class', 'rhombus-glow');

			// Main shape
			g.append('path')
				.attr('d', createRhombusPath(style.size, style.rounded))
				.attr('fill', METRO_RED)
				.attr('stroke', 'white')
				.attr('stroke-width', style.strokeWidth)
				.attr('filter', 'url(#dropShadow)')
				.attr('class', 'rhombus-main');

			return g;
		});

		// Version indicator group
		const indicatorGroup = svg.append('g').attr('transform', `translate(${centerX}, ${centerY + 140})`);

		// Timeline bar
		const timelineWidth = 300;
		indicatorGroup
			.append('line')
			.attr('x1', -timelineWidth / 2)
			.attr('y1', 0)
			.attr('x2', timelineWidth / 2)
			.attr('y2', 0)
			.attr('stroke', 'var(--border-medium)')
			.attr('stroke-width', 3)
			.attr('stroke-linecap', 'round');

		// Progress line
		const progressLine = indicatorGroup
			.append('line')
			.attr('x1', -timelineWidth / 2)
			.attr('y1', 0)
			.attr('x2', -timelineWidth / 2)
			.attr('y2', 0)
			.attr('stroke', METRO_RED)
			.attr('stroke-width', 3)
			.attr('stroke-linecap', 'round');

		// Version dots
		const versionDots = versions.map((v, i) => {
			const x = -timelineWidth / 2 + (i * timelineWidth) / (versions.length - 1);

			const dotGroup = indicatorGroup.append('g').attr('transform', `translate(${x}, 0)`).style('cursor', 'pointer');

			dotGroup.append('circle').attr('r', 12).attr('fill', 'white').attr('stroke', METRO_RED).attr('stroke-width', 2).attr('class', 'version-dot');

			dotGroup
				.append('text')
				.attr('y', 30)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-display)')
				.attr('font-size', '12px')
				.attr('font-weight', '700')
				.attr('fill', 'var(--text-primary)')
				.text(v.year);

			dotGroup
				.append('text')
				.attr('y', 45)
				.attr('text-anchor', 'middle')
				.attr('font-family', 'var(--font-ui)')
				.attr('font-size', '10px')
				.attr('fill', 'var(--text-muted)')
				.text(v.name);

			// Click handler
			dotGroup.on('click', () => {
				morphToVersion(i);
			});

			return dotGroup;
		});

		// Current version label
		const versionLabel = logoGroup
			.append('text')
			.attr('y', -90)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-display)')
			.attr('font-size', '18px')
			.attr('font-weight', '700')
			.attr('fill', METRO_RED)
			.text(versions[0].name);

		const typographyLabel = logoGroup
			.append('text')
			.attr('y', -70)
			.attr('text-anchor', 'middle')
			.attr('font-family', 'var(--font-ui)')
			.attr('font-size', '12px')
			.attr('fill', 'var(--text-muted)')
			.text(versions[0].typography);

		// Morph function
		function morphToVersion(versionIndex: number) {
			if (isDestroyed || versionIndex === currentVersion) return;

			const style = versions[versionIndex].rhombusStyle;
			const prevStyle = versions[currentVersion].rhombusStyle;

			currentVersion = versionIndex;

			// Update version dots
			versionDots.forEach((dot, i) => {
				dot
					.select('.version-dot')
					.transition()
					.duration(300)
					.attr('fill', i === versionIndex ? METRO_RED : 'white')
					.attr('r', i === versionIndex ? 14 : 12);
			});

			// Update progress line
			const x = -timelineWidth / 2 + (versionIndex * timelineWidth) / (versions.length - 1);
			progressLine.transition().duration(800).ease(d3.easeQuadInOut).attr('x2', x);

			// Morph rhombuses
			rhombuses.forEach((rhombus, i) => {
				const pos = rhombusPositions[i];

				rhombus
					.transition()
					.duration(800)
					.ease(d3.easeQuadInOut)
					.attr('transform', `translate(${pos * style.spacing}, 0)`);

				rhombus
					.select('.rhombus-main')
					.transition()
					.duration(800)
					.ease(d3.easeQuadInOut)
					.attr('d', createRhombusPath(style.size, style.rounded))
					.attr('stroke-width', style.strokeWidth);

				rhombus.select('.rhombus-glow').transition().duration(800).attr('r', style.size * 0.8);
			});

			// Update labels
			versionLabel.transition().duration(200).attr('opacity', 0).transition().duration(200).attr('opacity', 1).text(versions[versionIndex].name);

			typographyLabel.transition().duration(200).attr('opacity', 0).transition().duration(200).attr('opacity', 1).text(versions[versionIndex].typography);

			// Particle burst effect
			for (let i = 0; i < 12; i++) {
				const angle = (i / 12) * Math.PI * 2;
				const distance = 80;

				const particle = logoGroup
					.append('path')
					.attr('d', 'M 0 -5 L 5 0 L 0 5 L -5 0 Z')
					.attr('fill', METRO_RED)
					.attr('opacity', 0);

				particle
					.transition()
					.duration(100)
					.attr('opacity', 0.8)
					.attr('transform', `translate(0, 0) scale(1)`)
					.transition()
					.duration(600)
					.ease(d3.easeQuadOut)
					.attr('transform', `translate(${Math.cos(angle) * distance}, ${Math.sin(angle) * distance}) scale(0)`)
					.attr('opacity', 0)
					.on('end', () => particle.remove());
			}
		}

		// Entrance animation
		rhombuses.forEach((rhombus, i) => {
			rhombus
				.attr('transform', `translate(0, 0) scale(0)`)
				.transition()
				.delay(500 + i * 200)
				.duration(800)
				.ease(d3.easeBackOut.overshoot(1.5))
				.attr('opacity', 1)
				.attr('transform', `translate(${rhombusPositions[i] * versions[0].rhombusStyle.spacing}, 0) scale(1)`);
		});

		// Initialize first dot as active
		versionDots[0].select('.version-dot').attr('fill', METRO_RED).attr('r', 14);

		// Auto-cycle through versions
		let cycleInterval: ReturnType<typeof setInterval>;

		function startCycle() {
			cycleInterval = setInterval(() => {
				if (isDestroyed) {
					clearInterval(cycleInterval);
					return;
				}
				const nextVersion = (currentVersion + 1) % versions.length;
				morphToVersion(nextVersion);
			}, 4000);
		}

		setTimeout(startCycle, 2500);

		// Subtle breathing animation
		function breathe() {
			if (isDestroyed) return;

			rhombuses.forEach((rhombus, i) => {
				rhombus
					.select('.rhombus-glow')
					.transition()
					.duration(2000)
					.ease(d3.easeSinInOut)
					.attr('opacity', 0.25)
					.transition()
					.duration(2000)
					.ease(d3.easeSinInOut)
					.attr('opacity', 0.15)
					.on('end', () => {
						if (i === 0) breathe();
					});
			});
		}

		setTimeout(breathe, 1500);
	});

	onDestroy(() => {
		isDestroyed = true;
	});
</script>

<div class="viz-container">
	<div class="viz-header">
		<span class="viz-badge" style="background: var(--metro-l6)">Versión 5</span>
		<h3 class="viz-title">Metamorfosis</h3>
		<p class="viz-description">
			El logo ha evolucionado sutilmente en <strong>50 años</strong>, manteniendo siempre
			los tres rombos como símbolo de conexión. Cada versión refleja su época mientras
			preserva la esencia del diseño original.
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
		min-height: 500px;
		position: relative;
	}
</style>
