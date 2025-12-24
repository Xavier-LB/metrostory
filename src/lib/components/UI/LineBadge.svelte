<script lang="ts">
	import type { MetroLine } from '$lib/types';

	interface Props {
		line: MetroLine;
		size?: 'sm' | 'md' | 'lg';
	}

	let { line, size = 'md' }: Props = $props();

	const sizeClasses = {
		sm: 'px-2 py-0.5 text-[10px]',
		md: 'px-2.5 py-1 text-xs',
		lg: 'px-3.5 py-1.5 text-sm'
	};
</script>

<span
	class="font-ui inline-flex items-center rounded-full font-semibold tracking-wide shadow-sm transition-transform duration-200 hover:scale-105 {sizeClasses[
		size
	]}"
	style="background-color: {line.color}; color: {line.textColor}"
>
	{line.name}
</span>
