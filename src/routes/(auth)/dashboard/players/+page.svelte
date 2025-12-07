<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { players } from '$lib/data/players';

	const coaches = players.filter((p) => p.roles.includes('coach'));
	const regularPlayers = players.filter((p) => !p.roles.includes('coach'));
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900">Spelarlista</h1>
		<p class="mt-2 text-slate-600">Hantera lagets spelare och tränare</p>
	</div>

	<Card title="Tränare" description="Spelande tränare i laget">
		<div class="overflow-hidden">
			<table class="min-w-full divide-y divide-slate-200">
				<thead>
					<tr>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>#</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Namn</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Position</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Matcher</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Mål</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Assist</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-200 bg-white">
					{#each coaches as player}
						<tr class="hover:bg-slate-50">
							<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900"
								>{player.number}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-900">
								<div class="flex items-center gap-2">
									<span class="font-medium">{player.name}</span>
									<span
										class="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800"
										>Tränare</span
									>
								</div>
							</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{player.position}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600"
								>{player.matchesPlayed}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{player.goals}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{player.assists}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>

	<Card title="Spelare" description="Alla spelare i truppen">
		<div class="overflow-hidden">
			<table class="min-w-full divide-y divide-slate-200">
				<thead>
					<tr>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>#</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Namn</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Position</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Matcher</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Mål</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
							>Assist</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-slate-200 bg-white">
					{#each regularPlayers as player}
						<tr class="hover:bg-slate-50">
							<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900"
								>{player.number}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-900"
								>{player.name}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{player.position}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600"
								>{player.matchesPlayed}</td
							>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{player.goals}</td>
							<td class="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{player.assists}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</Card>
</div>
