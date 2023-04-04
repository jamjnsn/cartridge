<template>
	<div id="layout">
		<LibraryNav id="nav" @search-changed="onSearchChanged" />

		<div
			id="game-list"
			:class="{
				'no-scroll': selectedGame !== undefined
			}"
		>
			<GameList :games="games" v-if="games.length > 0" @game-clicked="onGameClicked" />

			<LoadingOverlay v-if="loadingGames && games.length <= 0" />

			<Transition>
				<div id="game-view" v-if="selectedGame !== undefined">
					<GameView :slug="selectedGame.slug" @close-button-clicked="onGameCloseClicked" />
				</div>
			</Transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Game } from '@prisma/client'

const axios = useAxios()

const loadingGames = ref(true)

const defaultGames: Game[] = []
const games = ref<Game[]>([])

const selectedGame = ref<Game>()

const onGameClicked = (game: Game) => {
	selectedGame.value = game
}

const onSearchChanged = (search: string) => {
	loadingGames.value = true

	axios
		.get('/api/games', {
			params: {
				search
			}
		})
		.then((res) => {
			games.value = res.data
			loadingGames.value = false
		})
}

const onGameCloseClicked = () => {
	selectedGame.value = undefined
}

onMounted(async () => {
	onSearchChanged('')
})
</script>

<style scoped lang="scss">
#layout {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: $black-lighter;
}

#nav {
	flex: 0 0 auto;
}

#game-list {
	flex: 1 1 auto;
	overflow-y: auto;
}

#game-view {
	z-index: 10;
	position: fixed;
	top: 80px;
	left: 0;
	bottom: 0;
	right: 0;
	overflow-y: auto;
	background-color: $black-lighter;
}
</style>

<route>
{
	name: "home"
}
</route>
