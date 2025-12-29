<script lang="ts">
	import '../app.css';
	import LogoLoader from '$lib/components/UI/LogoLoader.svelte';
	import { onMount } from 'svelte';
	import { isLoading } from '$lib/stores/loading';

	let { children } = $props();

	let phase = $state<'animating' | 'moving' | 'done'>('animating');

	onMount(() => {
		// Phase 1: Wait for the draw animation to complete
		const animationTimer = setTimeout(() => {
			phase = 'moving';

			// Phase 2: After move completes, fade out animated logo and show static
			setTimeout(() => {
				phase = 'done';
				isLoading.set(false);
			}, 800);
		}, 2800);

		return () => clearTimeout(animationTimer);
	});
</script>

<svelte:head>
	<title>MetroStory - Historia del Metro de Santiago</title>
</svelte:head>

{#if phase !== 'done'}
	<div class="loading-screen" class:fade-bg={phase === 'moving'}>
		<div
			class="logo-wrapper"
			class:centered={phase === 'animating'}
			class:in-corner={phase === 'moving'}
		>
			<LogoLoader size={280} duration={2.5} />
		</div>
	</div>
{/if}

<div class="content" class:visible={phase !== 'animating'}>
	{@render children()}
</div>

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		background: white;
		z-index: 9999;
		transition: background-color 0.5s ease-out;
	}

	.loading-screen.fade-bg {
		background: transparent;
		pointer-events: none;
	}

	.logo-wrapper {
		position: fixed;
		/* Start position: top-left corner where the logo will end up */
		top: 16px;
		left: 16px;
		width: 280px;
		/* We'll use transform to center it initially */
		transform-origin: top left;
		transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Centered state: transform to center of screen */
	.logo-wrapper.centered {
		/* Move to center: 50vw - half of logo width, 50vh - half of logo height */
		/* Logo is 280px wide, aspect ratio 2811/1986 ≈ 1.415, so height ≈ 198px */
		transform: translate(calc(50vw - 16px - 140px), calc(50vh - 16px - 99px));
	}

	/* Corner state: no transform, natural position */
	.logo-wrapper.in-corner {
		transform: translate(0, 0) scale(0.282); /* 79px / 280px ≈ 0.282 */
		width: 280px; /* Keep original width, scale down with transform */
	}

	@media (min-width: 768px) {
		.logo-wrapper {
			top: 32px;
			left: 32px;
		}

		.logo-wrapper.centered {
			transform: translate(calc(50vw - 32px - 140px), calc(50vh - 32px - 99px));
		}

		.logo-wrapper.in-corner {
			transform: translate(0, 0) scale(0.404); /* 113px / 280px ≈ 0.404 */
		}
	}

	.content {
		opacity: 0;
		transition: opacity 0.5s ease-in;
	}

	.content.visible {
		opacity: 1;
	}
</style>
