<script lang="ts">
	import { cn } from '$lib/utils';

	let { class: className, ...rest }: { class?: string; [key: string]: any } = $props();
</script>

<div class="relative w-full overflow-auto">
	<table class={cn('w-full caption-bottom text-sm', className)} {...rest}>
		{@render children?.()}
	</table>
</div>
