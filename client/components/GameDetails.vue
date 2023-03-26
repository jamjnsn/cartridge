<template>
	<div>
		{{ game.name }}
	</div>
</template>

<script setup lang="ts">
// Move gameview stuff here so you can load game details in the middle of a search

import { Game } from '@prisma/client'

const props = defineProps<{
	game: Game
}>()
</script>
