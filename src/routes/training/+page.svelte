<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { trainingSessions } from '$lib/data/training';
	import { players } from '$lib/data/players';

	function formatDate(dateStr: string) {
		const date = new Date(dateStr);
		return date.toLocaleDateString('sv-SE', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function getTypeColor(type: string) {
		const colors = {
			Lagtränning: 'bg-blue-100 text-blue-800',
			Matchförberedelse: 'bg-green-100 text-green-800',
			Taktik: 'bg-purple-100 text-purple-800',
			Fysträning: 'bg-orange-100 text-orange-800'
		};
		return colors[type as keyof typeof colors] || 'bg-slate-100 text-slate-800';
	}
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-3xl font-bold text-slate-900">Träningsschema</h1>
		<p class="mt-2 text-slate-600">Kommande och tidigare träningar</p>
	</div>

	<div class="grid gap-6">
		{#each trainingSessions as session}
			<Card>
				<div class="flex items-start justify-between">
					<div class="flex-1">
						<div class="flex items-center gap-3">
							<h3 class="text-lg font-semibold text-slate-900">{formatDate(session.date)}</h3>
							<span class="rounded-full {getTypeColor(session.type)} px-3 py-1 text-xs font-medium">
								{session.type}
							</span>
						</div>
						<div class="mt-2 space-y-1">
							<p class="text-sm text-slate-600">
								<span class="font-medium">Tid:</span>
								{session.time}
							</p>
							<p class="text-sm text-slate-600">
								<span class="font-medium">Plats:</span>
								{session.location}
							</p>
							{#if session.notes}
								<p class="text-sm text-slate-600">
									<span class="font-medium">Anteckningar:</span>
									{session.notes}
								</p>
							{/if}
						</div>
					</div>
					<div class="text-right">
						<p class="text-2xl font-bold text-slate-900">{session.attendance.length}</p>
						<p class="text-sm text-slate-500">/{players.length} spelare</p>
					</div>
				</div>

				<div class="mt-4 border-t border-slate-200 pt-4">
					<p class="mb-2 text-sm font-medium text-slate-700">Närvarande:</p>
					<div class="flex flex-wrap gap-2">
						{#each session.attendance as playerId}
							{@const player = players.find((p) => p.id === playerId)}
							{#if player}
								<span
									class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
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
