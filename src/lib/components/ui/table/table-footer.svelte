<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, ...rest }: { class?: string; [key: string]: any } = $props();
</script>

<tfoot
	class={cn(
		'border-t border-slate-200 bg-slate-50/50 font-medium [&>tr]:last:border-b-0 dark:border-slate-800 dark:bg-slate-800/50',
		className
	)}
	{...rest}
>
	{@render children?.()}
</tfoot>
