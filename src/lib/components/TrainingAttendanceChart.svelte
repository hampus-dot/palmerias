<script lang="ts">
	import { players } from '$lib/data/players';
	import { trainingSessions } from '$lib/data/training';

	// Calculate attendance for each player
	const playerAttendance = players.map((player) => {
		const attended = trainingSessions.filter((t) => t.attendance.includes(player.id)).length;
		const total = trainingSessions.length;
		const percentage = total > 0 ? Math.round((attended / total) * 100) : 0;
		return {
			name: player.name,
			attended,
			total,
			percentage
		};
	});

	// Sort by percentage
	const sortedAttendance = [...playerAttendance].sort((a, b) => b.percentage - a.percentage);

	// Calculate overall stats
	const totalPossibleAttendance = players.length * trainingSessions.length;
	const totalActualAttendance = trainingSessions.reduce(
		(sum, t) => sum + t.attendance.length,
		0
	);
	const overallAttendanceRate = Math.round(
		(totalActualAttendance / totalPossibleAttendance) * 100
	);
</script>

<div class="space-y-4">
	<!-- Overall stats -->
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="rounded-lg bg-gradient-to-br from-green-50 to-green-100 p-4">
			<p class="text-sm font-medium text-green-900">Overall Attendance</p>
			<p class="mt-2 text-3xl font-bold text-green-600">{overallAttendanceRate}%</p>
		</div>
		<div class="rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 p-4">
			<p class="text-sm font-medium text-blue-900">Total Sessions</p>
			<p class="mt-2 text-3xl font-bold text-blue-600">{trainingSessions.length}</p>
		</div>
		<div class="rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 p-4">
			<p class="text-sm font-medium text-purple-900">Avg Players/Session</p>
			<p class="mt-2 text-3xl font-bold text-purple-600">
				{Math.round(totalActualAttendance / trainingSessions.length)}
			</p>
		</div>
	</div>

	<!-- Player attendance bars -->
	<div class="space-y-2">
		<h4 class="text-sm font-semibold text-slate-700">Player Attendance</h4>
		{#each sortedAttendance.slice(0, 10) as player}
			<div class="flex items-center gap-3">
				<div class="w-32 text-sm text-slate-700">
					{player.name.split(' ')[0]}
				</div>
				<div class="flex-1">
					<div class="h-6 overflow-hidden rounded-full bg-slate-100">
						<div
							class="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all"
							style="width: {player.percentage}%"
						></div>
					</div>
				</div>
				<div class="w-16 text-right text-sm font-semibold text-slate-900">
					{player.percentage}%
				</div>
			</div>
		{/each}
	</div>

	<!-- Fun stats -->
	<div class="mt-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
		<p class="text-sm font-medium text-orange-900">
			🏆 Most Dedicated: {sortedAttendance[0].name} ({sortedAttendance[0].percentage}%)
		</p>
	</div>
</div>
