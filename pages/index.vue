<template>
	<div>
		<UiPanel>
			<UiTooltip label="henlo"><UiButton>Hover Me</UiButton></UiTooltip>
		</UiPanel>
	</div>
</template>

<script setup lang="ts">
import { User } from '@prisma/client'

const user = useUser()

definePageMeta({
	middleware: ['require-login']
})
</script>

<style scoped lang="scss">
div {
	width: 500px;
}
</style>
