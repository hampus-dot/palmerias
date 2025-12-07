<script lang="ts">
	import { players } from '$lib/data/players';
	import { leagueTable } from '$lib/data/league';
	import { matches } from '$lib/data/matches';
	import { cn } from '$lib/utils';
	import BackgroundGradient from '$lib/components/BackgroundGradient.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	let selectedSort: 'goals' | 'assists' | 'matches' = $state('goals');
	let mobileMenuOpen = $state(false);

	$effect(() => {
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});

	const sortedPlayers = $derived(
		[...players].sort((a, b) => {
			if (selectedSort === 'goals') return b.goals - a.goals;
			if (selectedSort === 'assists') return b.assists - a.assists;
			return b.matchesPlayed - a.matchesPlayed;
		})
	);

	const upcomingMatches = matches.filter((m) => !m.result).slice(0, 3);
</script>

<svelte:head>
	<title>Palmerias FC - Where Heritage Meets Excellence</title>
	<meta
		name="description"
		content="Founded in Dubai 2025, Palmerias FC brings together elite talent from across Europe with honor, pride, and dedication to excellence."
	/>
</svelte:head>

<div class="min-h-screen bg-white dark:bg-black transition-colors">
	<!-- Fixed Header with Theme Toggle -->
	<header class="fixed top-0 right-0 z-50 p-4">
		<ThemeToggle />
	</header>

	<!-- Mobile Menu Button -->
	<button
		onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
		class="fixed left-4 top-4 z-50 rounded-lg bg-gray-100 p-2 dark:bg-gray-800 lg:hidden"
		aria-label="Toggle menu"
	>
		<svg class="h-6 w-6 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
	</button>

	<!-- Mobile Menu -->
	{#if mobileMenuOpen}
		<div class="fixed inset-0 z-40 bg-white dark:bg-black lg:hidden">
			<button
				onclick={() => (mobileMenuOpen = false)}
				class="absolute right-4 top-4 rounded-lg bg-gray-100 p-2 dark:bg-gray-800"
				aria-label="Close menu"
			>
				<svg class="h-6 w-6 text-gray-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			<div class="flex h-full flex-col items-center justify-center gap-8 p-8">
				<a
					href="#heritage"
					onclick={() => (mobileMenuOpen = false)}
					class="text-2xl font-semibold text-gray-900 dark:text-white"
				>
					Heritage
				</a>
				<a
					href="#squad"
					onclick={() => (mobileMenuOpen = false)}
					class="text-2xl font-semibold text-gray-900 dark:text-white"
				>
					Squad
				</a>
				<a
					href="#standings"
					onclick={() => (mobileMenuOpen = false)}
					class="text-2xl font-semibold text-gray-900 dark:text-white"
				>
					Standings
				</a>
				<a
					href="#fixtures"
					onclick={() => (mobileMenuOpen = false)}
					class="text-2xl font-semibold text-gray-900 dark:text-white"
				>
					Fixtures
				</a>
				<div class="mt-8 flex flex-col gap-4 w-full max-w-xs">
					<a
						href="/login"
						class="rounded-full bg-black px-8 py-4 text-center text-lg font-semibold text-white dark:bg-white dark:text-black"
					>
						Player Portal
					</a>
					<a
						href="/login?type=manager"
						class="rounded-full border-2 border-black px-8 py-4 text-center text-lg font-semibold text-black dark:border-white dark:text-white"
					>
						Manager Access
					</a>
				</div>
			</div>
		</div>
	{/if}

	<!-- Hero Section -->
	<section class="relative overflow-hidden py-24 sm:py-32 lg:py-48">
		<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="text-center">
				<div class="mb-6">
					<span class="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
						Est. Dubai 2025
					</span>
				</div>
				<h1 class="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-8xl">
					Palmerias FC
				</h1>
				<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 sm:text-xl lg:text-2xl">
					Where <span class="font-semibold text-gray-900 dark:text-white">Heritage</span> Meets <span class="font-semibold text-gray-900 dark:text-white">Excellence</span>
				</p>
				<p class="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-500 dark:text-gray-500 sm:text-lg">
					Founded in the heart of Dubai, we unite elite talent from across Europe. Built on principles of
					<span class="font-medium text-gray-700 dark:text-gray-300">honor</span>,
					<span class="font-medium text-gray-700 dark:text-gray-300">pride</span>, and
					<span class="font-medium text-gray-700 dark:text-gray-300">unwavering dedication</span> to the beautiful game.
				</p>
				<div class="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
					<a
						href="/login"
						class="rounded-full bg-black px-8 py-4 text-center text-lg font-semibold text-white transition-all hover:scale-105 dark:bg-white dark:text-black"
					>
						Player Portal
					</a>
					<a
						href="/login?type=manager"
						class="rounded-full border-2 border-black px-8 py-4 text-center text-lg font-semibold text-black transition-all hover:scale-105 dark:border-white dark:text-white"
					>
						Manager Access
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Heritage Section -->
	<section id="heritage" class="border-t border-gray-200 py-16 dark:border-gray-800 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mx-auto max-w-3xl text-center">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
					A Legacy of Excellence
				</h2>
				<div class="mt-8 space-y-6 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg">
					<p>
						In 2025, a vision was born in Dubai—to create a football club that transcends borders and
						embodies the highest standards of the sport. Palmerias FC represents more than a team; it's
						a brotherhood united by shared values.
					</p>
					<p>
						Our roster brings together exceptional talent from across Europe, each player selected not
						only for their skill but for their character, dedication, and commitment to honorable play.
					</p>
					<p class="font-medium text-gray-900 dark:text-white">
						We play with pride. We compete with honor. We win with grace.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Squad Section -->
	<section id="squad" class="border-t border-gray-200 py-16 dark:border-gray-800 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
					The Squad
				</h2>
				<p class="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
					Excellence across Europe, united in Dubai
				</p>
			</div>

			<!-- Sort buttons -->
			<div class="mb-8 flex flex-wrap justify-center gap-2">
				{#each [
					{ value: 'goals', label: 'Goals' },
					{ value: 'assists', label: 'Assists' },
					{ value: 'matches', label: 'Appearances' }
				] as sort}
					<button
						onclick={() => (selectedSort = sort.value)}
						class={cn(
							'rounded-full px-4 py-2 text-sm font-medium transition-all sm:px-6',
							selectedSort === sort.value
								? 'bg-black text-white dark:bg-white dark:text-black'
								: 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
						)}
					>
						{sort.label}
					</button>
				{/each}
			</div>

			<!-- Players Grid -->
			<div class="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
				{#each sortedPlayers.slice(0, 8) as player}
					<BackgroundGradient containerClassName="h-full">
						<div class="h-full rounded-[26px] bg-white p-6 dark:bg-zinc-900">
							<div class="mb-4 flex items-start justify-between">
								<div>
									<h3 class="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
										{player.name}
									</h3>
									<p class="text-sm text-gray-600 dark:text-gray-400">{player.position}</p>
									{#if player.roles.includes('coach')}
										<span
											class="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900 dark:bg-gray-800 dark:text-white"
										>
											Coach
										</span>
									{/if}
								</div>
								<div
									class="text-4xl font-bold text-gray-100 dark:text-gray-800 sm:text-5xl lg:text-6xl"
								>
									{player.number}
								</div>
							</div>

							<div class="grid grid-cols-3 gap-2 text-center">
								<div class="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
									<p class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
										{player.goals}
									</p>
									<p class="text-xs text-gray-600 dark:text-gray-400">Goals</p>
								</div>
								<div class="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
									<p class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
										{player.assists}
									</p>
									<p class="text-xs text-gray-600 dark:text-gray-400">Assists</p>
								</div>
								<div class="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
									<p class="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
										{player.matchesPlayed}
									</p>
									<p class="text-xs text-gray-600 dark:text-gray-400">Apps</p>
								</div>
							</div>
						</div>
					</BackgroundGradient>
				{/each}
			</div>
		</div>
	</section>

	<!-- League Standings Section -->
	<section id="standings" class="border-t border-gray-200 py-16 dark:border-gray-800 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
					League Standings
				</h2>
				<p class="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
					Current season table
				</p>
			</div>

			<BackgroundGradient>
				<div class="overflow-hidden rounded-[26px] bg-white dark:bg-zinc-900">
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead class="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
								<tr
									class="text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400"
								>
									<th class="px-3 py-3 sm:px-6 sm:py-4">Pos</th>
									<th class="px-3 py-3 sm:px-6 sm:py-4">Club</th>
									<th class="hidden px-3 py-3 text-center sm:table-cell sm:px-6 sm:py-4">P</th>
									<th class="hidden px-3 py-3 text-center md:table-cell sm:px-6 sm:py-4">W</th>
									<th class="hidden px-3 py-3 text-center md:table-cell sm:px-6 sm:py-4">D</th>
									<th class="hidden px-3 py-3 text-center md:table-cell sm:px-6 sm:py-4">L</th>
									<th class="hidden px-3 py-3 text-center lg:table-cell sm:px-6 sm:py-4">GF</th>
									<th class="hidden px-3 py-3 text-center lg:table-cell sm:px-6 sm:py-4">GA</th>
									<th class="px-3 py-3 text-center sm:px-6 sm:py-4">GD</th>
									<th class="px-3 py-3 text-center font-bold sm:px-6 sm:py-4">Pts</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-100 dark:divide-gray-800">
								{#each leagueTable as team, index}
									<tr
										class={cn(
											'transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50',
											team.name === 'Palmerias FC' && 'bg-gray-100 dark:bg-gray-800'
										)}
									>
										<td class="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">
											<span
												class={cn(
													'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 sm:text-sm',
													index < 3 && 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white',
													index >= 3 && 'text-gray-600 dark:text-gray-400'
												)}
											>
												{index + 1}
											</span>
										</td>
										<td class="whitespace-nowrap px-3 py-3 sm:px-6 sm:py-4">
											<span
												class={cn(
													'text-sm font-semibold sm:text-base',
													team.name === 'Palmerias FC'
														? 'text-gray-900 dark:text-white'
														: 'text-gray-700 dark:text-gray-300'
												)}
											>
												{team.name}
											</span>
										</td>
										<td
											class="hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-600 dark:text-gray-400 sm:table-cell sm:px-6 sm:py-4"
										>
											{team.played}
										</td>
										<td
											class="hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-900 dark:text-white md:table-cell sm:px-6 sm:py-4"
										>
											{team.won}
										</td>
										<td
											class="hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-600 dark:text-gray-400 md:table-cell sm:px-6 sm:py-4"
										>
											{team.drawn}
										</td>
										<td
											class="hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-600 dark:text-gray-400 md:table-cell sm:px-6 sm:py-4"
										>
											{team.lost}
										</td>
										<td
											class="hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-600 dark:text-gray-400 lg:table-cell sm:px-6 sm:py-4"
										>
											{team.goalsFor}
										</td>
										<td
											class="hidden whitespace-nowrap px-3 py-3 text-center text-sm text-gray-600 dark:text-gray-400 lg:table-cell sm:px-6 sm:py-4"
										>
											{team.goalsAgainst}
										</td>
										<td
											class={cn(
												'whitespace-nowrap px-3 py-3 text-center text-sm font-medium sm:px-6 sm:py-4',
												team.goalDifference > 0 && 'text-gray-900 dark:text-white',
												team.goalDifference < 0 && 'text-gray-500 dark:text-gray-500',
												team.goalDifference === 0 && 'text-gray-600 dark:text-gray-400'
											)}
										>
											{team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
										</td>
										<td
											class="whitespace-nowrap px-3 py-3 text-center text-base font-bold text-gray-900 dark:text-white sm:px-6 sm:py-4 sm:text-lg"
										>
											{team.points}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</BackgroundGradient>
		</div>
	</section>

	<!-- Fixtures Section -->
	<section id="fixtures" class="border-t border-gray-200 py-16 dark:border-gray-800 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="mb-12 text-center">
				<h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
					Upcoming Fixtures
				</h2>
				<p class="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">Next matches</p>
			</div>

			<div class="grid gap-4 sm:gap-6 lg:grid-cols-3">
				{#each upcomingMatches as match}
					<BackgroundGradient>
						<div class="rounded-[26px] bg-white p-6 dark:bg-zinc-900 sm:p-8">
							<div class="mb-4 text-center">
								<p class="text-sm text-gray-600 dark:text-gray-400">
									{new Date(match.date).toLocaleDateString('en-US', {
										weekday: 'long',
										month: 'long',
										day: 'numeric'
									})}
								</p>
								<p class="text-lg font-medium text-gray-900 dark:text-white">{match.time}</p>
							</div>

							<div class="flex items-center justify-center gap-4">
								<div class="text-right">
									<p class="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
										Palmerias
									</p>
								</div>
								<div class="rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800">
									<p class="text-sm text-gray-600 dark:text-gray-400">vs</p>
								</div>
								<div>
									<p class="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
										{match.opponent}
									</p>
								</div>
							</div>

							<div class="mt-4 text-center">
								<span
									class={cn(
										'inline-block rounded-full px-4 py-2 text-sm font-medium',
										match.homeAway === 'Hemma'
											? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
											: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
									)}
								>
									{match.homeAway === 'Hemma' ? 'Home' : 'Away'}
								</span>
								<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">{match.location}</p>
							</div>
						</div>
					</BackgroundGradient>
				{/each}
			</div>
		</div>
	</section>

	<!-- Contact Section -->
	<section class="border-t border-gray-200 py-16 dark:border-gray-800 sm:py-24">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<BackgroundGradient>
				<div class="rounded-[26px] bg-white px-6 py-12 text-center dark:bg-zinc-900 sm:px-8 sm:py-16">
					<h2 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
						Get In Touch
					</h2>
					<p class="mt-4 text-base text-gray-600 dark:text-gray-400 sm:text-lg">
						Interested in joining our journey? Contact us today.
					</p>

					<div class="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-3">
						<div>
							<div
								class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
							>
								<span class="text-2xl">📧</span>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Email</h3>
							<p class="mt-2 text-gray-600 dark:text-gray-400">info@palmeriasfc.ae</p>
						</div>
						<div>
							<div
								class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
							>
								<span class="text-2xl">📱</span>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Phone</h3>
							<p class="mt-2 text-gray-600 dark:text-gray-400">+971 4 123 4567</p>
						</div>
						<div>
							<div
								class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800"
							>
								<span class="text-2xl">📍</span>
							</div>
							<h3 class="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
							<p class="mt-2 text-gray-600 dark:text-gray-400">Dubai, United Arab Emirates</p>
						</div>
					</div>
				</div>
			</BackgroundGradient>
		</div>
	</section>

	<!-- Footer -->
	<footer class="border-t border-gray-200 py-8 dark:border-gray-800 sm:py-12">
		<div class="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
			<p class="text-sm text-gray-600 dark:text-gray-400">
				&copy; 2025 Palmerias FC. Founded in Dubai with pride and honor.
			</p>
			<p class="mt-2 text-xs text-gray-500 dark:text-gray-500">
				Excellence across Europe, united in the UAE
			</p>
		</div>
	</footer>
</div>
