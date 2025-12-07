<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { trainingSessions } from '$lib/data/training';
	import { players } from '$lib/data/players';

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getTypeColor(type: string) {
		const colors = {
			'Team Training': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
			'Match Preparation': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
			'Tactics': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
			'Physical Training': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
		};
		return colors[type as keyof typeof colors] || 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200';
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900 dark:text-white">Training Schedule</h1>
		<p class="mt-2 text-slate-600 dark:text-slate-400">Upcoming and past training sessions</p>
	</div>

	<div class="grid gap-6">
		{#each trainingSessions as session}
			<Card>
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<div class="flex items-center gap-3">
							<h3 class="text-lg font-semibold text-slate-900 dark:text-white">{formatDate(session.date)}</h3>
							<span class="rounded-full {getTypeColor(session.type)} px-3 py-1 text-xs font-medium">
								{session.type}
							</span>
						</div>
						<div class="mt-2 space-y-1">
							<p class="text-sm text-slate-600 dark:text-slate-400">
								<span class="font-medium">Time:</span>
								{session.time}
							</p>
							<p class="text-sm text-slate-600 dark:text-slate-400">
								<span class="font-medium">Location:</span>
								{session.location}
							</p>
							{#if session.notes}
								<p class="text-sm text-slate-600 dark:text-slate-400">
									<span class="font-medium">Notes:</span>
									{session.notes}
								</p>
							{/if}
						</div>
					</div>
					<div class="text-right">
						<p class="text-2xl font-bold text-slate-900 dark:text-white">{session.attendance.length}</p>
						<p class="text-sm text-slate-500 dark:text-slate-500">/{players.length} players</p>
					</div>
				</div>

				<div class="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
					<p class="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Attending:</p>
					<div class="flex flex-wrap gap-2">
						{#each session.attendance as playerId}
							{@const player = players.find((p) => p.id === playerId)}
							{#if player}
								<span
									class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-300"
								>
									#{player.number} {player.name}
								</span>
							{/if}
						{/each}
					</div>
				</div>
			</Card>
		{/each}
	</div>
</div>
