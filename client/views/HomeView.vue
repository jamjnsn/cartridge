<template>
	<div class="library-container">
		<main>
			<GameLink v-for="game in games" :game="game" />
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<LoadingOverlay v-if="loadingGames" />
		</main>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

import { Game } from '@prisma/client'

import LoadingOverlay from '../components/LoadingOverlay.vue'
import GameLink from '../components/GameLink.vue'

const loadingGames = ref(true)
const games = ref<Game[]>([])

onMounted(async () => {
	await axios.get('/api/games').then((res) => {
		games.value = res.data
		loadingGames.value = false
	})
})
</script>

<style scoped lang="scss">
main {
	overflow-y: auto;
	padding: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}

.game,
.game-spacer {
	$width: 150px;
	$aspect-ratio: calc(4 / 3);

	flex: 1 1 auto;
	margin: 0.5rem;

	width: $width;
	height: calc($width * $aspect-ratio);
}
</style>
