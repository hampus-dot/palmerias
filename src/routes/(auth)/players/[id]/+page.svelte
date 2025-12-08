<script lang="ts">
	import { page } from '$app/stores';
	import { players } from '$lib/data/players';
	import { matches } from '$lib/data/matches';
	import { trainingSessions } from '$lib/data/training';
	import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Trophy, Target, TrendingUp, Activity } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table';
	import { Chart, BarChart } from 'layerchart';
	import { scaleBand } from 'd3-scale';

	const playerId = $derived($page.params.id);
	const player = $derived(players.find((p) => p.id === playerId));

	// Mock performance data - in real app would come from API
	const performanceData = $derived.by(() => {
		if (!player) return [];
		return [
			{ month: 'Jan', goals: Math.floor(player.goals * 0.2), assists: Math.floor(player.assists * 0.2) },
			{ month: 'Feb', goals: Math.floor(player.goals * 0.15), assists: Math.floor(player.assists * 0.25) },
			{ month: 'Mar', goals: Math.floor(player.goals * 0.25), assists: Math.floor(player.assists * 0.2) },
			{ month: 'Apr', goals: Math.floor(player.goals * 0.2), assists: Math.floor(player.assists * 0.15) },
			{ month: 'May', goals: Math.floor(player.goals * 0.2), assists: Math.floor(player.assists * 0.2) }
		];
	});

	const attendedSessions = $derived(trainingSessions.filter((s) => player && s.attendance.includes(player.id)));
	const attendanceRate = $derived(
		player ? ((attendedSessions.length / trainingSessions.length) * 100).toFixed(1) : 0
	);
</script>

{#if !player}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<h1 class="text-2xl font-bold text-slate-900 dark:text-white">Player not found</h1>
			<button
				onclick={() => goto('/players')}
				class="mt-4 text-blue-600 hover:text-blue-700 dark:text-blue-400"
			>
				← Back to Players
			</button>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
		<div class="mx-auto max-w-[1920px] p-6 lg:p-8">
			<!-- Back Button -->
			<button
				onclick={() => goto('/players')}
				class="mb-6 flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
			>
				<ArrowLeft class="h-5 w-5" />
				Back to Players
			</button>

			<!-- Player Header -->
			<div class="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
				<div class="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
					<div class="flex items-start gap-6">
						<div class="flex h-32 w-32 items-center justify-center rounded-full bg-white text-5xl font-bold text-blue-600">
							{player.name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</div>
						<div class="flex-1 text-white">
							<div class="mb-2 flex items-center gap-3">
								<h1 class="text-4xl font-bold">{player.name}</h1>
								<span class="rounded-full bg-white/20 px-4 py-1 text-2xl font-bold">
									#{player.number}
								</span>
							</div>
							<div class="flex flex-wrap gap-4">
								<span class="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold">
									{player.position}
								</span>
								{#each player.roles as role}
									<span class="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold capitalize">
										{role}
									</span>
								{/each}
							</div>
						</div>
					</div>
				</div>

				<div class="grid gap-6 p-8 md:grid-cols-3">
					<div class="space-y-3">
						<h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
							Personal Info
						</h3>
						<div class="space-y-2">
							<div class="flex items-center gap-2 text-slate-900 dark:text-white">
								<Calendar class="h-4 w-4 text-slate-400" />
								<span>Age: {player.age} years</span>
							</div>
							<div class="flex items-center gap-2 text-slate-900 dark:text-white">
								<MapPin class="h-4 w-4 text-slate-400" />
								<span>{player.nationality}</span>
							</div>
						</div>
					</div>

					<div class="space-y-3">
						<h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
							Physical
						</h3>
						<div class="space-y-2">
							<div class="text-slate-900 dark:text-white">Height: {player.height} cm</div>
							<div class="text-slate-900 dark:text-white">Weight: {player.weight} kg</div>
						</div>
					</div>

					<div class="space-y-3">
						<h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
							Preferred Foot
						</h3>
						<div class="text-slate-900 dark:text-white">{player.preferredFoot}</div>
					</div>
				</div>
			</div>

			<!-- Stats Grid -->
			<div class="mb-8 grid gap-4 md:grid-cols-4">
				<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-slate-600 dark:text-slate-400">Goals</p>
							<p class="text-4xl font-bold text-orange-600 dark:text-orange-400">{player.goals}</p>
						</div>
						<Target class="h-10 w-10 text-orange-600 dark:text-orange-400" />
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-slate-600 dark:text-slate-400">Assists</p>
							<p class="text-4xl font-bold text-purple-600 dark:text-purple-400">{player.assists}</p>
						</div>
						<TrendingUp class="h-10 w-10 text-purple-600 dark:text-purple-400" />
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-slate-600 dark:text-slate-400">Appearances</p>
							<p class="text-4xl font-bold text-blue-600 dark:text-blue-400">
								{player.appearances}
							</p>
						</div>
						<Trophy class="h-10 w-10 text-blue-600 dark:text-blue-400" />
					</div>
				</div>

				<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
					<div class="flex items-center justify-between">
						<div>
							<p class="text-sm text-slate-600 dark:text-slate-400">Attendance</p>
							<p class="text-4xl font-bold text-green-600 dark:text-green-400">{attendanceRate}%</p>
						</div>
						<Activity class="h-10 w-10 text-green-600 dark:text-green-400" />
					</div>
				</div>
			</div>

			<!-- Performance Chart & Training Attendance -->
			<div class="grid gap-6 lg:grid-cols-2">
				<!-- Performance Chart -->
				<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
					<h2 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">
						Monthly Performance
					</h2>
					<div class="h-[300px]">
						<Chart
							data={performanceData}
							x="month"
							xScale={scaleBand().padding(0.4)}
							y="goals"
							padding={{ left: 16, bottom: 24 }}
						>
							<BarChart
								radius={4}
								getClass={() => 'fill-blue-600 dark:fill-blue-400'}
							/>
						</Chart>
					</div>
				</div>

				<!-- Training Attendance -->
				<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
					<h2 class="mb-6 text-xl font-bold text-slate-900 dark:text-white">
						Training Attendance
					</h2>
					<div class="space-y-3">
						<div class="flex justify-between text-sm">
							<span class="text-slate-600 dark:text-slate-400">Sessions Attended</span>
							<span class="font-semibold text-slate-900 dark:text-white">
								{attendedSessions.length} / {trainingSessions.length}
							</span>
						</div>
						<div class="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
							<div
								class="h-full bg-gradient-to-r from-green-600 to-blue-600"
								style="width: {attendanceRate}%"
							></div>
						</div>
						<div class="mt-6 space-y-2">
							{#each attendedSessions.slice(0, 5) as session}
								<div class="flex items-center justify-between rounded-lg bg-slate-50 p-3 dark:bg-slate-800">
									<div>
										<div class="font-medium text-slate-900 dark:text-white">{session.type}</div>
										<div class="text-sm text-slate-600 dark:text-slate-400">
											{new Date(session.date).toLocaleDateString()}
										</div>
									</div>
									<div class="text-sm text-green-600 dark:text-green-400">✓ Attended</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
