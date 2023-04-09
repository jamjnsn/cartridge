<script setup lang="ts">
withDefaults(
	defineProps<{
		label?: string | undefined
	}>(),
	{
		label: undefined
	}
)
</script>

<template>
	<div class="field">
		<label
			v-if="label !== undefined"
			class="field__label"
			>{{ label }}</label
		>
		<slot />
	</div>
</template>

<style lang="scss">
.field {
	&:not(:last-child) {
		margin-bottom: 1rem;
	}
}

.field__label {
	display: block;
	font-size: 0.9em;
	padding-left: 0.1em;
	margin-bottom: 0.3rem;
	font-weight: bold;
}
</style>
