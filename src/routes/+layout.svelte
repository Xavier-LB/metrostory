<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>MetroStory - Historia del Metro de Santiago</title>
</svelte:head>

{@render children()}
