<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, ...rest }: { class?: string; [key: string]: any } = $props();
</script>

<caption class={cn('mt-4 text-sm text-slate-500 dark:text-slate-400', className)} {...rest}>
	{@render children?.()}
</caption>
