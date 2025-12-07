<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { matches } from '$lib/data/matches';
	import { trainingSessions } from '$lib/data/training';
	import { cn } from '$lib/utils';

	let availability = $state<Record<string, 'yes' | 'no' | 'maybe'>>({});

	function logout() {
		localStorage.removeItem('user');
		goto('/');
	}

	function setAvailability(eventId: number, type: 'training' | 'match', status: 'yes' | 'no' | 'maybe') {
		const key = `${type}-${eventId}`;
		availability[key] = status;
		// In real app, would save to database
		console.log('Availability updated:', { eventId, type, status });
	}

	const upcomingMatches = matches.filter((m) => !m.result);
	const upcomingTrainings = trainingSessions.slice(0, 4);
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-900">
	<!-- Header -->
	<header class="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-bold text-slate-900 dark:text-white">Player Dashboard</h1>
					<p class="text-sm text-slate-600 dark:text-slate-400">Your schedule and availability</p>
				</div>
				<div class="flex items-center gap-3">
					<ThemeToggle />
					<button
						onclick={logout}
						class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Upcoming Trainings -->
		<Card title="Upcoming Trainings" description="Mark your availability">
			<div class="space-y-4">
				{#each upcomingTrainings as training}
					{@const key = `training-${training.id}`}
					<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800">
						<div class="mb-3 flex items-start justify-between">
							<div>
								<h3 class="font-semibold text-slate-900 dark:text-white">{training.type}</h3>
								<p class="text-sm text-slate-600 dark:text-slate-400">
									{new Date(training.date).toLocaleDateString('en-US')} • {training.time}
								</p>
								<p class="text-sm text-slate-600 dark:text-slate-400">{training.location}</p>
								{#if training.notes}
									<p class="mt-1 text-sm text-slate-500 dark:text-slate-500">{training.notes}</p>
								{/if}
							</div>
						</div>

						<div class="flex gap-2">
							<button
								onclick={() => setAvailability(training.id, 'training', 'yes')}
								class={cn(
									'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
									availability[key] === 'yes'
										? 'bg-green-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-green-100'
								)}
							>
								✓ Available
							</button>
							<button
								onclick={() => setAvailability(training.id, 'training', 'maybe')}
								class={cn(
									'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
									availability[key] === 'maybe'
										? 'bg-yellow-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-yellow-100'
								)}
							>
								? Maybe
							</button>
							<button
								onclick={() => setAvailability(training.id, 'training', 'no')}
								class={cn(
									'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
									availability[key] === 'no'
										? 'bg-red-600 text-white'
										: 'bg-slate-100 text-slate-700 hover:bg-red-100'
								)}
							>
								✗ Not Available
							</button>
						</div>
					</div>
				{/each}
			</div>
		</Card>

		<!-- Upcoming Matches -->
		<div class="mt-8">
			<Card title="Upcoming Matches" description="Mark your availability">
				<div class="space-y-4">
					{#each upcomingMatches as match}
						{@const key = `match-${match.id}`}
						<div class="rounded-lg border border-slate-200 p-4 dark:border-slate-700 dark:bg-slate-800">
							<div class="mb-3 flex items-start justify-between">
								<div>
									<h3 class="font-semibold text-slate-900 dark:text-white">
										Palmerias vs {match.opponent}
									</h3>
									<p class="text-sm text-slate-600 dark:text-slate-400">
										{new Date(match.date).toLocaleDateString('en-US')} • {match.time}
									</p>
									<p class="text-sm text-slate-600 dark:text-slate-400">{match.location}</p>
									<span
										class={cn(
											'mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium',
											match.homeAway === 'Home'
												? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
												: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
										)}
									>
										{match.homeAway}
									</span>
								</div>
							</div>

							<div class="flex gap-2">
								<button
									onclick={() => setAvailability(match.id, 'match', 'yes')}
									class={cn(
										'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
										availability[key] === 'yes'
											? 'bg-green-600 text-white'
											: 'bg-slate-100 text-slate-700 hover:bg-green-100'
									)}
								>
									✓ Available
								</button>
								<button
									onclick={() => setAvailability(match.id, 'match', 'maybe')}
									class={cn(
										'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
										availability[key] === 'maybe'
											? 'bg-yellow-600 text-white'
											: 'bg-slate-100 text-slate-700 hover:bg-yellow-100'
									)}
								>
									? Maybe
								</button>
								<button
									onclick={() => setAvailability(match.id, 'match', 'no')}
									class={cn(
										'flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all',
										availability[key] === 'no'
											? 'bg-red-600 text-white'
											: 'bg-slate-100 text-slate-700 hover:bg-red-100'
									)}
								>
									✗ Not Available
								</button>
							</div>
						</div>
					{/each}
				</div>
			</Card>
		</div>

		<!-- Quick links -->
		<div class="mt-8">
			<Card title="Quick Links">
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<a
						href="/dashboard/players"
						class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-slate-700"
					>
						<p class="font-medium text-slate-900 dark:text-white">Team</p>
					</a>
					<a
						href="/dashboard/matches"
						class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-slate-700"
					>
						<p class="font-medium text-slate-900 dark:text-white">Matches</p>
					</a>
					<a
						href="/dashboard/stats"
						class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-slate-700"
					>
						<p class="font-medium text-slate-900 dark:text-white">Statistics</p>
					</a>
					<a
						href="/dashboard/training"
						class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600 dark:hover:bg-slate-700"
					>
						<p class="font-medium text-slate-900 dark:text-white">All Trainings</p>
					</a>
				</div>
			</Card>
		</div>
	</div>
</div>
