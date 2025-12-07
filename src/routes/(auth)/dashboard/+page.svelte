<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import TrainingAttendanceChart from '$lib/components/TrainingAttendanceChart.svelte';
	import TacticalStats from '$lib/components/TacticalStats.svelte';
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
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900 dark:text-white">Overview</h1>
		<p class="mt-2 text-slate-600 dark:text-slate-400">Welcome to Palmerias FC platform</p>
	</div>

	<!-- Stats Cards -->
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Players</p>
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{totalPlayers}</p>
				<p class="mt-1 text-xs text-slate-500 dark:text-slate-500">{coaches} coaches</p>
			</div>
		</Card>

		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Matches Played</p>
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{playedMatches.length}</p>
				<p class="mt-1 text-xs text-slate-500 dark:text-slate-500">
					{wins}W {draws}D {losses}L
				</p>
			</div>
		</Card>

		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Goals</p>
				<p class="mt-2 text-3xl font-bold text-green-600 dark:text-green-500">{totalGoals}</p>
				<p class="mt-1 text-xs text-slate-500 dark:text-slate-500">{totalAssists} assists</p>
			</div>
		</Card>

		<Card>
			<div class="text-center">
				<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Trainings</p>
				<p class="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{trainingSessions.length}</p>
				<p class="mt-1 text-xs text-slate-500 dark:text-slate-500">scheduled</p>
			</div>
		</Card>
	</div>

	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Next Match -->
		{#if nextMatch}
			<Card title="Next Match" description="Upcoming fixture">
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-lg font-semibold text-slate-900 dark:text-white">
								Palmerias vs {nextMatch.opponent}
							</p>
							<p class="text-sm text-slate-600 dark:text-slate-400">{formatDate(nextMatch.date)} • {nextMatch.time}</p>
						</div>
						<span
							class="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
						>
							{nextMatch.homeAway}
						</span>
					</div>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						<span class="font-medium">Location:</span>
						{nextMatch.location}
					</p>
				</div>
			</Card>
		{/if}

		<!-- Next Training -->
		{#if upcomingTraining}
			<Card title="Next Training" description="Upcoming session">
				<div class="space-y-3">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-lg font-semibold text-slate-900 dark:text-white">{upcomingTraining.type}</p>
							<p class="text-sm text-slate-600 dark:text-slate-400">
								{formatDate(upcomingTraining.date)} • {upcomingTraining.time}
							</p>
						</div>
						<div class="text-right">
							<p class="text-xl font-bold text-slate-900 dark:text-white">{upcomingTraining.attendance.length}</p>
							<p class="text-xs text-slate-500 dark:text-slate-500">/{totalPlayers}</p>
						</div>
					</div>
					<p class="text-sm text-slate-600 dark:text-slate-400">
						<span class="font-medium">Location:</span>
						{upcomingTraining.location}
					</p>
					{#if upcomingTraining.notes}
						<p class="text-sm text-slate-600 dark:text-slate-400">
							<span class="font-medium">Notes:</span>
							{upcomingTraining.notes}
						</p>
					{/if}
				</div>
			</Card>
		{/if}
	</div>

	<!-- Charts Section -->
	<div class="grid gap-6 lg:grid-cols-2">
		<Card title="Training Attendance" description="Player participation tracking">
			<TrainingAttendanceChart />
		</Card>

		<Card title="Tactical Analysis" description="Performance metrics & Scout AI">
			<TacticalStats />
		</Card>
	</div>

	<!-- Top Scorers -->
	<Card title="Top Scorers" description="Top 5 goal scorers">
		<div class="space-y-3">
			{#each topScorers as player, index}
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700">
							<span class="text-sm font-bold text-slate-700 dark:text-slate-300">{index + 1}</span>
						</div>
						<div>
							<p class="font-medium text-slate-900 dark:text-white">{player.name}</p>
							<p class="text-xs text-slate-500 dark:text-slate-500">#{player.number} • {player.position}</p>
						</div>
					</div>
					<div class="text-right">
						<p class="text-lg font-bold text-slate-900 dark:text-white">{player.goals}</p>
						<p class="text-xs text-slate-500 dark:text-slate-500">{player.assists} assists</p>
					</div>
				</div>
			{/each}
		</div>
	</Card>
</div>
