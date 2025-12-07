<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { theme } from '$lib/stores/theme';

	let { children } = $props();

	onMount(() => {
		// Check if user is logged in
		const user = localStorage.getItem('user');
		if (!user) {
			goto('/login');
		}

		// Apply theme
		document.documentElement.classList.toggle('dark', $theme === 'dark');
	});

	// Watch for theme changes
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.documentElement.classList.toggle('dark', $theme === 'dark');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
