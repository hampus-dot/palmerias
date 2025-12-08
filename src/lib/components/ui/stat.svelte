<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		title: string;
		value: string | number;
		description?: string;
		trend?: 'up' | 'down' | 'neutral';
		trendValue?: string;
		icon?: any;
		class?: string;
	}

	let {
		title,
		value,
		description,
		trend,
		trendValue,
		icon,
		class: className,
		children
	}: Props = $props();

	const trendColors = {
		up: 'text-green-600 dark:text-green-400',
		down: 'text-red-600 dark:text-red-400',
		neutral: 'text-slate-600 dark:text-slate-400'
	};
</script>

<div
	class={cn(
		'relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900',
		className
	)}
>
	<div class="flex items-start justify-between">
		<div class="flex-1 space-y-1">
			<p class="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
			<p class="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
			{#if description || trendValue}
				<div class="flex items-center gap-2 text-sm">
					{#if trendValue && trend}
						<span class={cn('font-medium', trendColors[trend])}>
							{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
							{trendValue}
						</span>
					{/if}
					{#if description}
						<span class="text-slate-600 dark:text-slate-400">{description}</span>
					{/if}
				</div>
			{/if}
		</div>
		{#if icon}
			<div class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
				<svelte:component this={icon} class="h-6 w-6 text-slate-600 dark:text-slate-400" />
			</div>
		{/if}
	</div>
	{#if children}
		<div class="mt-4 border-t border-slate-200 pt-4 dark:border-slate-800">
			{@render children()}
		</div>
	{/if}
</div>
