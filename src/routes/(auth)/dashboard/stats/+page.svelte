<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { players } from '$lib/data/players';
	import { matches } from '$lib/data/matches';

	const sortedByGoals = [...players].sort((a, b) => b.goals - a.goals);
	const sortedByAssists = [...players].sort((a, b) => b.assists - a.assists);
	const sortedByMatches = [...players].sort((a, b) => b.matchesPlayed - a.matchesPlayed);

	const playedMatches = matches.filter((m) => m.result);
	const totalGoalsFor = playedMatches.reduce((sum, m) => sum + (m.result?.goalsFor || 0), 0);
	const totalGoalsAgainst = playedMatches.reduce((sum, m) => sum + (m.result?.goalsAgainst || 0), 0);

	const wins = playedMatches.filter((m) => m.result && m.result.goalsFor > m.result.goalsAgainst)
		.length;
	const draws = playedMatches.filter((m) => m.result && m.result.goalsFor === m.result.goalsAgainst)
		.length;
	const losses = playedMatches.filter((m) => m.result && m.result.goalsFor < m.result.goalsAgainst)
		.length;

	const winRate = playedMatches.length > 0 ? ((wins / playedMatches.length) * 100).toFixed(1) : 0;
	const avgGoalsFor = playedMatches.length > 0 ? (totalGoalsFor / playedMatches.length).toFixed(1) : 0;
	const avgGoalsAgainst =
		playedMatches.length > 0 ? (totalGoalsAgainst / playedMatches.length).toFixed(1) : 0;
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900">Statistik</h1>
		<p class="mt-2 text-slate-600">Detaljerad lagsstatistik och spelarprestationer</p>
	</div>

	<!-- Lagstatistik -->
	<Card title="Lagstatistik" description="Säsongens resultat">
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<p class="text-sm font-medium text-slate-600">Matcher</p>
				<p class="mt-1 text-2xl font-bold text-slate-900">{playedMatches.length}</p>
				<p class="mt-1 text-xs text-slate-500">{wins}V {draws}O {losses}F</p>
			</div>
			<div>
				<p class="text-sm font-medium text-slate-600">Vinstprocent</p>
				<p class="mt-1 text-2xl font-bold text-green-600">{winRate}%</p>
			</div>
			<div>
				<p class="text-sm font-medium text-slate-600">Mål per match</p>
				<p class="mt-1 text-2xl font-bold text-slate-900">{avgGoalsFor}</p>
			</div>
			<div>
				<p class="text-sm font-medium text-slate-600">Insläppta per match</p>
				<p class="mt-1 text-2xl font-bold text-red-600">{avgGoalsAgainst}</p>
			</div>
		</div>
	</Card>

	<div class="grid gap-6 lg:grid-cols-3">
		<!-- Skytteliga -->
		<Card title="Målskyttar" description="Flest mål">
			<div class="space-y-2">
				{#each sortedByGoals.slice(0, 10) as player, index}
					<div class="flex items-center justify-between py-2">
						<div class="flex items-center gap-2">
							<span class="w-6 text-sm font-medium text-slate-500">{index + 1}.</span>
							<div>
								<p class="text-sm font-medium text-slate-900">{player.name}</p>
								<p class="text-xs text-slate-500">#{player.number}</p>
							</div>
						</div>
						<span class="text-lg font-bold text-slate-900">{player.goals}</span>
					</div>
				{/each}
			</div>
		</Card>

		<!-- Assistliga -->
		<Card title="Assistkung" description="Flest assists">
			<div class="space-y-2">
				{#each sortedByAssists.slice(0, 10) as player, index}
					<div class="flex items-center justify-between py-2">
						<div class="flex items-center gap-2">
							<span class="w-6 text-sm font-medium text-slate-500">{index + 1}.</span>
							<div>
								<p class="text-sm font-medium text-slate-900">{player.name}</p>
								<p class="text-xs text-slate-500">#{player.number}</p>
							</div>
						</div>
						<span class="text-lg font-bold text-slate-900">{player.assists}</span>
					</div>
				{/each}
			</div>
		</Card>

		<!-- Närvaro -->
		<Card title="Närvaro" description="Flest matcher">
			<div class="space-y-2">
				{#each sortedByMatches.slice(0, 10) as player, index}
					<div class="flex items-center justify-between py-2">
						<div class="flex items-center gap-2">
							<span class="w-6 text-sm font-medium text-slate-500">{index + 1}.</span>
							<div>
								<p class="text-sm font-medium text-slate-900">{player.name}</p>
								<p class="text-xs text-slate-500">#{player.number}</p>
							</div>
						</div>
						<span class="text-lg font-bold text-slate-900">{player.matchesPlayed}</span>
					</div>
				{/each}
			</div>
		</Card>
	</div>

	<!-- Positionsfördelning -->
	<Card title="Positionsfördelning" description="Spelare per position">
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each ['Målvakt', 'Försvarare', 'Mittfältare', 'Forward'] as position}
				{@const count = players.filter((p) => p.position === position).length}
				<div class="rounded-lg bg-slate-50 p-4">
					<p class="text-sm font-medium text-slate-600">{position}</p>
					<p class="mt-2 text-3xl font-bold text-slate-900">{count}</p>
					<p class="mt-1 text-xs text-slate-500">spelare</p>
				</div>
			{/each}
		</div>
	</Card>
</div>
