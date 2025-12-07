<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { players } from '$lib/data/players';

	const coaches = players.filter((p) => p.roles.includes('coach'));
	const regularPlayers = players.filter((p) => !p.roles.includes('coach'));
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900 dark:text-white">Player List</h1>
		<p class="mt-2 text-slate-600 dark:text-slate-400">Manage team players and coaches</p>
	</div>

	<Card title="Coaches" description="Playing coaches on the team">
		<div class="overflow-hidden">
			<table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
				<thead>
					<tr>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>#</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Name</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Position</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Matches</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Goals</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Assists</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
					{#each coaches as player}
						<tr class="hover:bg-slate-50 dark:hover:bg-slate-700">
							<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 dark:text-white"
								>{player.number}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-900 dark:text-white">
								<div class="flex items-center gap-2">
									<span class="font-medium">{player.name}</span>
									<span
										class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
										>Coach</span
									>
								</div>
							</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{player.position}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400"
								>{player.matchesPlayed}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{player.goals}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{player.assists}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>

	<Card title="Players" description="All players in the squad">
		<div class="overflow-hidden">
			<table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
				<thead>
					<tr>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>#</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Name</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Position</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Matches</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Goals</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
							>Assists</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-800">
					{#each regularPlayers as player}
						<tr class="hover:bg-slate-50 dark:hover:bg-slate-700">
							<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 dark:text-white"
								>{player.number}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900 dark:text-white"
								>{player.name}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{player.position}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400"
								>{player.matchesPlayed}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{player.goals}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600 dark:text-slate-400">{player.assists}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</div>
