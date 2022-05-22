<canvas bind:this={canvas} />

<script lang="ts">
	import Experience from '$lib/Experience';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const experience = new Experience(canvas);
	});
</script>

<style>
	canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
