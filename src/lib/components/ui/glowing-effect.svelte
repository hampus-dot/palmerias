<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		spread?: number;
		glow?: boolean;
		disabled?: boolean;
		proximity?: number;
		inactiveZone?: number;
	}

	let {
		spread = 40,
		glow = true,
		disabled = false,
		proximity = 64,
		inactiveZone = 0.01
	}: Props = $props();

	let cardRef: HTMLDivElement | null = $state(null);
	let glowRef: HTMLDivElement | null = $state(null);
	let isHovering = $state(false);

	onMount(() => {
		if (!cardRef || disabled) return;

		const handleMouseMove = (e: MouseEvent) => {
			if (!cardRef || !glowRef) return;

			const rect = cardRef.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			const centerX = rect.width / 2;
			const centerY = rect.height / 2;

			const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
			const maxDistance = Math.sqrt(Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2));

			if (distance < proximity) {
				isHovering = true;
			} else if (distance > maxDistance * (1 - inactiveZone)) {
				isHovering = false;
			}

			if (glow && glowRef) {
				glowRef.style.background = `radial-gradient(${spread}px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 100%)`;
			}
		};

		const handleMouseLeave = () => {
			isHovering = false;
		};

		cardRef.addEventListener('mousemove', handleMouseMove);
		cardRef.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			cardRef?.removeEventListener('mousemove', handleMouseMove);
			cardRef?.removeEventListener('mouseleave', handleMouseLeave);
		};
	});
</script>

<div
	bind:this={cardRef}
	class="absolute inset-0 overflow-hidden rounded-2xl md:rounded-3xl"
	style="pointer-events: none;"
>
	{#if glow && !disabled}
		<div
			bind:this={glowRef}
			class="absolute inset-0 opacity-0 transition-opacity duration-300"
			class:opacity-100={isHovering}
		></div>
	{/if}
</div>
