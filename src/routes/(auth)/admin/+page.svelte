<script lang="ts">
	import { UserPlus, UserMinus, Users as UsersIcon, Shield, Search, Edit, Trash2 } from 'lucide-svelte';
	import GlowingEffect from '$lib/components/ui/glowing-effect.svelte';
	import { players } from '$lib/data/players';

	let allPlayers = $state([...players]);
	let searchTerm = $state('');
	let showAddModal = $state(false);
	let editingPlayer = $state<any>(null);

	// New player form
	let newPlayer = $state({
		name: '',
		number: 0,
		position: 'FW',
		age: 18,
		nationality: 'UAE',
		height: 180,
		weight: 75,
		roles: [] as string[]
	});

	// Filter players based on search
	$effect(() => {
		if (searchTerm.trim() === '') {
			allPlayers = [...players];
		} else {
			allPlayers = players.filter(
				(p) =>
					p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					p.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
					p.number.toString().includes(searchTerm)
			);
		}
	});

	function handleAddPlayer() {
		// In a real app, this would make an API call
		console.log('Adding player:', newPlayer);
		showAddModal = false;
		resetForm();
	}

	function handleEditPlayer(player: any) {
		editingPlayer = { ...player };
	}

	function handleSaveEdit() {
		// In a real app, this would make an API call
		console.log('Saving player:', editingPlayer);
		editingPlayer = null;
	}

	function handleDeletePlayer(playerId: string) {
		if (confirm('Are you sure you want to delete this player?')) {
			// In a real app, this would make an API call
			console.log('Deleting player:', playerId);
		}
	}

	function resetForm() {
		newPlayer = {
			name: '',
			number: 0,
			position: 'FW',
			age: 18,
			nationality: 'UAE',
			height: 180,
			weight: 75,
			roles: []
		};
	}

	function toggleRole(role: string) {
		if (newPlayer.roles.includes(role)) {
			newPlayer.roles = newPlayer.roles.filter((r) => r !== role);
		} else {
			newPlayer.roles = [...newPlayer.roles, role];
		}
	}

	const positions = ['GK', 'DF', 'MF', 'FW'];
	const availableRoles = ['player', 'coach', 'manager'];
</script>

