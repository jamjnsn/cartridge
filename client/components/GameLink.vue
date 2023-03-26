<template>
	<RouterLink
		:to="{
			name: 'game',
			params: { slug: game.slug }
		}"
		class="game"
	>
		<div
			class="underlay"
			:style="{
				backgroundImage: `url(/storage/games/covers/${game.slug}.jpg)`
			}"
		></div>
		<img :src="`/storage/games/covers/${game.slug}.jpg`" />
		<div class="overlay"></div>
	</RouterLink>
</template>

<script setup lang="ts">
import { Game } from '@prisma/client'

const props = defineProps<{
	game: Game
}>()
</script>

<style scoped lang="scss">
.game {
	$border-radius: 0.4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: $border-radius;
	transform: scale(1);
	transition: transform 0.1s ease, box-shadow 0.1s ease;
	box-shadow: 0 0.1em 0.25em $black;
	z-index: 1;

	&:hover {
		transform: scale(1.1);
		box-shadow: 0 0.05em 0.5em $black, 0 0.1em 2em transparentize($secondary, 0.2),
			0 0.1em 1em transparentize($primary, 0.2);
		z-index: 5;
	}

	.underlay,
	.overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: $border-radius;
	}

	.underlay {
		filter: blur(20px);
	}

	.overlay {
		box-shadow: inset 0 -0.2em 0 transparentize($black, 0.5);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		border-radius: $border-radius;
	}
}
</style>
