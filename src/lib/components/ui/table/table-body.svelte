<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, ...rest }: { class?: string; [key: string]: any } = $props();
</script>

<tbody class={cn('[&_tr:last-child]:border-0', className)} {...rest}>
	{@render children?.()}
</tbody>