<div class="min-h-screen bg-slate-50 dark:bg-slate-950">
	<div class="mx-auto max-w-[1920px] p-6 lg:p-8">
		<!-- Header -->
		<div class="mb-8 space-y-2">
			<div class="flex items-center justify-between">
				<div class="space-y-2">
					<h1
						class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-blue-400 dark:to-purple-400"
					>
						Admin Panel
					</h1>
					<p class="text-lg text-slate-600 dark:text-slate-400">
						Manage players, coaches, and staff
					</p>
				</div>
				<button
					onclick={() => (showAddModal = true)}
					class="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500"
				>
					<UserPlus class="h-5 w-5" />
					Add Player
				</button>
			</div>
		</div>

		<!-- Stats Overview -->
		<div class="mb-8 grid gap-4 md:grid-cols-4">
			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Total Players</p>
						<p class="text-3xl font-bold text-blue-600 dark:text-blue-400">
							{players.filter((p) => p.roles.includes('player')).length}
						</p>
					</div>
					<UsersIcon class="h-8 w-8 text-blue-600 dark:text-blue-400" />
				</div>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Coaches</p>
						<p class="text-3xl font-bold text-purple-600 dark:text-purple-400">
							{players.filter((p) => p.roles.includes('coach')).length}
						</p>
					</div>
					<Shield class="h-8 w-8 text-purple-600 dark:text-purple-400" />
				</div>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Forwards</p>
						<p class="text-3xl font-bold text-orange-600 dark:text-orange-400">
							{players.filter((p) => p.position === 'FW').length}
						</p>
					</div>
					<div class="text-4xl">⚽</div>
				</div>
			</div>

			<div class="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm text-slate-600 dark:text-slate-400">Goalkeepers</p>
						<p class="text-3xl font-bold text-green-600 dark:text-green-400">
							{players.filter((p) => p.position === 'GK').length}
						</p>
					</div>
					<div class="text-4xl">🧤</div>
				</div>
			</div>
		</div>

		<!-- Search Bar -->
		<div class="mb-6">
			<div class="relative">
				<Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
				<input
					type="text"
					bind:value={searchTerm}
					placeholder="Search players by name, position, or number..."
					class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder-slate-600"
				/>
			</div>
		</div>

		<!-- Players List -->
		<div class="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="border-b border-slate-200 dark:border-slate-800">
							<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
								#
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
								Name
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
								Position
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
								Age
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
								Goals
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
								Assists
							</th>
							<th class="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">
								Roles
							</th>
							<th class="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{#each allPlayers as player}
							<tr
								class="border-b border-slate-100 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
							>
								<td class="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
									{player.number}
								</td>
								<td class="px-6 py-4">
									<div class="flex items-center gap-3">
										<div
											class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white"
										>
											{player.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</div>
										<div>
											<div class="font-medium text-slate-900 dark:text-white">{player.name}</div>
											<div class="text-sm text-slate-500 dark:text-slate-400">
												{player.nationality}
											</div>
										</div>
									</div>
								</td>
								<td class="px-6 py-4 text-sm text-slate-900 dark:text-white">{player.position}</td>
								<td class="px-6 py-4 text-sm text-slate-900 dark:text-white">{player.age}</td>
								<td class="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
									{player.goals}
								</td>
								<td class="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
									{player.assists}
								</td>
								<td class="px-6 py-4">
									<div class="flex flex-wrap gap-1">
										{#each player.roles as role}
											<span
												class="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300"
											>
												{role}
											</span>
										{/each}
									</div>
								</td>
								<td class="px-6 py-4 text-right">
									<div class="flex items-center justify-end gap-2">
										<button
											onclick={() => handleEditPlayer(player)}
											class="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
											aria-label="Edit player"
										>
											<Edit class="h-4 w-4" />
										</button>
										<button
											onclick={() => handleDeletePlayer(player.id)}
											class="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
											aria-label="Delete player"
										>
											<Trash2 class="h-4 w-4" />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<!-- Add Player Modal -->
{#if showAddModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
		onclick={(e) => {
			if (e.target === e.currentTarget) showAddModal = false;
		}}
	>
		<div
			class="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"
		>
			<h2 class="mb-6 text-2xl font-bold text-slate-900 dark:text-white">Add New Player</h2>

			<form onsubmit={(e) => {
				e.preventDefault();
				handleAddPlayer();
			}} class="space-y-4">
				<div class="grid gap-4 md:grid-cols-2">
					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
							Name
						</label>
						<input
							type="text"
							bind:value={newPlayer.name}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
							Number
						</label>
						<input
							type="number"
							bind:value={newPlayer.number}
							required
							min="1"
							max="99"
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
							Position
						</label>
						<select
							bind:value={newPlayer.position}
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						>
							{#each positions as pos}
								<option value={pos}>{pos}</option>
							{/each}
						</select>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
							Age
						</label>
						<input
							type="number"
							bind:value={newPlayer.age}
							required
							min="16"
							max="50"
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
							Nationality
						</label>
						<input
							type="text"
							bind:value={newPlayer.nationality}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>

					<div>
						<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
							Height (cm)
						</label>
						<input
							type="number"
							bind:value={newPlayer.height}
							required
							class="w-full rounded-lg border border-slate-300 px-4 py-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
						/>
					</div>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
						Roles
					</label>
					<div class="flex gap-2">
						{#each availableRoles as role}
							<button
								type="button"
								onclick={() => toggleRole(role)}
								class="rounded-lg border px-4 py-2 {newPlayer.roles.includes(role)
									? 'border-blue-600 bg-blue-600 text-white'
									: 'border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white'}"
							>
								{role}
							</button>
						{/each}
					</div>
				</div>

				<div class="flex gap-3 pt-4">
					<button
						type="submit"
						class="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
					>
						Add Player
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
