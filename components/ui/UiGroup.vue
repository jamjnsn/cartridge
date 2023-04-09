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
		class="group"
		:class="`-${orientation}`"
	>
		<slot />
	</div>
</template>

<style lang="scss">
.group {
	display: flex;

	&.-horizontal {
		flex-direction: row;

		&:not(:last-child) {
			margin-right: 0.5em;
		}
	}

	&.-vertical {
		flex-direction: column;

		&:not(:last-child) {
			margin-bottom: 0.5em;
		}
	}
}
</style>
