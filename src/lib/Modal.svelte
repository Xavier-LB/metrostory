<script lang="ts">
	const handleClickOutside = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	const closeModal = () => {
		history.back();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			history.back();
		}
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	class="fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
	on:click={handleClickOutside}
	on:keydown={(e) => handleKeydown(e)}
	role="dialog"
	aria-modal="true"
>
	<div class="relative bg-white p-10 border-1 rounded-xl">
		<button
			on:click={closeModal}
			class="absolute -top-3 -right-3 w-10 h-10 border-1 p-1 rounded-full bg-slate-400">❌</button
		>
		<slot />
	</div>
</div>

<svelte:window on:keydown={(e) => handleKeydown(e)} />
