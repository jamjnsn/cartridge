<template>
	<TransitionGroup name="games" tag="div" class="games">
		<GameCover
			class="game"
			v-for="game in games"
			:key="game.id"
			:game="game"
			@click="$emit('gameClicked', game)"
		>
			{{ game.name }}
		</GameCover>
		<div class="spacer" v-for="n in 10" :key="n"></div>
	</TransitionGroup>
</template>

<script setup lang="ts">
import type { Game } from '@prisma/client'

const emit = defineEmits<{
	(e: 'gameClicked', game: Game): void
}>()

const props = defineProps<{
	games: Game[]
}>()
</script>

<style scoped lang="scss">
$game-width: 150px;
$game-aspect-ratio: calc(4 / 3);

.games {
	padding: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}

.game,
.spacer {
	flex: 1 1 auto;
}

.spacer {
	width: calc($game-width + 1rem);
}

.game {
	width: $game-width;

	height: calc($game-width * $game-aspect-ratio);
	margin: 0.5rem;
}
</style>
