<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let email = $state('');
	let password = $state('');
	let isManager = $state(false);

	$effect(() => {
		isManager = $page.url.searchParams.get('type') === 'manager';
	});

	function handleLogin() {
		// Simple mock authentication
		if (isManager) {
			// Mock manager login
			if (email === 'manager@palmerias.se' || password === 'manager') {
				localStorage.setItem('user', JSON.stringify({ role: 'manager', email }));
				goto('/manager');
			}
		} else {
			// Mock player login - any player from our list
			localStorage.setItem('user', JSON.stringify({ role: 'player', email }));
			goto('/player');
		}
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
	<div class="flex min-h-screen items-center justify-center px-4">
		<div class="w-full max-w-md">
			<div class="mb-8 text-center">
				<h1 class="text-4xl font-bold text-white">
					{isManager ? 'Manager' : 'Player'} Login
				</h1>
				<p class="mt-2 text-slate-300">Sign in to access your dashboard</p>
			</div>

			<div class="overflow-hidden rounded-2xl bg-white/10 p-8 backdrop-blur-sm">
				<form onsubmit={(e) => { e.preventDefault(); handleLogin(); }} class="space-y-6">
					<div>
						<label for="email" class="block text-sm font-medium text-slate-300">Email</label>
						<input
							type="email"
							id="email"
							bind:value={email}
							class="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder={isManager ? 'manager@palmerias.se' : 'player@palmerias.se'}
							required
						/>
					</div>

					<div>
						<label for="password" class="block text-sm font-medium text-slate-300">Password</label>
						<input
							type="password"
							id="password"
							bind:value={password}
							class="mt-1 block w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter your password"
							required
						/>
					</div>

					{#if isManager}
						<div class="rounded-lg bg-blue-500/10 p-4">
							<p class="text-sm text-blue-300">Demo: manager@palmerias.se / manager</p>
						</div>
					{:else}
						<div class="rounded-lg bg-blue-500/10 p-4">
							<p class="text-sm text-blue-300">Demo: Any email / password</p>
						</div>
					{/if}

					<button
						type="submit"
						class="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
					>
						Sign In
					</button>

					<div class="text-center">
						<a
							href={isManager ? '/login' : '/login?type=manager'}
							class="text-sm text-slate-400 hover:text-white"
						>
							{isManager ? 'Sign in as Player' : 'Sign in as Manager'}
						</a>
					</div>

					<div class="text-center">
						<a href="/" class="text-sm text-slate-400 hover:text-white">
							← Back to home
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
