<script lang="ts">
	import { Search, Filter, TrendingUp, Target } from 'lucide-svelte';
	import { players } from '$lib/data/players';

	let searchTerm = $state('');
	let positionFilter = $state('all');
	let roleFilter = $state('all');

	// Filtered players based on search and filters
	let filteredPlayers = $derived.by(() => {
		return players.filter((player) => {
			const matchesSearch =
				searchTerm === '' ||
				player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				player.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
				player.number.toString().includes(searchTerm);

			const matchesPosition = positionFilter === 'all' || player.position === positionFilter;

			const matchesRole =
				roleFilter === 'all' || player.roles.some((role) => role === roleFilter);

			return matchesSearch && matchesPosition && matchesRole;
		});
	});

	const positions = ['all', 'GK', 'DF', 'MF', 'FW'];
	const roles = ['all', 'player', 'coach', 'manager'];

	function getPositionColor(position: string) {
		switch (position) {
			case 'GK':
				return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300';
			case 'DF':
				return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
			case 'MF':
				return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300';
			case 'FW':
				return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300';
			default:
				return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
		}
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<div class="mx-auto max-w-[1920px] p-6 lg:p-8">
		<!-- Header -->
		<div class="mb-8 space-y-2">
			<h1
				class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400"
			>
				Players
			</h1>
			<p class="text-lg text-slate-600 dark:text-slate-400">
				View all team members and their statistics
			</p>
		</div>

		<!-- Stats Overview -->
		<div class="mb-8 grid gap-4 md:grid-cols-4">
			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
			>
				<p class="text-sm text-slate-600 dark:text-slate-400">Total Players</p>
				<p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{players.length}</p>
			</div>

			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
			>
				<p class="text-sm text-slate-600 dark:text-slate-400">Total Goals</p>
				<p class="text-3xl font-bold text-orange-600 dark:text-orange-400">
					{players.reduce((sum, p) => sum + p.goals, 0)}
				</p>
			</div>

			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
			>
				<p class="text-sm text-slate-600 dark:text-slate-400">Total Assists</p>
				<p class="text-3xl font-bold text-purple-600 dark:text-purple-400">
					{players.reduce((sum, p) => sum + p.assists, 0)}
				</p>
			</div>

			<div
				class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
			>
				<p class="text-sm text-slate-600 dark:text-slate-400">Average Age</p>
				<p class="text-3xl font-bold text-green-600 dark:text-green-400">
					{(players.reduce((sum, p) => sum + p.age, 0) / players.length).toFixed(1)}
				</p>
			</div>
		</div>

		<!-- Filters -->
		<div class="mb-6 flex flex-col gap-4 md:flex-row">
			<!-- Search -->
			<div class="relative flex-1">
				<Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
				<input
					type="text"
					bind:value={searchTerm}
					placeholder="Search players by name, position, or number..."
					class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-600"
				/>
			</div>

			<!-- Position Filter -->
			<div class="flex items-center gap-2">
				<Filter class="h-5 w-5 text-slate-400" />
				<select
					bind:value={positionFilter}
					class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
				>
					{#each positions as pos}
						<option value={pos}>{pos === 'all' ? 'All Positions' : pos}</option>
					{/each}
				</select>
			</div>

			<!-- Role Filter -->
			<div>
				<select
					bind:value={roleFilter}
					class="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
				>
					{#each roles as role}
						<option value={role}>{role === 'all' ? 'All Roles' : role.charAt(0).toUpperCase() + role.slice(1)}</option>
					{/each}
				</select>
			</div>
		</div>

		<!-- Results Count -->
		<div class="mb-4">
			<p class="text-sm text-slate-600 dark:text-slate-400">
				Showing <span class="font-semibold">{filteredPlayers.length}</span> of <span
					class="font-semibold">{players.length}</span
				> players
			</p>
		</div>

		<!-- Players Grid -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredPlayers as player}
				<div
					class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
				>
					<!-- Player Avatar -->
					<div class="mb-4 flex items-start justify-between">
						<div
							class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-2xl font-bold text-white"
						>
							{player.name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</div>
						<div
							class="rounded-full bg-slate-100 px-3 py-1 text-xl font-bold text-slate-900 dark:bg-slate-800 dark:text-white"
						>
							#{player.number}
						</div>
					</div>

					<!-- Player Info -->
					<div class="mb-4 space-y-2">
						<h3 class="text-xl font-bold text-slate-900 dark:text-white">{player.name}</h3>
						<div class="flex flex-wrap gap-2">
							<span class="rounded-full {getPositionColor(player.position)} px-3 py-1 text-xs font-semibold">
								{player.position}
							</span>
							{#each player.roles as role}
								<span
									class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
								>
									{role}
								</span>
							{/each}
						</div>
					</div>

					<!-- Player Stats -->
					<div class="space-y-3">
						<div class="flex items-center justify-between text-sm">
							<span class="text-slate-600 dark:text-slate-400">Age</span>
							<span class="font-semibold text-slate-900 dark:text-white">{player.age}</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-slate-600 dark:text-slate-400">Nationality</span>
							<span class="font-semibold text-slate-900 dark:text-white">{player.nationality}</span
							>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-slate-600 dark:text-slate-400">Height</span>
							<span class="font-semibold text-slate-900 dark:text-white">{player.height} cm</span>
						</div>
					</div>

					<!-- Performance Stats -->
					<div class="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
						<div class="flex items-center gap-2">
							<Target class="h-4 w-4 text-orange-600 dark:text-orange-400" />
							<div>
								<p class="text-xs text-slate-600 dark:text-slate-400">Goals</p>
								<p class="text-lg font-bold text-orange-600 dark:text-orange-400">{player.goals}</p>
							</div>
						</div>
						<div class="flex items-center gap-2">
							<TrendingUp class="h-4 w-4 text-purple-600 dark:text-purple-400" />
							<div>
								<p class="text-xs text-slate-600 dark:text-slate-400">Assists</p>
								<p class="text-lg font-bold text-purple-600 dark:text-purple-400">
									{player.assists}
								</p>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Empty State -->
		{#if filteredPlayers.length === 0}
			<div class="py-16 text-center">
				<div class="mb-4 text-6xl">🔍</div>
				<h3 class="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
					No players found
				</h3>
				<p class="text-slate-600 dark:text-slate-400">
					Try adjusting your search or filters
				</p>
			</div>
		{/if}
	</div>
</div>
