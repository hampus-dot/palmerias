<script lang="ts">
	import { BarChart, Chart } from 'layerchart';
	import { scaleBand } from 'd3-scale';
	import { players } from '$lib/data/players';
	import { matches } from '$lib/data/matches';
	import { trainingSessions } from '$lib/data/training';
	import { TrendingUp, Users, Target, Activity } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';

	// Goals per player data
	const goalsData = players
		.filter((p) => p.goals > 0)
		.sort((a, b) => b.goals - a.goals)
		.slice(0, 10)
		.map((p) => ({
			name: p.name.split(' ')[0],
			goals: p.goals,
			assists: p.assists
		}));

	// Match results over time
	const matchResults = matches
		.filter((m) => m.result)
		.slice(-10)
		.map((m, i) => ({
			match: `Match ${i + 1}`,
			goalsFor: m.result!.goalsFor,
			goalsAgainst: m.result!.goalsAgainst,
			opponent: m.opponent.split(' ')[0]
		}));

	// Training attendance over time
	const attendanceData = trainingSessions.slice(0, 8).map((s, i) => ({
		session: `Session ${i + 1}`,
		attendance: s.attendance.length,
		total: players.length
	}));

	// Position distribution
	const positionData = [
		{ position: 'GK', count: players.filter((p) => p.position === 'GK').length },
		{ position: 'DF', count: players.filter((p) => p.position === 'DF').length },
		{ position: 'MF', count: players.filter((p) => p.position === 'MF').length },
		{ position: 'FW', count: players.filter((p) => p.position === 'FW').length }
	];

	// Calculate stats
	const totalGoals = players.reduce((sum, p) => sum + p.goals, 0);
	const totalAssists = players.reduce((sum, p) => sum + p.assists, 0);
	const avgAge = (players.reduce((sum, p) => sum + p.age, 0) / players.length).toFixed(1);
	const completedMatches = matches.filter((m) => m.result).length;
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<div class="mx-auto max-w-[1920px] p-6 lg:p-8">
		<!-- Header -->
		<div class="mb-8 space-y-2">
			<h1
				class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400"
			>
				Statistics & Analytics
			</h1>
			<p class="text-lg text-slate-600 dark:text-slate-400">
				Comprehensive team performance insights
			</p>
		</div>

		<!-- Key Stats -->
		<div class="mb-8 grid gap-4 md:grid-cols-4">
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Total Goals</p>
						<p class="text-3xl font-bold text-orange-600 dark:text-orange-400">{totalGoals}</p>
					</div>
					<Target class="h-8 w-8 text-orange-600 dark:text-orange-400" />
				</div>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Total Assists</p>
						<p class="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalAssists}</p>
					</div>
					<TrendingUp class="h-8 w-8 text-purple-600 dark:text-purple-400" />
				</div>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Avg Age</p>
						<p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{avgAge}</p>
					</div>
					<Users class="h-8 w-8 text-blue-600 dark:text-blue-400" />
				</div>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Matches Played</p>
						<p class="text-3xl font-bold text-green-600 dark:text-green-400">
							{completedMatches}
						</p>
					</div>
					<Activity class="h-8 w-8 text-green-600 dark:text-green-400" />
				</div>
			</div>
		</div>

		<!-- Charts Grid -->
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Top Scorers Chart -->
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<h2 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">Top Goal Scorers</h2>
				<div class="h-[400px]">
					<Chart
						data={goalsData}
						x="name"
						xScale={scaleBand().padding(0.4)}
						y="goals"
						r="assists"
						tooltip={{ mode: 'bisect-x' }}
						padding={{ left: 16, bottom: 24 }}
					>
						<BarChart
							radius={4}
							strokeWidth={1}
							getClass={(d) => 'fill-blue-600 dark:fill-blue-400'}
						/>
					</Chart>
				</div>
			</div>

			<!-- Match Performance Chart -->
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<h2 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">
					Recent Match Performance
				</h2>
				<div class="h-[400px]">
					<Chart
						data={matchResults}
						x="match"
						xScale={scaleBand().padding(0.4)}
						y={(d) => Math.max(d.goalsFor, d.goalsAgainst)}
						padding={{ left: 16, bottom: 24 }}
					>
						<BarChart
							y="goalsFor"
							radius={4}
							getClass={() => 'fill-green-600 dark:fill-green-400'}
						/>
					</Chart>
				</div>
			</div>

			<!-- Training Attendance Chart -->
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<h2 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">
					Training Attendance Trend
				</h2>
				<div class="h-[400px]">
					<Chart
						data={attendanceData}
						x="session"
						xScale={scaleBand().padding(0.4)}
						y="attendance"
						padding={{ left: 16, bottom: 24 }}
					>
						<BarChart
							radius={4}
							getClass={() => 'fill-purple-600 dark:fill-purple-400'}
						/>
					</Chart>
				</div>
			</div>

			<!-- Position Distribution Chart -->
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<h2 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">
					Squad Position Distribution
				</h2>
				<div class="h-[400px]">
					<Chart
						data={positionData}
						x="position"
						xScale={scaleBand().padding(0.4)}
						y="count"
						padding={{ left: 16, bottom: 24 }}
					>
						<BarChart
							radius={4}
							getClass={() => 'fill-orange-600 dark:fill-orange-400'}
						/>
					</Chart>
				</div>
			</div>
		</div>

		<!-- Detailed Stats Table -->
		<div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
			<h2 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">
				Player Performance Breakdown
			</h2>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Player</Table.Head>
						<Table.Head>Position</Table.Head>
						<Table.Head class="text-end">Goals</Table.Head>
						<Table.Head class="text-end">Assists</Table.Head>
						<Table.Head class="text-end">G+A</Table.Head>
						<Table.Head class="text-end">Contribution %</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each players.sort((a, b) => b.goals + b.assists - (a.goals + a.assists)).slice(0, 15) as player}
						{@const contribution = (((player.goals + player.assists) / (totalGoals + totalAssists)) * 100).toFixed(1)}
						<Table.Row>
							<Table.Cell class="font-medium">{player.name}</Table.Cell>
							<Table.Cell>
								<span class="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
									{player.position}
								</span>
							</Table.Cell>
							<Table.Cell class="text-end font-bold text-orange-600 dark:text-orange-400">
								{player.goals}
							</Table.Cell>
							<Table.Cell class="text-end font-bold text-purple-600 dark:text-purple-400">
								{player.assists}
							</Table.Cell>
							<Table.Cell class="text-end font-bold">{player.goals + player.assists}</Table.Cell>
							<Table.Cell class="text-end">
								<div class="flex items-center justify-end gap-2">
									<div class="h-2 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
										<div
											class="h-full bg-gradient-to-r from-blue-600 to-purple-600"
											style="width: {contribution}%"
										></div>
									</div>
									<span class="text-sm font-medium">{contribution}%</span>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</div>
