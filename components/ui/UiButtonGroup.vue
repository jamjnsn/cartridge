<script setup lang="ts">
withDefaults(
	defineProps<{
		orientation?: 'horizontal' | 'vertical'
	}>(),
	{
		orientation: 'horizontal'
	}
)
</script>

<template>
	<div
		class="ui-button-group"
		:class="`is-orientation-${orientation}`"
	>
		<slot />
	</div>
</template>

<style lang="scss">
.ui-button-group {
	display: flex;

	&.is-orientation-horizontal {
		flex-direction: row;

		&:not(:last-child) {
			margin-right: 0.5em;
		}
	}

	&.is-orientation-vertical {
		flex-direction: column;

		&:not(:last-child) {
			margin-bottom: 0.5em;
		}
	}
}
</style>
