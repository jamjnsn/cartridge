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
	</RouterLink>
</template>

<script setup lang="ts">
import { Game } from '@prisma/client'
import { RouterLink } from 'vue-router'

const props = defineProps<{
	game: Game
}>()
</script>

<style lang="scss">
.game {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	border-radius: 0.5rem;
	transform: scale(1);
	transition: transform 0.1s ease, box-shadow 0.2s ease;
	box-shadow: none;
	z-index: 1;

	&:hover {
		transform: scale(1.1);
		box-shadow: 0 0.1em 3em $secondary, 0 0.1em 2em $primary, 0 0.1em 1em $black;
		z-index: 5;
	}

	.underlay {
		position: absolute;
		width: 100%;
		height: 100%;
		filter: blur(20px);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
	}
}
</style>
