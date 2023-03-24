<template>
	<LibraryLayout>
		<LoadingOverlay v-if="loadingGames" />
		<div class="library-container" v-else>
			<GameLink v-for="(game, index) in games" v-key="index" :game="game" />
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
			<div class="game-spacer"></div>
		</div>
	</LibraryLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

import type { Game } from '@prisma/client'

import LibraryLayout from '@/components/layouts/LibraryLayout.vue'

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
$game-width: 150px;
$game-aspect-ratio: calc(4 / 3);

.library-container {
	overflow-y: auto;
	padding: 1.5rem;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
}

.game,
.game-spacer {
	flex: 1 1 auto;
}

.game-spacer {
	width: calc($game-width + 1rem);
}

.game {
	width: $game-width;

	height: calc($game-width * $game-aspect-ratio);
	margin: 0.5rem;
}
</style>
