<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();

	onMount(() => {
		// Check if user is logged in
		const user = localStorage.getItem('user');
		if (!user) {
			goto('/login');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
{@render children()}
