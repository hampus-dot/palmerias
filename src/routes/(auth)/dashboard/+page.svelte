<script lang="ts">
	import {
		TrendingUp,
		Users,
		Target,
		Activity,
		Calendar,
		Trophy,
		Clock,
		MapPin,
		Zap,
		BarChart3,
		Dumbbell,
		Shield,
		Flame,
		Heart,
		Star,
		ArrowUp,
		ArrowDown,
		Percent,
		Timer,
		Medal
	} from 'lucide-svelte';
	import Stat from '$lib/components/ui/stat.svelte';
	import GlowingEffect from '$lib/components/ui/glowing-effect.svelte';
	import { players } from '$lib/data/players';
	import { matches } from '$lib/data/matches';
	import { trainingSessions } from '$lib/data/training';

	// Player Stats
	const totalPlayers = players.length;
	const coaches = players.filter((p) => p.roles.includes('coach')).length;
	const activePlayers = players.filter((p) => p.roles.includes('player')).length;
	const goalkeepers = players.filter((p) => p.position === 'GK').length;
	const defenders = players.filter((p) => p.position === 'DF').length;
	const midfielders = players.filter((p) => p.position === 'MF').length;
	const forwards = players.filter((p) => p.position === 'FW').length;
	const avgAge = (players.reduce((sum, p) => sum + p.age, 0) / players.length).toFixed(1);
	const avgHeight = (players.reduce((sum, p) => sum + p.height, 0) / players.length).toFixed(0);

	// Goal Stats
	const totalGoals = players.reduce((sum, p) => sum + p.goals, 0);
	const totalAssists = players.reduce((sum, p) => sum + p.assists, 0);
	const avgGoalsPerPlayer = (totalGoals / activePlayers).toFixed(1);
	const avgAssistsPerPlayer = (totalAssists / activePlayers).toFixed(1);

	// Match Stats
	const playedMatches = matches.filter((m) => m.result);
	const wins = playedMatches.filter((m) => m.result && m.result.goalsFor > m.result.goalsAgainst)
		.length;
	const draws = playedMatches.filter((m) => m.result && m.result.goalsFor === m.result.goalsAgainst)
		.length;
	const losses = playedMatches.filter((m) => m.result && m.result.goalsFor < m.result.goalsAgainst)
		.length;
	const winRate = playedMatches.length > 0 ? ((wins / playedMatches.length) * 100).toFixed(1) : 0;
	const goalsScored = playedMatches.reduce((sum, m) => sum + (m.result?.goalsFor || 0), 0);
	const goalsConceded = playedMatches.reduce((sum, m) => sum + (m.result?.goalsAgainst || 0), 0);
	const goalDifference = goalsScored - goalsConceded;
	const avgGoalsPerMatch = playedMatches.length > 0 ? (goalsScored / playedMatches.length).toFixed(1) : 0;
	const cleanSheets = playedMatches.filter((m) => m.result && m.result.goalsAgainst === 0).length;

	// Training Stats
	const totalTrainingSessions = trainingSessions.length;
	const avgAttendance = trainingSessions.length > 0
		? (trainingSessions.reduce((sum, s) => sum + s.attendance.length, 0) / trainingSessions.length).toFixed(0)
		: 0;
	const attendanceRate = totalPlayers > 0
		? ((Number(avgAttendance) / totalPlayers) * 100).toFixed(1)
		: 0;

	// Top Performers
	const topScorer = players.sort((a, b) => b.goals - a.goals)[0];
	const topAssister = players.sort((a, b) => b.assists - a.assists)[0];
	const mostAppearances = players.sort((a, b) => b.appearances - a.appearances)[0];

	// Upcoming
	const topScorers = [...players].sort((a, b) => b.goals - a.goals).slice(0, 3);
	const nextMatch = matches.find((m) => !m.result);
	const upcomingTraining = trainingSessions[0];
	const upcomingTrainings = trainingSessions.slice(0, 3);
	const recentMatches = [...matches].filter((m) => m.result).slice(-3);

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<div class="mx-auto max-w-[1920px] p-6 lg:p-8">
		<!-- Header -->
		<div class="mb-8 space-y-2">
			<h1
				class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400"
			>
				Dashboard
			</h1>
			<p class="text-lg text-slate-600 dark:text-slate-400">
				Comprehensive analytics for Palmerias FC
			</p>
		</div>

		<!-- Comprehensive Stats Grid -->
		<div class="mb-8 space-y-6">
			<!-- Team Overview -->
			<div>
				<h2 class="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Team Overview</h2>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Stat
						title="Total Squad"
						value={totalPlayers}
						description="{coaches} coaches"
						icon={Users}
						trend="neutral"
					/>
					<Stat
						title="Active Players"
						value={activePlayers}
						description="Currently playing"
						icon={Star}
						trend="neutral"
					/>
					<Stat
						title="Average Age"
						value="{avgAge} years"
						description="Squad average"
						icon={Activity}
						trend="neutral"
					/>
					<Stat
						title="Avg Height"
						value="{avgHeight} cm"
						description="Physical profile"
						icon={ArrowUp}
						trend="neutral"
					/>
				</div>
			</div>

			<!-- Match Performance -->
			<div>
				<h2 class="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Match Performance</h2>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
					<Stat
						title="Win Rate"
						value="{winRate}%"
						description="{wins} wins"
						icon={Trophy}
						trend="up"
						trendValue="+{wins}W"
					/>
					<Stat
						title="Matches Played"
						value={playedMatches.length}
						description="{draws}D {losses}L"
						icon={Calendar}
						trend="neutral"
					/>
					<Stat
						title="Goals Scored"
						value={goalsScored}
						description="In {playedMatches.length} matches"
						icon={Target}
						trend="up"
						trendValue="+{avgGoalsPerMatch}/game"
					/>
					<Stat
						title="Goals Conceded"
						value={goalsConceded}
						description="Defense record"
						icon={Shield}
						trend={goalsConceded < goalsScored ? 'up' : 'down'}
					/>
					<Stat
						title="Goal Difference"
						value={goalDifference > 0 ? `+${goalDifference}` : goalDifference}
						description="Season difference"
						icon={TrendingUp}
						trend={goalDifference > 0 ? 'up' : goalDifference < 0 ? 'down' : 'neutral'}
					/>
				</div>
			</div>

			<!-- Goal Statistics -->
			<div>
				<h2 class="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Goal Statistics</h2>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Stat
						title="Total Goals"
						value={totalGoals}
						description="Season total"
						icon={Target}
						trend="up"
						trendValue="{avgGoalsPerPlayer} per player"
					/>
					<Stat
						title="Total Assists"
						value={totalAssists}
						description="Team assists"
						icon={Zap}
						trend="up"
						trendValue="{avgAssistsPerPlayer} per player"
					/>
					<Stat
						title="Clean Sheets"
						value={cleanSheets}
						description="Matches without conceding"
						icon={Shield}
						trend="up"
					/>
					<Stat
						title="Goals/Match"
						value={avgGoalsPerMatch}
						description="Average per game"
						icon={Flame}
						trend="up"
					/>
				</div>
			</div>

			<!-- Position Breakdown -->
			<div>
				<h2 class="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Squad Composition</h2>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Stat
						title="Goalkeepers"
						value={goalkeepers}
						description="GK position"
						icon={Shield}
						trend="neutral"
					/>
					<Stat
						title="Defenders"
						value={defenders}
						description="DF position"
						icon={Shield}
						trend="neutral"
					/>
					<Stat
						title="Midfielders"
						value={midfielders}
						description="MF position"
						icon={Activity}
						trend="neutral"
					/>
					<Stat
						title="Forwards"
						value={forwards}
						description="FW position"
						icon={Target}
						trend="neutral"
					/>
				</div>
			</div>

			<!-- Training Stats -->
			<div>
				<h2 class="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Training & Discipline</h2>
				<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Stat
						title="Training Sessions"
						value={totalTrainingSessions}
						description="Total scheduled"
						icon={Dumbbell}
						trend="up"
					/>
					<Stat
						title="Avg Attendance"
						value={avgAttendance}
						description="players per session"
						icon={Users}
						trend="up"
						trendValue="{attendanceRate}%"
					/>
					<Stat
						title="Attendance Rate"
						value="{attendanceRate}%"
						description="Overall participation"
						icon={Percent}
						trend="up"
					/>
				</div>
			</div>

			<!-- Top Performers -->
			<div>
				<h2 class="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Top Performers</h2>
				<div class="grid gap-4 md:grid-cols-3">
					<Stat
						title="Top Scorer"
						value={topScorer.name}
						description="{topScorer.goals} goals this season"
						icon={Medal}
						trend="up"
					>
						<div class="flex items-center gap-2">
							<div class="flex-1">
								<div class="mb-1 flex items-center justify-between text-xs">
									<span class="text-slate-600 dark:text-slate-400">Performance</span>
									<span class="font-semibold text-slate-900 dark:text-white">{topScorer.goals} goals</span>
								</div>
								<div class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
									<div
										class="h-full bg-gradient-to-r from-orange-500 to-red-500"
										style="width: {(topScorer.goals / totalGoals) * 100}%"
									></div>
								</div>
							</div>
						</div>
					</Stat>

					<Stat
						title="Top Assister"
						value={topAssister.name}
						description="{topAssister.assists} assists"
						icon={Zap}
						trend="up"
					>
						<div class="flex items-center gap-2">
							<div class="flex-1">
								<div class="mb-1 flex items-center justify-between text-xs">
									<span class="text-slate-600 dark:text-slate-400">Performance</span>
									<span class="font-semibold text-slate-900 dark:text-white">{topAssister.assists} assists</span>
								</div>
								<div class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
									<div
										class="h-full bg-gradient-to-r from-purple-500 to-blue-500"
										style="width: {(topAssister.assists / totalAssists) * 100}%"
									></div>
								</div>
							</div>
						</div>
					</Stat>

					<Stat
						title="Most Appearances"
						value={mostAppearances.name}
						description="{mostAppearances.appearances} matches"
						icon={Star}
						trend="up"
					>
						<div class="flex items-center gap-2">
							<div class="flex-1">
								<div class="mb-1 flex items-center justify-between text-xs">
									<span class="text-slate-600 dark:text-slate-400">Played</span>
									<span class="font-semibold text-slate-900 dark:text-white">{mostAppearances.appearances} games</span>
								</div>
								<div class="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
									<div
										class="h-full bg-gradient-to-r from-green-500 to-emerald-500"
										style="width: {(mostAppearances.appearances / playedMatches.length) * 100}%"
									></div>
								</div>
							</div>
						</div>
					</Stat>
				</div>
			</div>
		</div>

		<!-- Glowing Grid Layout -->
		<ul
			class="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-6 xl:max-h-[48rem] xl:grid-rows-2"
		>
			<!-- Total Players Card -->
			<li class="min-h-[16rem] list-none md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]">
				<div class="relative h-full rounded-2xl border border-slate-200 p-2 dark:border-slate-800 md:rounded-3xl md:p-3">
					<GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
					<div
						class="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-slate-100 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-8"
					>
						<div class="relative flex flex-1 flex-col justify-between gap-4">
							<div class="w-fit rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950">
								<Users class="h-6 w-6 text-blue-600 dark:text-blue-400" />
							</div>
							<div class="space-y-3">
								<h3
									class="font-sans text-2xl font-semibold text-balance text-slate-900 md:text-3xl dark:text-white"
								>
									Team Overview
								</h3>
								<div class="grid grid-cols-2 gap-4">
									<div>
										<p class="text-sm text-slate-600 dark:text-slate-400">Players</p>
										<p class="text-4xl font-bold text-blue-600 dark:text-blue-400">
											{totalPlayers}
										</p>
									</div>
									<div>
										<p class="text-sm text-slate-600 dark:text-slate-400">Coaches</p>
										<p class="text-4xl font-bold text-purple-600 dark:text-purple-400">
											{coaches}
										</p>
									</div>
								</div>
								<p class="text-sm text-slate-600 dark:text-slate-400">
									{#if upcomingTraining}
										<span class="font-semibold text-green-600 dark:text-green-400">{upcomingTraining.attendance.length}</span> attending
										next training
									{/if}
								</p>
							</div>
						</div>
					</div>
				</div>
			</li>

			<!-- Win Rate Card -->
			<li class="min-h-[16rem] list-none md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]">
				<div class="relative h-full rounded-2xl border border-slate-200 p-2 dark:border-slate-800 md:rounded-3xl md:p-3">
					<GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
					<div
						class="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-slate-100 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-8"
					>
						<div class="relative flex flex-1 flex-col justify-between gap-4">
							<div class="w-fit rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
								<TrendingUp class="h-6 w-6 text-green-600 dark:text-green-400" />
							</div>
							<div class="space-y-3">
								<h3
									class="font-sans text-2xl font-semibold text-balance text-slate-900 md:text-3xl dark:text-white"
								>
									Win Rate
								</h3>
								<div class="flex items-baseline gap-2">
									<p class="text-5xl font-bold text-green-600 dark:text-green-400">
										{winRate}%
									</p>
									<span class="text-sm font-medium text-green-600 dark:text-green-400">↑ {wins}W-{draws}D-{losses}L</span>
								</div>
								<div class="flex gap-2">
									{#each recentMatches as match}
										<div
											class="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800"
										>
											<p class="text-xs text-slate-600 dark:text-slate-400">{match.opponent}</p>
											{#if match.result}
												<p
													class="text-sm font-semibold {match.result.goalsFor > match.result.goalsAgainst
														? 'text-green-600 dark:text-green-400'
														: match.result.goalsFor < match.result.goalsAgainst
															? 'text-red-600 dark:text-red-400'
															: 'text-yellow-600 dark:text-yellow-400'}"
												>
													{match.result.goalsFor > match.result.goalsAgainst ? 'W' : match.result.goalsFor < match.result.goalsAgainst ? 'L' : 'D'} {match.result.goalsFor}-{match.result.goalsAgainst}
												</p>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>

			<!-- Next Match Card -->
			{#if nextMatch}
				<li class="min-h-[16rem] list-none md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]">
					<div class="relative h-full rounded-2xl border border-slate-200 p-2 dark:border-slate-800 md:rounded-3xl md:p-3">
						<GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
						<div
							class="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:border-slate-800 dark:from-blue-950/30 dark:to-purple-950/30 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-8"
						>
							<div class="relative flex flex-1 flex-col gap-4">
								<div class="flex items-center justify-between">
									<div class="w-fit rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-900 dark:bg-purple-950">
										<Trophy class="h-6 w-6 text-purple-600 dark:text-purple-400" />
									</div>
									<span
										class="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white dark:bg-blue-500"
									>
										{nextMatch.homeAway}
									</span>
								</div>
								<div class="space-y-4">
									<h3
										class="font-sans text-2xl font-semibold text-balance text-slate-900 md:text-3xl dark:text-white"
									>
										Next Match
									</h3>
									<div class="flex items-center justify-center gap-6 rounded-2xl bg-white/60 py-8 dark:bg-slate-900/60">
										<div class="text-center">
											<p class="text-3xl font-bold text-slate-900 dark:text-white">Palmerias</p>
											<p class="text-sm text-slate-500 dark:text-slate-400">FC</p>
										</div>
										<div class="text-4xl font-bold text-slate-400 dark:text-slate-600">VS</div>
										<div class="text-center">
											<p class="text-3xl font-bold text-slate-900 dark:text-white">
												{nextMatch.opponent}
											</p>
											<p class="text-sm text-slate-500 dark:text-slate-400">FC</p>
										</div>
									</div>
									<div class="grid grid-cols-2 gap-3">
										<div class="flex items-center gap-2 rounded-lg bg-white/60 p-3 dark:bg-slate-900/60">
											<Calendar class="h-5 w-5 text-blue-600 dark:text-blue-400" />
											<div>
												<p class="text-xs text-slate-600 dark:text-slate-400">Date</p>
												<p class="font-semibold text-slate-900 dark:text-white">
													{formatDate(nextMatch.date)}
												</p>
											</div>
										</div>
										<div class="flex items-center gap-2 rounded-lg bg-white/60 p-3 dark:bg-slate-900/60">
											<Clock class="h-5 w-5 text-purple-600 dark:text-purple-400" />
											<div>
												<p class="text-xs text-slate-600 dark:text-slate-400">Time</p>
												<p class="font-semibold text-slate-900 dark:text-white">
													{nextMatch.time}
												</p>
											</div>
										</div>
									</div>
									<div class="flex items-center gap-2 rounded-lg bg-white/60 p-3 dark:bg-slate-900/60">
										<MapPin class="h-5 w-5 text-green-600 dark:text-green-400" />
										<div>
											<p class="text-xs text-slate-600 dark:text-slate-400">Location</p>
											<p class="font-semibold text-slate-900 dark:text-white">
												{nextMatch.location}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>
			{/if}

			<!-- Goals & Performance Card -->
			<li class="min-h-[16rem] list-none md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]">
				<div class="relative h-full rounded-2xl border border-slate-200 p-2 dark:border-slate-800 md:rounded-3xl md:p-3">
					<GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
					<div
						class="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-slate-100 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-8"
					>
						<div class="relative flex flex-1 flex-col justify-between gap-4">
							<div class="w-fit rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-900 dark:bg-orange-950">
								<Target class="h-6 w-6 text-orange-600 dark:text-orange-400" />
							</div>
							<div class="space-y-3">
								<h3
									class="font-sans text-2xl font-semibold text-balance text-slate-900 md:text-3xl dark:text-white"
								>
									Season Performance
								</h3>
								<div class="grid grid-cols-2 gap-4">
									<div>
										<p class="text-sm text-slate-600 dark:text-slate-400">Total Goals</p>
										<p class="text-4xl font-bold text-orange-600 dark:text-orange-400">
											{totalGoals}
										</p>
									</div>
									<div>
										<p class="text-sm text-slate-600 dark:text-slate-400">Training Sessions</p>
										<p class="text-4xl font-bold text-cyan-600 dark:text-cyan-400">
											{trainingSessions.length}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>

			<!-- Top Scorers Card -->
			<li class="min-h-[16rem] list-none md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]">
				<div class="relative h-full rounded-2xl border border-slate-200 p-2 dark:border-slate-800 md:rounded-3xl md:p-3">
					<GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
					<div
						class="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border border-slate-100 bg-white/80 p-6 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/50 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-8"
					>
						<div class="relative flex flex-1 flex-col gap-4">
							<div class="flex items-center justify-between">
								<div class="w-fit rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950">
									<Zap class="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
								</div>
								<BarChart3 class="h-6 w-6 text-slate-400 dark:text-slate-600" />
							</div>
							<div class="space-y-4">
								<h3
									class="font-sans text-2xl font-semibold text-balance text-slate-900 md:text-3xl dark:text-white"
								>
									Top Scorers
								</h3>
								<div class="space-y-3">
									{#each topScorers as player, index}
										<div
											class="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-700 dark:hover:bg-blue-950"
										>
											<div
												class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white"
											>
												{index + 1}
											</div>
											<div class="flex flex-1 items-center justify-between">
												<div>
													<div class="font-semibold text-slate-900 dark:text-white">
														{player.name}
													</div>
													<div class="text-sm text-slate-600 dark:text-slate-400">
														#{player.number} • {player.position}
													</div>
												</div>
												<div class="text-right">
													<div class="text-2xl font-bold text-slate-900 dark:text-white">
														{player.goals}
													</div>
													<div class="text-xs text-slate-600 dark:text-slate-400">
														{player.assists} assists
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			</li>
		</ul>

		<!-- Upcoming Training Sessions -->
		<div class="mt-6">
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 md:p-8">
				<div class="mb-6 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-slate-900 dark:text-white">Upcoming Training</h2>
					<Dumbbell class="h-6 w-6 text-slate-400 dark:text-slate-600" />
				</div>
				<div class="grid gap-4 md:grid-cols-3">
					{#each upcomingTrainings as training}
						<div
							class="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-blue-300 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-700 dark:hover:bg-blue-950"
						>
							<div class="mb-3 flex items-center justify-between">
								<span
									class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300"
								>
									{training.type}
								</span>
								<span class="text-sm font-medium text-slate-600 dark:text-slate-400">
									{training.attendance.length} attending
								</span>
							</div>
							<div class="space-y-1">
								<p class="font-semibold text-slate-900 dark:text-white">
									{formatDate(training.date)}
								</p>
								<p class="text-sm text-slate-600 dark:text-slate-400">{training.time}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
