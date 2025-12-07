<script lang="ts">
	let {
		title = '',
		description = '',
		children
	}: {
		title?: string;
		description?: string;
		children: any;
	} = $props();
</script>

<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
	{#if title}
		<div class="mb-4">
			<h3 class="text-lg font-semibold text-slate-900">{title}</h3>
			{#if description}
				<p class="mt-1 text-sm text-slate-500">{description}</p>
			{/if}
		</div>
	{/if}
	{@render children()}
</div>
