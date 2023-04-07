<script setup lang="ts">
import * as feather from 'feather-icons'

const props = withDefaults(
	defineProps<{
		type: UiIconName
		size?: string
	}>(),
	{
		size: '1em'
	}
)

const icon = computed(() => {
	return feather.icons[props.type].contents
})
</script>

<template>
	<i class="ui-icon">
		<svg
			class="ui-icon-svg"
			xmlns="http://www.w3.org/2000/svg"
			:width="size"
			:height="size"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			v-html="icon"
		></svg>
	</i>
</template>

<style scoped lang="scss">
.ui-icon {
	display: inline-flex;
	align-items: center;
}
</style>
