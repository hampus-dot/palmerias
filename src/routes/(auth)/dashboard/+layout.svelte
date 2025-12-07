<script lang="ts">
	import '../../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-slate-50 dark:bg-slate-900">
	<Sidebar />
	<main class="ml-64 p-8">
		{@render children()}
	</main>
</div>
