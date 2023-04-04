<template>
	<div class="parallax-container" v-if="game !== null">
		<div
			class="parallax-background"
			:style="{
				backgroundImage: `url(/storage/media/screenshots/${game.slug}.jpg)`
			}"
		></div>
	</div>

	<a class="close-button" @click="$emit('closeButtonClicked')">
		<FeatherIcon type="x" />
	</a>

	<div class="game-page" v-if="game !== null">
		<div class="cover">
			<img :src="`/storage/media/covers/${game.slug}.jpg`" />

			<a
				class="button is-primary"
				v-for="(file, key) in game.files"
				:key="key"
				:href="`/files/${file.path}`"
				><FeatherIcon type="download" /> {{ file.platform.data.abbreviation }}</a
			>
		</div>

		<div class="info">
			<header>
				<h1>{{ game.name }}</h1>
			</header>

			<div class="summary">
				{{ game.data.summary }}
			</div>
		</div>
	</div>

	<LoadingOverlay v-if="loadingGame || game === null" />
</template>

<script setup lang="ts">
import { Game } from '.prisma/client'

const route = useRoute()
const axios = useAxios()

const loadingGame = ref(true)
const game = ref<any>(null)

const props = defineProps<{
	slug: string
}>()

const emit = defineEmits<{
	(e: 'closeButtonClicked'): void
}>()

onMounted(async () => {
	await axios.get(`/api/games/${props.slug}`).then((res) => {
		game.value = res.data
		loadingGame.value = false
	})
})
</script>

<style scoped lang="scss">
$parallax-height: 250px;

.parallax-container {
	position: absolute;
	z-index: 0;

	width: 100%;
	height: $parallax-height;

	overflow: hidden;

	.parallax-background {
		width: 100%;
		height: 100%;
		background-color: $primary;
		background-position: center center;
		background-size: cover;
		filter: blur(5px) saturate(90%);
		opacity: 0.6;
		transform: scale(1.1);
	}
}

.close-button {
	position: absolute;
	top: 1rem;
	right: 1rem;
	font-size: 2.5rem;
	color: $white;
	opacity: 0.8;
	transition: all 0.1s ease-in-out;
	transform: scale(1);

	&:hover {
		text-decoration: none;
		opacity: 1;
		transform: scale(1.1);
	}
}

.game-page {
	display: flex;
	margin: 0 auto;
	width: 900px;
	max-width: 98%;

	.cover {
		margin-top: 80px;
		flex: 0 0 auto;

		img {
			border-radius: 0.25rem;
			box-shadow: 0 0.1em 1em #242424;
		}

		*:not(:last-child) {
			margin-bottom: 0.5rem;
		}

		a {
			display: flex;
		}
	}

	.info {
		margin-left: 3rem;
		flex: 1 1 auto;

		header,
		.summary {
			padding: 1.5rem 0;
		}

		header {
			display: flex;
			justify-content: flex-end;
			flex-direction: column;
			height: $parallax-height;

			h1 {
				font-size: 2.5rem;
				font-family: $alt-font;
				font-weight: bold;
				line-height: 1.2;
				text-shadow: 0 0.05em 0.3em rgba(0, 0, 0, 0.25);
			}
		}

		.summary {
		}
	}
}
</style>

<route>
{
	name: "game"
}
</route>
