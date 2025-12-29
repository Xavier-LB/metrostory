<script lang="ts">
	import '../app.css';
	import LogoLoader from '$lib/components/UI/LogoLoader.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	let isLoading = $state(true);
	let showLoader = $state(true);

	onMount(() => {
		// Wait for the animation to complete, then fade out
		const timer = setTimeout(() => {
			isLoading = false;
			// Remove loader from DOM after fade animation
			setTimeout(() => {
				showLoader = false;
			}, 500);
		}, 2800); // slightly longer than the animation duration

		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>MetroStory - Historia del Metro de Santiago</title>
</svelte:head>

{#if showLoader}
	<div class="loading-screen" class:fade-out={!isLoading}>
		<LogoLoader size={280} duration={2.5} />
	</div>
{/if}

<div class="content" class:visible={!isLoading}>
	{@render children()}
</div>

<style>
	.loading-screen {
		position: fixed;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: white;
		z-index: 9999;
		transition: opacity 0.5s ease-out;
	}

	.loading-screen.fade-out {
		opacity: 0;
		pointer-events: none;
	}

	.content {
		opacity: 0;
		transition: opacity 0.5s ease-in;
	}

	.content.visible {
		opacity: 1;
	}
</style>
