<script lang="ts">
	import { Calendar, Clock, MapPin, Trophy, Plus, Edit2, Trash2, TrendingUp } from 'lucide-svelte';
	import { matches } from '$lib/data/matches';
	import * as Table from '$lib/components/ui/table';

	let allMatches = $state([...matches]);
	let showAddModal = $state(false);
	let filterType = $state('all'); // 'all', 'upcoming', 'completed'

	let newMatch = $state({
		date: '',
		time: '',
		opponent: '',
		homeAway: 'Home' as 'Home' | 'Away',
		location: ''
	});

	const filteredMatches = $derived.by(() => {
		if (filterType === 'upcoming') {
			return allMatches.filter((m) => !m.result);
		} else if (filterType === 'completed') {
			return allMatches.filter((m) => m.result);
		}
		return allMatches;
	});

	const stats = $derived.by(() => {
		const completed = allMatches.filter((m) => m.result);
		const wins = completed.filter((m) => m.result && m.result.goalsFor > m.result.goalsAgainst).length;
		const draws = completed.filter((m) => m.result && m.result.goalsFor === m.result.goalsAgainst).length;
		const losses = completed.filter((m) => m.result && m.result.goalsFor < m.result.goalsAgainst).length;
		const totalGoals = completed.reduce((sum, m) => sum + (m.result?.goalsFor || 0), 0);

		return { wins, draws, losses, totalGoals, played: completed.length };
	});

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}

	function handleAddMatch() {
		console.log('Adding match:', newMatch);
		showAddModal = false;
		resetForm();
	}

	function resetForm() {
		newMatch = {
			date: '',
			time: '',
			opponent: '',
			homeAway: 'Home',
			location: ''
		};
	}

	function getResultClass(match: any) {
		if (!match.result) return '';
		const { goalsFor, goalsAgainst } = match.result;
		if (goalsFor > goalsAgainst) return 'bg-green-50 dark:bg-green-950';
		if (goalsFor < goalsAgainst) return 'bg-red-50 dark:bg-red-950';
		return 'bg-yellow-50 dark:bg-yellow-950';
	}

	function getResultText(match: any) {
		if (!match.result) return 'TBD';
		const { goalsFor, goalsAgainst } = match.result;
		if (goalsFor > goalsAgainst) return 'Win';
		if (goalsFor < goalsAgainst) return 'Loss';
		return 'Draw';
	}
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<div class="mx-auto max-w-[1920px] p-6 lg:p-8">
		<!-- Header -->
		<div class="mb-8 flex items-center justify-between">
			<div class="space-y-2">
				<h1
					class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400"
				>
					Matches
				</h1>
				<p class="text-lg text-slate-600 dark:text-slate-400">View and manage all matches</p>
			</div>
			<button
				onclick={() => (showAddModal = true)}
				class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700"
			>
				<Plus class="h-5 w-5" />
				Schedule Match
			</button>
		</div>

		<!-- Stats Grid -->
		<div class="mb-8 grid gap-4 md:grid-cols-5">
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Played</p>
				<p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.played}</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Wins</p>
				<p class="text-3xl font-bold text-green-600 dark:text-green-400">{stats.wins}</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Draws</p>
				<p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{stats.draws}</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Losses</p>
				<p class="text-3xl font-bold text-red-600 dark:text-red-400">{stats.losses}</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Goals</p>
				<p class="text-3xl font-bold text-orange-600 dark:text-orange-400">{stats.totalGoals}</p>
			</div>
		</div>

		<!-- Filters -->
		<div class="mb-6 flex gap-2">
			<button
				onclick={() => (filterType = 'all')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {filterType === 'all'
					? 'bg-blue-600 text-white'
					: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
			>
				All Matches
			</button>
			<button
				onclick={() => (filterType = 'upcoming')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {filterType === 'upcoming'
					? 'bg-blue-600 text-white'
					: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
			>
				Upcoming ({allMatches.filter((m) => !m.result).length})
			</button>
			<button
				onclick={() => (filterType = 'completed')}
				class="rounded-lg px-4 py-2 text-sm font-medium transition-colors {filterType === 'completed'
					? 'bg-blue-600 text-white'
					: 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}"
			>
				Completed ({allMatches.filter((m) => m.result).length})
			</button>
		</div>

		<!-- Matches Table -->
		<div class="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Date & Time</Table.Head>
						<Table.Head>Match</Table.Head>
						<Table.Head>Location</Table.Head>
						<Table.Head class="text-center">Result</Table.Head>
						<Table.Head class="text-end">Actions</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each filteredMatches as match}
						<Table.Row class={getResultClass(match)}>
							<Table.Cell>
								<div class="flex flex-col gap-1">
									<div class="flex items-center gap-2 font-medium text-slate-900 dark:text-white">
										<Calendar class="h-4 w-4" />
										{formatDate(match.date)}
									</div>
									<div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
										<Clock class="h-3 w-3" />
										{match.time}
									</div>
								</div>
							</Table.Cell>
							<Table.Cell>
								<div class="flex items-center gap-4">
									<div class="text-right">
										<div class="font-semibold text-slate-900 dark:text-white">Palmerias FC</div>
										{#if match.result}
											<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
												{match.result.goalsFor}
											</div>
										{/if}
									</div>
									<div class="text-slate-400 dark:text-slate-600">vs</div>
									<div class="text-left">
										<div class="font-semibold text-slate-900 dark:text-white">{match.opponent}</div>
										{#if match.result}
											<div class="text-2xl font-bold text-slate-600 dark:text-slate-400">
												{match.result.goalsAgainst}
											</div>
										{/if}
									</div>
								</div>
							</Table.Cell>
							<Table.Cell>
								<div class="flex items-center gap-2">
									<MapPin class="h-4 w-4 text-slate-400" />
									<div>
										<div class="font-medium text-slate-900 dark:text-white">{match.location}</div>
										<div class="text-xs text-slate-500 dark:text-slate-500">{match.homeAway}</div>
									</div>
								</div>
							</Table.Cell>
							<Table.Cell class="text-center">
								{#if match.result}
									{@const resultText = getResultText(match)}
									<span
										class="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold {resultText === 'Win'
											? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
											: resultText === 'Loss'
												? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
												: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'}"
									>
										{resultText}
									</span>
								{:else}
									<span class="text-sm text-slate-500 dark:text-slate-500">Upcoming</span>
								{/if}
							</Table.Cell>
							<Table.Cell class="text-end">
								<div class="flex items-center justify-end gap-2">
									<button
										class="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
									>
										<Edit2 class="h-4 w-4" />
									</button>
									<button
										class="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
									>
										<Trash2 class="h-4 w-4" />
									</button>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</div>

<!-- Add Match Modal -->
{#if showAddModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={(e) => {
			if (e.target === e.currentTarget) showAddModal = false;
		}}
	>
		<div class="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
			<h2 class="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Schedule Match</h2>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleAddMatch();
				}}
				class="space-y-4"
			>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Date </label>
						<input
							type="date"
							bind:value={newMatch.date}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Time </label>
						<input
							type="time"
							bind:value={newMatch.time}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Opponent </label>
					<input
						type="text"
						bind:value={newMatch.opponent}
						required
						placeholder="e.g., Al Wahda FC"
						class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
					/>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Home/Away </label>
					<select
						bind:value={newMatch.homeAway}
						class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
					>
						<option value="Home">Home</option>
						<option value="Away">Away</option>
					</select>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Location </label>
					<input
						type="text"
						bind:value={newMatch.location}
						required
						placeholder="e.g., Al Maktoum Stadium"
						class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
					/>
				</div>

				<div class="flex gap-3 pt-4">
					<button
						type="submit"
						class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
					>
						Schedule Match
					</button>
					<button
						type="button"
						onclick={() => {
							showAddModal = false;
							resetForm();
						}}
						class="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
