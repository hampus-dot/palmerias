<script lang="ts">
	import { players } from '$lib/data/players';
	import { leagueTable } from '$lib/data/league';
	import { matches } from '$lib/data/matches';
	import { cn } from '$lib/utils';

	let selectedSort: 'goals' | 'assists' | 'matches' = 'goals';

	$: sortedPlayers = [...players].sort((a, b) => {
		if (selectedSort === 'goals') return b.goals - a.goals;
		if (selectedSort === 'assists') return b.assists - a.assists;
		return b.matchesPlayed - a.matchesPlayed;
	});

	const upcomingMatches = matches.filter((m) => !m.result).slice(0, 3);
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
	<!-- Hero Section -->
	<section class="relative overflow-hidden">
		<!-- Animated gradient background -->
		<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>

		<div class="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
			<div class="text-center">
				<h1 class="text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
					<span class="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
						Palmerias FC
					</span>
				</h1>
				<p class="mt-6 text-xl text-slate-300 sm:text-2xl">
					Where Passion Meets Performance
				</p>
				<div class="mt-10 flex justify-center gap-4">
					<a
						href="/login"
						class="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
					>
						Player Login
					</a>
					<a
						href="/login?type=manager"
						class="rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20"
					>
						Manager Login
					</a>
				</div>
			</div>
		</div>

		<!-- Decorative elements -->
		<div class="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl"></div>
		<div class="absolute right-1/4 top-40 h-96 w-96 rounded-full bg-purple-500/30 blur-3xl"></div>
	</section>

	<!-- Players Section -->
	<section class="relative py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="text-4xl font-bold text-white sm:text-5xl">Our Stars</h2>
				<p class="mt-4 text-lg text-slate-300">Top performers this season</p>
			</div>

			<!-- Sort buttons -->
			<div class="mb-8 flex justify-center gap-2">
				{#each [
					{ value: 'goals', label: 'Goals' },
					{ value: 'assists', label: 'Assists' },
					{ value: 'matches', label: 'Appearances' }
				] as sort}
					<button
						onclick={() => (selectedSort = sort.value)}
						class={cn(
							'rounded-full px-6 py-2 text-sm font-medium transition-all',
							selectedSort === sort.value
								? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
								: 'bg-white/10 text-slate-300 hover:bg-white/20'
						)}
					>
						{sort.label}
					</button>
				{/each}
			</div>

			<!-- Players Grid -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each sortedPlayers.slice(0, 8) as player}
					<div
						class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:from-white/20 hover:to-white/10"
					>
						<!-- Player number background -->
						<div
							class="absolute right-4 top-4 text-6xl font-bold text-white/5 transition-all group-hover:text-white/10"
						>
							{player.number}
						</div>

						<div class="relative">
							<div class="mb-4">
								<h3 class="text-xl font-bold text-white">{player.name}</h3>
								<p class="text-sm text-slate-400">{player.position}</p>
								{#if player.roles.includes('coach')}
									<span
										class="mt-2 inline-block rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-3 py-1 text-xs font-medium text-yellow-300"
									>
										Coach
									</span>
								{/if}
							</div>

							<div class="grid grid-cols-3 gap-2 text-center">
								<div class="rounded-lg bg-black/20 p-2">
									<p class="text-2xl font-bold text-blue-400">{player.goals}</p>
									<p class="text-xs text-slate-400">Goals</p>
								</div>
								<div class="rounded-lg bg-black/20 p-2">
									<p class="text-2xl font-bold text-purple-400">{player.assists}</p>
									<p class="text-xs text-slate-400">Assists</p>
								</div>
								<div class="rounded-lg bg-black/20 p-2">
									<p class="text-2xl font-bold text-pink-400">{player.matchesPlayed}</p>
									<p class="text-xs text-slate-400">Apps</p>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- League Table Section -->
	<section class="py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="text-4xl font-bold text-white sm:text-5xl">League Standing</h2>
				<p class="mt-4 text-lg text-slate-300">Current season table</p>
			</div>

			<div class="overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm">
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead class="border-b border-white/10 bg-black/20">
							<tr class="text-left text-xs font-medium uppercase tracking-wider text-slate-400">
								<th class="px-6 py-4">Pos</th>
								<th class="px-6 py-4">Team</th>
								<th class="px-6 py-4 text-center">P</th>
								<th class="px-6 py-4 text-center">W</th>
								<th class="px-6 py-4 text-center">D</th>
								<th class="px-6 py-4 text-center">L</th>
								<th class="px-6 py-4 text-center">GF</th>
								<th class="px-6 py-4 text-center">GA</th>
								<th class="px-6 py-4 text-center">GD</th>
								<th class="px-6 py-4 text-center font-bold">Pts</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-white/5">
							{#each leagueTable as team, index}
								<tr
									class={cn(
										'transition-colors hover:bg-white/5',
										team.name === 'Palmerias FC' && 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
									)}
								>
									<td class="whitespace-nowrap px-6 py-4">
										<span
											class={cn(
												'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold',
												index < 3 && 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400',
												index >= 3 && 'text-slate-400'
											)}
										>
											{index + 1}
										</span>
									</td>
									<td class="whitespace-nowrap px-6 py-4">
										<span
											class={cn(
												'font-semibold',
												team.name === 'Palmerias FC' ? 'text-white' : 'text-slate-300'
											)}
										>
											{team.name}
										</span>
									</td>
									<td class="whitespace-nowrap px-6 py-4 text-center text-slate-400">{team.played}</td>
									<td class="whitespace-nowrap px-6 py-4 text-center text-green-400">{team.won}</td>
									<td class="whitespace-nowrap px-6 py-4 text-center text-yellow-400">{team.drawn}</td>
									<td class="whitespace-nowrap px-6 py-4 text-center text-red-400">{team.lost}</td>
									<td class="whitespace-nowrap px-6 py-4 text-center text-slate-400">{team.goalsFor}</td>
									<td class="whitespace-nowrap px-6 py-4 text-center text-slate-400"
										>{team.goalsAgainst}</td
									>
									<td
										class={cn(
											'whitespace-nowrap px-6 py-4 text-center font-medium',
											team.goalDifference > 0 && 'text-green-400',
											team.goalDifference < 0 && 'text-red-400',
											team.goalDifference === 0 && 'text-slate-400'
										)}
									>
										{team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
									</td>
									<td class="whitespace-nowrap px-6 py-4 text-center text-lg font-bold text-white"
										>{team.points}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>

	<!-- Schedule Section -->
	<section class="py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="text-4xl font-bold text-white sm:text-5xl">Upcoming Matches</h2>
				<p class="mt-4 text-lg text-slate-300">Next fixtures</p>
			</div>

			<div class="grid gap-6 lg:grid-cols-3">
				{#each upcomingMatches as match}
					<div
						class="overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm"
					>
						<div class="mb-4 text-center">
							<p class="text-sm text-slate-400">{new Date(match.date).toLocaleDateString('sv-SE')}</p>
							<p class="text-lg font-medium text-blue-400">{match.time}</p>
						</div>

						<div class="flex items-center justify-center gap-4">
							<div class="text-right">
								<p class="text-xl font-bold text-white">Palmerias</p>
							</div>
							<div class="rounded-full bg-white/10 px-4 py-2">
								<p class="text-sm text-slate-300">vs</p>
							</div>
							<div>
								<p class="text-xl font-bold text-white">{match.opponent}</p>
							</div>
						</div>

						<div class="mt-4 text-center">
							<span
								class={cn(
									'inline-block rounded-full px-4 py-2 text-sm font-medium',
									match.homeAway === 'Hemma'
										? 'bg-green-500/20 text-green-400'
										: 'bg-blue-500/20 text-blue-400'
								)}
							>
								{match.homeAway}
							</span>
							<p class="mt-2 text-sm text-slate-400">{match.location}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-1">
				<div class="rounded-xl bg-slate-900 px-8 py-16 text-center">
					<h2 class="text-4xl font-bold text-white sm:text-5xl">Get In Touch</h2>
					<p class="mt-4 text-lg text-slate-300">Want to join Palmerias FC? Contact us today!</p>

					<div class="mt-12 grid gap-8 sm:grid-cols-3">
						<div>
							<div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
								<span class="text-2xl">📧</span>
							</div>
							<h3 class="text-lg font-semibold text-white">Email</h3>
							<p class="mt-2 text-slate-400">info@palmeriasfc.se</p>
						</div>
						<div>
							<div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
								<span class="text-2xl">📱</span>
							</div>
							<h3 class="text-lg font-semibold text-white">Phone</h3>
							<p class="mt-2 text-slate-400">+46 70 123 45 67</p>
						</div>
						<div>
							<div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-pink-500/20">
								<span class="text-2xl">📍</span>
							</div>
							<h3 class="text-lg font-semibold text-white">Location</h3>
							<p class="mt-2 text-slate-400">Palmeriavallen, Göteborg</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-white/10 py-12">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<p class="text-slate-400">&copy; 2025 Palmerias FC. All rights reserved.</p>
		</div>
	</footer>
</div>
