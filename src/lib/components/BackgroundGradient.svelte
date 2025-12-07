<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		children,
		className = '',
		containerClassName = '',
		animate = true
	}: {
		children: any;
		className?: string;
		containerClassName?: string;
		animate?: boolean;
	} = $props();
</script>

<div class={cn('relative p-[4px] group', containerClassName)}>
	<div
		class={cn(
			'absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform',
			animate &&
				'bg-[radial-gradient(circle_farthest-side_at_0_100%,#a0a0a0,transparent),radial-gradient(circle_farthest-side_at_100%_0,#606060,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#404040,transparent),radial-gradient(circle_farthest-side_at_0_0,#808080,#0a0a0a)]',
			'dark:bg-[radial-gradient(circle_farthest-side_at_0_100%,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_0,#e0e0e0,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#c0c0c0,transparent),radial-gradient(circle_farthest-side_at_0_0,#f0f0f0,#1a1a1a)]'
		)}
		style={animate ? 'background-size: 400% 400%; animation: gradient 5s ease infinite;' : ''}
	></div>

	<div
		class={cn(
			'absolute inset-0 rounded-3xl z-[1] will-change-transform',
			'bg-[radial-gradient(circle_farthest-side_at_0_100%,#a0a0a0,transparent),radial-gradient(circle_farthest-side_at_100%_0,#606060,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#404040,transparent),radial-gradient(circle_farthest-side_at_0_0,#808080,#0a0a0a)]',
			'dark:bg-[radial-gradient(circle_farthest-side_at_0_100%,#ffffff,transparent),radial-gradient(circle_farthest-side_at_100%_0,#e0e0e0,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#c0c0c0,transparent),radial-gradient(circle_farthest-side_at_0_0,#f0f0f0,#1a1a1a)]'
		)}
		style={animate ? 'background-size: 400% 400%; animation: gradient 5s ease infinite;' : ''}
	></div>

	<div class={cn('relative z-10', className)}>
		{@render children()}
	</div>
</div>

<style>
	@keyframes gradient {
		0%,
		100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}
</style>
