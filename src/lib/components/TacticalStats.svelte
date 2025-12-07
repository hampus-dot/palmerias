<script lang="ts">
	import { matches } from '$lib/data/matches';

	const playedMatches = matches.filter((m) => m.result);

	// Win rate
	const wins = playedMatches.filter((m) => m.result && m.result.goalsFor > m.result.goalsAgainst)
		.length;
	const draws = playedMatches.filter(
		(m) => m.result && m.result.goalsFor === m.result.goalsAgainst
	).length;
	const losses = playedMatches.filter(
		(m) => m.result && m.result.goalsFor < m.result.goalsAgainst
	).length;

	const winRate = playedMatches.length > 0 ? Math.round((wins / playedMatches.length) * 100) : 0;

	// Goals
	const totalGoalsFor = playedMatches.reduce((sum, m) => sum + (m.result?.goalsFor || 0), 0);
	const totalGoalsAgainst = playedMatches.reduce(
		(sum, m) => sum + (m.result?.goalsAgainst || 0),
		0
	);
	const avgGoalsFor =
		playedMatches.length > 0 ? (totalGoalsFor / playedMatches.length).toFixed(2) : 0;
	const avgGoalsAgainst =
		playedMatches.length > 0 ? (totalGoalsAgainst / playedMatches.length).toFixed(2) : 0;

	// Home/Away stats
	const homeMatches = playedMatches.filter((m) => m.homeAway === 'Hemma');
	const awayMatches = playedMatches.filter((m) => m.homeAway === 'Borta');

	const homeWins = homeMatches.filter(
		(m) => m.result && m.result.goalsFor > m.result.goalsAgainst
	).length;
	const awayWins = awayMatches.filter(
		(m) => m.result && m.result.goalsFor > m.result.goalsAgainst
	).length;

	const homeWinRate =
		homeMatches.length > 0 ? Math.round((homeWins / homeMatches.length) * 100) : 0;
	const awayWinRate =
		awayMatches.length > 0 ? Math.round((awayWins / awayMatches.length) * 100) : 0;

	// Fun tactical insights
	const cleanSheets = playedMatches.filter((m) => m.result?.goalsAgainst === 0).length;
	const highScoringGames = playedMatches.filter(
		(m) => m.result && m.result.goalsFor + m.result.goalsAgainst >= 4
	).length;
</script>

<div class="space-y-6">
	<!-- Win Rate Visualization -->
	<div>
		<h4 class="mb-3 text-sm font-semibold text-slate-700">Form Overview</h4>
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
				<p class="text-sm font-medium text-green-900">Wins</p>
				<p class="mt-2 text-3xl font-bold text-green-600">{wins}</p>
				<p class="text-xs text-green-700">{winRate}%</p>
			</div>
			<div class="rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 text-center">
				<p class="text-sm font-medium text-yellow-900">Draws</p>
				<p class="mt-2 text-3xl font-bold text-yellow-600">{draws}</p>
			</div>
			<div class="rounded-lg bg-gradient-to-br from-red-50 to-red-100 p-4 text-center">
				<p class="text-sm font-medium text-red-900">Losses</p>
				<p class="mt-2 text-3xl font-bold text-red-600">{losses}</p>
			</div>
		</div>
	</div>

	<!-- Goals Analysis -->
	<div>
		<h4 class="mb-3 text-sm font-semibold text-slate-700">Goal Analysis</h4>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="rounded-lg border border-green-200 bg-green-50 p-4">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-green-900">Goals Scored/Game</p>
						<p class="mt-2 text-3xl font-bold text-green-600">{avgGoalsFor}</p>
					</div>
					<span class="text-4xl">⚽</span>
				</div>
			</div>
			<div class="rounded-lg border border-red-200 bg-red-50 p-4">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-red-900">Goals Conceded/Game</p>
						<p class="mt-2 text-3xl font-bold text-red-600">{avgGoalsAgainst}</p>
					</div>
					<span class="text-4xl">🥅</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Home/Away Performance -->
	<div>
		<h4 class="mb-3 text-sm font-semibold text-slate-700">Home vs Away</h4>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-4">
				<p class="text-sm font-medium text-blue-900">Home Record</p>
				<div class="mt-2 flex items-baseline gap-2">
					<p class="text-3xl font-bold text-blue-600">{homeWinRate}%</p>
					<p class="text-sm text-blue-700">win rate</p>
				</div>
				<p class="mt-1 text-xs text-blue-700">{homeMatches.length} games played</p>
			</div>
			<div class="rounded-lg border border-purple-200 bg-purple-50 p-4">
				<p class="text-sm font-medium text-purple-900">Away Record</p>
				<div class="mt-2 flex items-baseline gap-2">
					<p class="text-3xl font-bold text-purple-600">{awayWinRate}%</p>
					<p class="text-sm text-purple-700">win rate</p>
				</div>
				<p class="mt-1 text-xs text-purple-700">{awayMatches.length} games played</p>
			</div>
		</div>
	</div>

	<!-- Fun Tactical Insights -->
	<div class="space-y-2">
		<h4 class="text-sm font-semibold text-slate-700">Scout AI Insights 🤖</h4>
		<div class="space-y-2 rounded-lg bg-gradient-to-r from-slate-50 to-blue-50 p-4 text-sm">
			<p class="flex items-center gap-2">
				<span class="text-xl">🛡️</span>
				<span><strong>{cleanSheets}</strong> clean sheets - solid defense!</span>
			</p>
			<p class="flex items-center gap-2">
				<span class="text-xl">🔥</span>
				<span><strong>{highScoringGames}</strong> high-scoring thrillers (4+ goals)</span>
			</p>
			<p class="flex items-center gap-2">
				<span class="text-xl">📊</span>
				<span>
					Goal difference: <strong class={totalGoalsFor - totalGoalsAgainst >= 0 ? 'text-green-600' : 'text-red-600'}>
						{totalGoalsFor - totalGoalsAgainst > 0 ? '+' : ''}{totalGoalsFor -
							totalGoalsAgainst}
					</strong>
				</span>
			</p>
			{#if homeWinRate > awayWinRate}
				<p class="flex items-center gap-2">
					<span class="text-xl">🏟️</span>
					<span>Fortress at home - {homeWinRate - awayWinRate}% better than away!</span>
				</p>
			{:else if awayWinRate > homeWinRate}
				<p class="flex items-center gap-2">
					<span class="text-xl">🚌</span>
					<span>Road warriors - {awayWinRate - homeWinRate}% better away!</span>
				</p>
			{/if}
		</div>
	</div>
</div>
