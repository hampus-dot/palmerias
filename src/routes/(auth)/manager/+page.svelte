<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import { players } from '$lib/data/players';
	import { matches } from '$lib/data/matches';
	import { trainingSessions } from '$lib/data/training';
	import { onMount } from 'svelte';

	let showCreateTraining = $state(false);
	let showCreateMatch = $state(false);

	// New training form
	let newTraining = $state({
		date: '',
		time: '',
		location: 'Palmeriavallen',
		type: 'Lagtränning' as 'Lagtränning' | 'Matchförberedelse' | 'Taktik' | 'Fysträning',
		notes: ''
	});

	// New match form
	let newMatch = $state({
		date: '',
		time: '',
		opponent: '',
		homeAway: 'Hemma' as 'Hemma' | 'Borta',
		location: 'Palmeriavallen'
	});

	function logout() {
		localStorage.removeItem('user');
		goto('/');
	}

	function createTraining() {
		console.log('Creating training:', newTraining);
		// In real app, would save to database
		showCreateTraining = false;
		// Reset form
		newTraining = {
			date: '',
			time: '',
			location: 'Palmeriavallen',
			type: 'Lagtränning',
			notes: ''
		};
	}

	function createMatch() {
		console.log('Creating match:', newMatch);
		// In real app, would save to database
		showCreateMatch = false;
		// Reset form
		newMatch = {
			date: '',
			time: '',
			opponent: '',
			homeAway: 'Hemma',
			location: 'Palmeriavallen'
		};
	}

	const totalPlayers = players.length;
	const upcomingMatches = matches.filter((m) => !m.result).length;
	const upcomingTrainings = trainingSessions.length;
</script>

<div class="min-h-screen bg-slate-50">
	<!-- Header -->
	<header class="border-b border-slate-200 bg-white">
		<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between">
				<div>
					<h1 class="text-2xl font-bold text-slate-900">Manager Dashboard</h1>
					<p class="text-sm text-slate-600">Manage your team</p>
				</div>
				<button
					onclick={logout}
					class="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
				>
					Logout
				</button>
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Quick stats -->
		<div class="mb-8 grid gap-6 sm:grid-cols-3">
			<Card>
				<div class="text-center">
					<p class="text-sm font-medium text-slate-600">Total Players</p>
					<p class="mt-2 text-3xl font-bold text-slate-900">{totalPlayers}</p>
				</div>
			</Card>
			<Card>
				<div class="text-center">
					<p class="text-sm font-medium text-slate-600">Upcoming Matches</p>
					<p class="mt-2 text-3xl font-bold text-slate-900">{upcomingMatches}</p>
				</div>
			</Card>
			<Card>
				<div class="text-center">
					<p class="text-sm font-medium text-slate-600">Scheduled Trainings</p>
					<p class="mt-2 text-3xl font-bold text-slate-900">{upcomingTrainings}</p>
				</div>
			</Card>
		</div>

		<!-- Actions -->
		<div class="mb-8 grid gap-6 sm:grid-cols-2">
			<Card title="Create Training" description="Schedule a new training session">
				<button
					onclick={() => (showCreateTraining = true)}
					class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
				>
					+ New Training Session
				</button>
			</Card>

			<Card title="Create Match" description="Schedule a new match">
				<button
					onclick={() => (showCreateMatch = true)}
					class="w-full rounded-lg bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700"
				>
					+ New Match
				</button>
			</Card>
		</div>

		<!-- Quick links -->
		<Card title="Quick Links">
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<a
					href="/dashboard/players"
					class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50"
				>
					<p class="font-medium text-slate-900">Players</p>
				</a>
				<a
					href="/dashboard/training"
					class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50"
				>
					<p class="font-medium text-slate-900">Trainings</p>
				</a>
				<a
					href="/dashboard/matches"
					class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50"
				>
					<p class="font-medium text-slate-900">Matches</p>
				</a>
				<a
					href="/dashboard/stats"
					class="rounded-lg border border-slate-200 p-4 text-center transition-all hover:border-blue-500 hover:bg-blue-50"
				>
					<p class="font-medium text-slate-900">Statistics</p>
				</a>
			</div>
		</Card>
	</div>
</div>

<!-- Create Training Modal -->
{#if showCreateTraining}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div class="w-full max-w-2xl rounded-2xl bg-white p-8">
			<h2 class="mb-6 text-2xl font-bold text-slate-900">Create Training Session</h2>

			<form onsubmit={(e) => { e.preventDefault(); createTraining(); }} class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label class="block text-sm font-medium text-slate-700">Date</label>
						<input
							type="date"
							bind:value={newTraining.date}
							class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-slate-700">Time</label>
						<input
							type="text"
							bind:value={newTraining.time}
							placeholder="18:00 - 20:00"
							class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium text-slate-700">Type</label>
					<select
						bind:value={newTraining.type}
						class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
					>
						<option value="Lagtränning">Lagtränning</option>
						<option value="Matchförberedelse">Matchförberedelse</option>
						<option value="Taktik">Taktik</option>
						<option value="Fysträning">Fysträning</option>
					</select>
				</div>

				<div>
					<label class="block text-sm font-medium text-slate-700">Location</label>
					<input
						type="text"
						bind:value={newTraining.location}
						class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-slate-700">Notes</label>
					<textarea
						bind:value={newTraining.notes}
						rows="3"
						class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
					></textarea>
				</div>

				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
					>
						Create Training
					</button>
					<button
						type="button"
						onclick={() => (showCreateTraining = false)}
						class="flex-1 rounded-lg bg-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-300"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- Create Match Modal -->
{#if showCreateMatch}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div class="w-full max-w-2xl rounded-2xl bg-white p-8">
			<h2 class="mb-6 text-2xl font-bold text-slate-900">Create Match</h2>

			<form onsubmit={(e) => { e.preventDefault(); createMatch(); }} class="space-y-4">
				<div class="grid gap-4 sm:grid-cols-2">
					<div>
						<label class="block text-sm font-medium text-slate-700">Date</label>
						<input
							type="date"
							bind:value={newMatch.date}
							class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<div>
						<label class="block text-sm font-medium text-slate-700">Time</label>
						<input
							type="text"
							bind:value={newMatch.time}
							placeholder="15:00"
							class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
				</div>

				<div>
					<label class="block text-sm font-medium text-slate-700">Opponent</label>
					<input
						type="text"
						bind:value={newMatch.opponent}
						class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-slate-700">Home/Away</label>
					<select
						bind:value={newMatch.homeAway}
						class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
					>
						<option value="Hemma">Hemma</option>
						<option value="Borta">Borta</option>
					</select>
				</div>

				<div>
					<label class="block text-sm font-medium text-slate-700">Location</label>
					<input
						type="text"
						bind:value={newMatch.location}
						class="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div class="flex gap-4">
					<button
						type="submit"
						class="flex-1 rounded-lg bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700"
					>
						Create Match
					</button>
					<button
						type="button"
						onclick={() => (showCreateMatch = false)}
						class="flex-1 rounded-lg bg-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-300"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
