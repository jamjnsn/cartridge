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
	<div class="ui-field">
		<label
			v-if="label !== undefined"
			class="ui-field-label"
			>{{ label }}</label
		>
		<slot />
	</div>
</template>

<style lang="scss">
.ui-field {
	&:not(:last-child) {
		margin-bottom: 1rem;
	}
}

.ui-field-label {
	display: block;
	font-size: 0.9em;
	padding-left: 0.1em;
	margin-bottom: 0.3rem;
	font-weight: bold;
}
</style>
