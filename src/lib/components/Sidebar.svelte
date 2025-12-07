<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ThemeToggle from './ThemeToggle.svelte';

	const navigation = [
		{ name: 'Overview', href: '/dashboard', icon: '📊' },
		{ name: 'Players', href: '/players', icon: '👥' },
		{ name: 'Training', href: '/training', icon: '⚽' },
		{ name: 'Matches', href: '/matches', icon: '🏆' },
		{ name: 'Statistics', href: '/stats', icon: '📈' },
		{ name: 'Admin', href: '/admin', icon: '⚙️' }
	];

	function logout() {
		localStorage.removeItem('user');
		goto('/');
	}
</script>

<aside class="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white dark:bg-slate-950">
	<div class="flex h-16 items-center justify-between border-b border-slate-800 px-6 dark:border-slate-700">
		<h1 class="text-xl font-bold">Palmerias FC</h1>
		<ThemeToggle />
	</div>
	<nav class="flex flex-col gap-1 p-4">
		{#each navigation as item}
			<a
				href={item.href}
				class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors
					{$page.url.pathname === item.href
					? 'bg-slate-800 text-white dark:bg-slate-800'
					: 'text-slate-300 hover:bg-slate-800 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800'}"
			>
				<span class="text-xl">{item.icon}</span>
				<span>{item.name}</span>
			</a>
		{/each}
	</nav>
	<div class="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4 dark:border-slate-700">
		<button
			onclick={logout}
			class="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
		>
			Logout
		</button>
	</div>
</aside>
