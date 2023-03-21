<template>
	<LoadingOverlay v-if="loadingGame || game === null" />
	<div class="game-details-container" v-else>
		<div class="cover">
			<img :src="`/storage/games/covers/${game.slug}.jpg`" />
		</div>

		<div class="info">
			<header>
				<h1>{{ game.name }}</h1>
				<div class="divider"></div>
			</header>

			<div class="game-body">
				<div class="summary">
					{{ game.data['summary'] }}
				</div>

				<div class="buttons">
					<a
						v-for="(file, index) in game.files"
						class="button is-primary"
						:href="`/files${file.path}`"
					>
						Download for {{ file.platform.data.alternative_name }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import config from '../../config'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import axios from 'axios'
import { Game } from '@prisma/client'

import { useRoute } from 'vue-router'

import LoadingOverlay from '../components/LoadingOverlay.vue'

const route = useRoute()

const loadingGame = ref(true)
const game = ref<any>(null)

onMounted(async () => {
	await axios.get(`/api/games/${route.params.slug}`).then((res) => {
		game.value = res.data
		loadingGame.value = false
	})
})
</script>

<style scoped lang="scss">
.game-details-container {
	margin: 2rem;
	display: flex;
}

.cover {
	padding-right: 1rem;
	flex: 0 0 auto;

	& > img {
		border-radius: 0.5rem;
	}
}

.info {
	flex: 1 1 auto;

	& > *:not(:last-child) {
		margin-bottom: 1rem;
	}
}

.game-body {
	display: flex;
}

.buttons {
	display: flex;
	flex-direction: column;
	width: 200px;
	flex: 0 0 auto;

	.button {
		width: 100%;
		justify-content: center;

		&:not(:last-child) {
			margin-bottom: 0.5rem;
		}
	}
}

.summary {
	line-height: 1.5;
	background-color: $black-lighter;
	padding: 2rem;
	border-radius: 0.4em;
	margin-right: 1rem;
}

.glow {
	filter: drop-shadow(0 0 0.05em currentColor)
		drop-shadow(0 0.02em 0.4em transparentize($secondary, 0.5))
		drop-shadow(0 0.01em 0.25em transparentize($primary, 0.9));
}

header {
	width: 100%;
	margin-top: 1rem;
	padding-bottom: 0.25rem;

	h1 {
		font-size: 2rem;
		font-weight: bold;
		text-transform: uppercase;
		color: $white;
	}

	.divider {
		color: $white;
		background-color: currentColor;
		width: 100%;
		margin-top: 0.5rem;
		height: 0.3em;
		border-radius: 20px;
	}
}
</style>
