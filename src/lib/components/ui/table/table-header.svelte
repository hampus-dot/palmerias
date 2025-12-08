<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, ...rest }: { class?: string; [key: string]: any } = $props();
</script>

<thead class={cn('[&_tr]:border-b', className)} {...rest}>
	{@render children?.()}
</thead>
