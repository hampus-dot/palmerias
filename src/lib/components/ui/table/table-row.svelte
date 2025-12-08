<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, ...rest }: { class?: string; [key: string]: any } = $props();
</script>

<tr
	class={cn(
		'border-b border-slate-200 transition-colors hover:bg-slate-50 data-[state=selected]:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800',
		className
	)}
	{...rest}
>
	{@render children?.()}
</tr>
