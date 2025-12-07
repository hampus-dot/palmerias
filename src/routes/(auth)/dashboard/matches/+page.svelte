<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { matches } from '$lib/data/matches';
	import { players } from '$lib/data/players';

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('sv-SE', {
			weekday: 'short',
			month: 'short',
			day: 'numeric'
		});
	}

	function getResultColor(match: typeof matches[0]) {
		if (!match.result) return 'bg-slate-100 text-slate-800';
		const diff = match.result.goalsFor - match.result.goalsAgainst;
		if (diff > 0) return 'bg-green-100 text-green-800';
		if (diff < 0) return 'bg-red-100 text-red-800';
		return 'bg-yellow-100 text-yellow-800';
	}

	function getResultText(match: typeof matches[0]) {
		if (!match.result) return 'Ej spelad';
		const diff = match.result.goalsFor - match.result.goalsAgainst;
		if (diff > 0) return 'Vinst';
		if (diff < 0) return 'Förlust';
		return 'Oavgjort';
	}

	const upcomingMatches = matches.filter((m) => !m.result);
	const playedMatches = matches.filter((m) => m.result);
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900">Matcher</h1>
		<p class="mt-2 text-slate-600">Kommande och tidigare matcher</p>
	</div>

	{#if upcomingMatches.length > 0}
		<div>
			<h2 class="mb-4 text-xl font-semibold text-slate-900">Kommande matcher</h2>
			<div class="grid gap-4">
				{#each upcomingMatches as match}
					<Card>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4">
								<div class="text-center">
									<p class="text-sm font-medium text-slate-500">{formatDate(match.date)}</p>
									<p class="text-xs text-slate-400">{match.time}</p>
								</div>
								<div class="flex items-center gap-3">
									<div class="text-right">
										<p class="text-lg font-semibold text-slate-900">Palmerias</p>
									</div>
									<span class="text-xl text-slate-400">vs</span>
									<div>
										<p class="text-lg font-semibold text-slate-900">{match.opponent}</p>
									</div>
								</div>
							</div>
							<div class="text-right">
								<span
									class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
								>
									{match.homeAway}
								</span>
								<p class="mt-1 text-sm text-slate-500">{match.location}</p>
							</div>
						</div>
					</Card>
				{/each}
			</div>
		</div>
	{/if}

	{#if playedMatches.length > 0}
		<div>
			<h2 class="mb-4 text-xl font-semibold text-slate-900">Tidigare matcher</h2>
			<div class="grid gap-4">
				{#each playedMatches as match}
					<Card>
						<div class="space-y-3">
							<div class="flex items-center justify-between">
								<div class="flex items-center gap-4">
									<div class="text-center">
										<p class="text-sm font-medium text-slate-500">{formatDate(match.date)}</p>
										<p class="text-xs text-slate-400">{match.time}</p>
									</div>
									<div class="flex items-center gap-3">
										<div class="text-right">
											<p class="text-lg font-semibold text-slate-900">Palmerias</p>
										</div>
										{#if match.result}
											<div
												class="flex min-w-16 items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2"
											>
												<span class="text-xl font-bold text-slate-900"
													>{match.result.goalsFor}</span
												>
												<span class="text-slate-400">-</span>
												<span class="text-xl font-bold text-slate-900"
													>{match.result.goalsAgainst}</span
												>
											</div>
										{/if}
										<div>
											<p class="text-lg font-semibold text-slate-900">{match.opponent}</p>
										</div>
									</div>
								</div>
								<div class="flex items-center gap-3">
									<span class="rounded-full {getResultColor(match)} px-3 py-1 text-sm font-medium">
										{getResultText(match)}
									</span>
									<span
										class="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
									>
										{match.homeAway}
									</span>
								</div>
							</div>

							{#if match.scorers && match.scorers.length > 0}
								<div class="border-t border-slate-200 pt-3">
									<p class="mb-2 text-sm font-medium text-slate-700">Målskyttar:</p>
									<div class="flex flex-wrap gap-2">
										{#each match.scorers as scorer}
											{@const player = players.find((p) => p.id === scorer.playerId)}
											{#if player}
												<span class="text-sm text-slate-600">
													{player.name} ({scorer.goals})
												</span>
											{/if}
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</Card>
				{/each}
			</div>
		</div>
	{/if}
</div>
