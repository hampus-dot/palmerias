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

	const winRate = playedMatches.length > 0 ? ((wins / playedMatches.length) * 100).toFixed(0) : 0;
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="space-y-2">
		<h1 class="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard</h1>
		<p class="text-slate-600 dark:text-slate-400">Welcome back to Palmerias FC</p>
	</div>

	<!-- Key Metrics -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<!-- Total Players -->
		<div class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Players</p>
					<p class="text-3xl font-bold text-slate-900 dark:text-white">{totalPlayers}</p>
					<p class="text-xs text-slate-500 dark:text-slate-500">{coaches} coaches</p>
				</div>
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl dark:bg-blue-950">
					👥
				</div>
			</div>
		</div>

		<!-- Win Rate -->
		<div class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Win Rate</p>
					<p class="text-3xl font-bold text-green-600 dark:text-green-500">{winRate}%</p>
					<p class="text-xs text-slate-500 dark:text-slate-500">{wins}W {draws}D {losses}L</p>
				</div>
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-2xl dark:bg-green-950">
					🏆
				</div>
			</div>
		</div>

		<!-- Total Goals -->
		<div class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Goals</p>
					<p class="text-3xl font-bold text-orange-600 dark:text-orange-500">{totalGoals}</p>
					<p class="text-xs text-slate-500 dark:text-slate-500">{totalAssists} assists</p>
				</div>
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-2xl dark:bg-orange-950">
					⚽
				</div>
			</div>
		</div>

		<!-- Trainings -->
		<div class="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
			<div class="flex items-center justify-between">
				<div class="space-y-1">
					<p class="text-sm font-medium text-slate-600 dark:text-slate-400">Trainings</p>
					<p class="text-3xl font-bold text-purple-600 dark:text-purple-500">{trainingSessions.length}</p>
					<p class="text-xs text-slate-500 dark:text-slate-500">scheduled</p>
				</div>
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-2xl dark:bg-purple-950">
					📅
				</div>
			</div>
		</div>
	</div>

	<!-- Upcoming Events -->
	<div class="grid gap-6 lg:grid-cols-2">
		<!-- Next Match -->
		{#if nextMatch}
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">Next Match</h2>
					<span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
						{nextMatch.homeAway}
					</span>
				</div>
				<div class="space-y-4">
					<div class="flex items-center justify-center gap-4 py-4">
						<div class="text-center">
							<div class="mb-2 text-2xl font-bold text-slate-900 dark:text-white">Palmerias</div>
							<div class="text-sm text-slate-500 dark:text-slate-500">FC</div>
						</div>
						<div class="text-3xl font-bold text-slate-400 dark:text-slate-600">vs</div>
						<div class="text-center">
							<div class="mb-2 text-2xl font-bold text-slate-900 dark:text-white">{nextMatch.opponent}</div>
							<div class="text-sm text-slate-500 dark:text-slate-500">FC</div>
						</div>
					</div>
					<div class="flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
						<div class="flex items-center gap-2">
							<span class="text-xl">📍</span>
							<span class="text-sm text-slate-600 dark:text-slate-400">{nextMatch.location}</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-xl">🕐</span>
							<span class="text-sm font-medium text-slate-900 dark:text-white">{formatDate(nextMatch.date)} • {nextMatch.time}</span>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<!-- Next Training -->
		{#if upcomingTraining}
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-lg font-semibold text-slate-900 dark:text-white">Next Training</h2>
					<div class="flex items-center gap-2">
						<span class="text-2xl font-bold text-slate-900 dark:text-white">{upcomingTraining.attendance.length}</span>
						<span class="text-sm text-slate-500 dark:text-slate-500">/ {totalPlayers}</span>
					</div>
				</div>
				<div class="space-y-4">
					<div class="space-y-2">
						<div class="text-xl font-semibold text-slate-900 dark:text-white">{upcomingTraining.type}</div>
						<div class="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
							<div class="flex items-center gap-2">
								<span>🕐</span>
								<span>{formatDate(upcomingTraining.date)} • {upcomingTraining.time}</span>
							</div>
						</div>
					</div>
					<div class="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
						<div class="mb-2 flex items-center gap-2">
							<span>📍</span>
							<span class="text-sm font-medium text-slate-900 dark:text-white">{upcomingTraining.location}</span>
						</div>
						{#if upcomingTraining.notes}
							<p class="text-sm text-slate-600 dark:text-slate-400">{upcomingTraining.notes}</p>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Analytics -->
	<div class="grid gap-6 lg:grid-cols-2">
		<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
			<h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Training Attendance</h2>
			<TrainingAttendanceChart />
		</div>

		<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
			<h2 class="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Tactical Analysis</h2>
			<TacticalStats />
		</div>
	</div>

	<!-- Top Scorers -->
	<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
		<h2 class="mb-6 text-lg font-semibold text-slate-900 dark:text-white">Top Scorers</h2>
		<div class="space-y-4">
			{#each topScorers as player, index}
				<div class="flex items-center gap-4">
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-white">
						{index + 1}
					</div>
					<div class="flex flex-1 items-center justify-between">
						<div>
							<div class="font-medium text-slate-900 dark:text-white">{player.name}</div>
							<div class="text-sm text-slate-500 dark:text-slate-500">#{player.number} • {player.position}</div>
						</div>
						<div class="text-right">
							<div class="text-2xl font-bold text-slate-900 dark:text-white">{player.goals}</div>
							<div class="text-xs text-slate-500 dark:text-slate-500">{player.assists} assists</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
