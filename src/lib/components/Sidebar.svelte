<script lang="ts">
	import { page } from '$app/stores';

	const navigation = [
		{ name: 'Översikt', href: '/', icon: '📊' },
		{ name: 'Spelarlista', href: '/players', icon: '👥' },
		{ name: 'Träning', href: '/training', icon: '⚽' },
		{ name: 'Matcher', href: '/matches', icon: '🏆' },
		{ name: 'Statistik', href: '/stats', icon: '📈' }
	];
</script>

<aside class="fixed inset-y-0 left-0 w-64 bg-slate-900 text-white">
	<div class="flex h-16 items-center justify-center border-b border-slate-800">
		<h1 class="text-xl font-bold">Palmerias FC</h1>
	</div>
	<nav class="flex flex-col gap-1 p-4">
		{#each navigation as item}
			<a
				href={item.href}
				class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors
					{$page.url.pathname === item.href
					? 'bg-slate-800 text-white'
					: 'text-slate-300 hover:bg-slate-800 hover:text-white'}"
			>
				<span class="text-xl">{item.icon}</span>
				<span>{item.name}</span>
			</a>
		{/each}
	</nav>
</aside>
