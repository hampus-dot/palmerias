<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { players } from '$lib/data/players';
	import { matches } from '$lib/data/matches';
	import { trainingSessions } from '$lib/data/training';

	const totalPlayers = players.length;
	const coaches = players.filter((p) => p.roles.includes('coach')).length;
	const totalGoals = players.reduce((sum, p) => sum + p.goals, 0);
	const totalAssists = players.reduce((sum, p) => sum + p.assists, 0);

	const playedMatches = matches.filter((m) => m.result);
	const wins = playedMatches.filter((m) => m.result && m.result.goalsFor > m.result.goalsAgainst)
		.length;
	const draws = playedMatches.filter((m) => m.result && m.result.goalsFor === m.result.goalsAgainst)
		.length;
	const losses = playedMatches.filter((m) => m.result && m.result.goalsFor < m.result.goalsAgainst)
		.length;

	const topScorers = [...players].sort((a, b) => b.goals - a.goals).slice(0, 5);
	const nextMatch = matches.find((m) => !m.result);
	const upcomingTraining = trainingSessions[0];

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('sv-SE', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900">Översikt</h1>
		<p class="mt-2 text-slate-600">Välkommen till Palmerias FC:s plattform</p>
	</div>

	<!-- Statistikkort -->
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600">Totalt spelare</p>
				<p class="mt-2 text-3xl font-bold text-slate-900">{totalPlayers}</p>
				<p class="mt-1 text-xs text-slate-500">{coaches} tränare</p>
			</div>
		</Card>

		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600">Matcher spelade</p>
				<p class="mt-2 text-3xl font-bold text-slate-900">{playedMatches.length}</p>
				<p class="mt-1 text-xs text-slate-500">
					{wins}V {draws}O {losses}F
				</p>
			</div>
		</Card>

		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600">Totalt mål</p>
				<p class="mt-2 text-3xl font-bold text-green-600">{totalGoals}</p>
				<p class="mt-1 text-xs text-slate-500">{totalAssists} assists</p>
			</div>
		</Card>

		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600">Träningar</p>
				<p class="mt-2 text-3xl font-bold text-slate-900">{trainingSessions.length}</p>
				<p class="mt-1 text-xs text-slate-500">schemalagda</p>
			</div>
		</Card>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Nästa match -->
		{#if nextMatch}
			<Card title="Nästa match" description="Kommande match">
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-lg font-semibold text-slate-900">
								Palmerias vs {nextMatch.opponent}
							</p>
							<p class="text-sm text-slate-600">{formatDate(nextMatch.date)} • {nextMatch.time}</p>
						</div>
						<span
							class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
						>
							{nextMatch.homeAway}
						</span>
					</div>
					<p class="text-sm text-slate-600">
						<span class="font-medium">Plats:</span>
						{nextMatch.location}
					</p>
				</div>
			</Card>
		{/if}

		<!-- Nästa träning -->
		{#if upcomingTraining}
			<Card title="Nästa träning" description="Kommande träningspass">
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-lg font-semibold text-slate-900">{upcomingTraining.type}</p>
							<p class="text-sm text-slate-600">
								{formatDate(upcomingTraining.date)} • {upcomingTraining.time}
							</p>
						</div>
						<div class="text-right">
							<p class="text-xl font-bold text-slate-900">{upcomingTraining.attendance.length}</p>
							<p class="text-xs text-slate-500">/{totalPlayers}</p>
						</div>
					</div>
					<p class="text-sm text-slate-600">
						<span class="font-medium">Plats:</span>
						{upcomingTraining.location}
					</p>
					{#if upcomingTraining.notes}
						<p class="text-sm text-slate-600">
							<span class="font-medium">Anteckningar:</span>
							{upcomingTraining.notes}
						</p>
					{/if}
				</div>
			</Card>
		{/if}
	</div>

	<!-- Skytteliga -->
	<Card title="Skytteliga" description="Top 5 målskyttar">
		<div class="space-y-3">
			{#each topScorers as player, index}
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
							<span class="text-sm font-bold text-slate-700">{index + 1}</span>
						</div>
						<div>
							<p class="font-medium text-slate-900">{player.name}</p>
							<p class="text-xs text-slate-500">#{player.number} • {player.position}</p>
						</div>
					</div>
					<div class="text-right">
						<p class="text-lg font-bold text-slate-900">{player.goals}</p>
						<p class="text-xs text-slate-500">{player.assists} assists</p>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</div>
