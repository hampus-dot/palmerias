<script lang="ts">
	import { Calendar, Clock, MapPin, Users, Plus, CheckCircle2, XCircle, Edit2, Trash2 } from 'lucide-svelte';
	import { trainingSessions } from '$lib/data/training';
	import { players } from '$lib/data/players';
	import * as Table from '$lib/components/ui/table';

	let sessions = $state([...trainingSessions]);
	let showAddModal = $state(false);
	let selectedSession = $state<any>(null);

	// New training form
	let newTraining = $state({
		date: '',
		time: '',
		type: 'Tactical',
		location: 'Main Stadium',
		notes: ''
	});

	const trainingTypes = ['Tactical', 'Fitness', 'Technical', 'Recovery', 'Match Preparation'];

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function handleAddTraining() {
		// In real app, this would call API
		console.log('Adding training:', newTraining);
		showAddModal = false;
		resetForm();
	}

	function resetForm() {
		newTraining = {
			date: '',
			time: '',
			type: 'Tactical',
			location: 'Main Stadium',
			notes: ''
		};
	}

	function toggleAttendance(sessionId: string, playerId: string) {
		// In real app, this would call API
		console.log('Toggle attendance:', sessionId, playerId);
	}

	function handleDeleteSession(sessionId: string) {
		if (confirm('Are you sure you want to delete this training session?')) {
			console.log('Delete session:', sessionId);
		}
	}

	function getTypeColor(type: string) {
		switch (type) {
			case 'Tactical':
				return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300';
			case 'Fitness':
				return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300';
			case 'Technical':
				return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300';
			case 'Recovery':
				return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300';
			case 'Match Preparation':
				return 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300';
			default:
				return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
		}
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
					Training Sessions
				</h1>
				<p class="text-lg text-slate-600 dark:text-slate-400">
					Manage and track all training sessions
				</p>
			</div>
			<button
				onclick={() => (showAddModal = true)}
				class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700"
			>
				<Plus class="h-5 w-5" />
				Schedule Training
			</button>
		</div>

		<!-- Stats -->
		<div class="mb-8 grid gap-4 md:grid-cols-4">
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Total Sessions</p>
				<p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{sessions.length}</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Avg Attendance</p>
				<p class="text-3xl font-bold text-green-600 dark:text-green-400">
					{(sessions.reduce((sum, s) => sum + s.attendance.length, 0) / sessions.length).toFixed(0)}
				</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Next Session</p>
				<p class="text-lg font-bold text-purple-600 dark:text-purple-400">
					{sessions[0] ? new Date(sessions[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'None'}
				</p>
			</div>
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<p class="text-sm text-slate-600 dark:text-slate-400">Active Players</p>
				<p class="text-3xl font-bold text-orange-600 dark:text-orange-400">{players.length}</p>
			</div>
		</div>

		<!-- Training Sessions List -->
		<div class="space-y-4">
			{#each sessions as session}
				<div class="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
					<div class="border-b border-slate-200 p-6 dark:border-slate-800">
						<div class="flex items-start justify-between">
							<div class="flex-1">
								<div class="mb-2 flex items-center gap-3">
									<h3 class="text-2xl font-bold text-slate-900 dark:text-white">{session.type}</h3>
									<span class="rounded-full {getTypeColor(session.type)} px-3 py-1 text-xs font-semibold">
										{session.type}
									</span>
								</div>
								<div class="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
									<div class="flex items-center gap-2">
										<Calendar class="h-4 w-4" />
										{formatDate(session.date)}
									</div>
									<div class="flex items-center gap-2">
										<Clock class="h-4 w-4" />
										{session.time}
									</div>
									<div class="flex items-center gap-2">
										<MapPin class="h-4 w-4" />
										{session.location}
									</div>
									<div class="flex items-center gap-2">
										<Users class="h-4 w-4" />
										{session.attendance.length} / {players.length} attending
									</div>
								</div>
								{#if session.notes}
									<p class="mt-3 text-sm text-slate-600 dark:text-slate-400">{session.notes}</p>
								{/if}
							</div>
							<div class="flex gap-2">
								<button
									onclick={() => (selectedSession = session)}
									class="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
								>
									<Edit2 class="h-4 w-4" />
								</button>
								<button
									onclick={() => handleDeleteSession(session.id)}
									class="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
								>
									<Trash2 class="h-4 w-4" />
								</button>
							</div>
						</div>
					</div>

					<!-- Attendance Table -->
					<div class="p-6">
						<h4 class="mb-4 font-semibold text-slate-900 dark:text-white">Attendance</h4>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head class="w-[50px]">#</Table.Head>
									<Table.Head>Player</Table.Head>
									<Table.Head>Position</Table.Head>
									<Table.Head class="text-center">Status</Table.Head>
									<Table.Head class="text-end">Action</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each players.filter((p) => p.roles.includes('player')).slice(0, 10) as player}
									{@const isAttending = session.attendance.includes(player.id)}
									<Table.Row>
										<Table.Cell class="font-medium">{player.number}</Table.Cell>
										<Table.Cell>{player.name}</Table.Cell>
										<Table.Cell>{player.position}</Table.Cell>
										<Table.Cell class="text-center">
											{#if isAttending}
												<span class="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
													<CheckCircle2 class="h-4 w-4" />
													Attending
												</span>
											{:else}
												<span class="inline-flex items-center gap-1 text-slate-400 dark:text-slate-600">
													<XCircle class="h-4 w-4" />
													Not attending
												</span>
											{/if}
										</Table.Cell>
										<Table.Cell class="text-end">
											<button
												onclick={() => toggleAttendance(session.id, player.id)}
												class="rounded-lg px-3 py-1 text-sm font-medium {isAttending
													? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-300'
													: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950 dark:text-green-300'}"
											>
												{isAttending ? 'Remove' : 'Add'}
											</button>
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Add Training Modal -->
{#if showAddModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={(e) => {
			if (e.target === e.currentTarget) showAddModal = false;
		}}
	>
		<div class="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
			<h2 class="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Schedule Training Session</h2>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleAddTraining();
				}}
				class="space-y-4"
			>
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Date </label>
						<input
							type="date"
							bind:value={newTraining.date}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Time </label>
						<input
							type="time"
							bind:value={newTraining.time}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Type </label>
					<select
						bind:value={newTraining.type}
						class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
					>
						{#each trainingTypes as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Location </label>
					<input
						type="text"
						bind:value={newTraining.location}
						required
						class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
					/>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"> Notes </label>
					<textarea
						bind:value={newTraining.notes}
						rows="3"
						class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
					></textarea>
				</div>

				<div class="flex gap-3 pt-4">
					<button
						type="submit"
						class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
					>
						Schedule Training
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
