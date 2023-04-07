<script setup lang="ts">
const isFocused = ref(false)

withDefaults(
	defineProps<{
		type?: 'text' | 'password' | 'email' | 'tel'
		icon?: UiIconName
		name?: string
		placeholder?: string
	}>(),
	{
		type: 'text',
		icon: undefined,
		name: '',
		placeholder: ''
	}
)
</script>

<template>
	<div
		class="ui-input"
		:class="{
			'is-focused': isFocused
		}"
	>
		<div
			v-if="icon"
			class="ui-input-icon"
		>
			<UiIcon :type="icon" />
		</div>

		<input
			:name="name"
			:type="type"
			:placeholder="placeholder"
			@focus="isFocused = true"
			@blur="isFocused = false"
		/>
	</div>
</template>

<style scoped lang="scss">
input {
	background: none;
	display: block;
	width: 100%;
	color: currentColor;
}

.ui-input {
	display: flex;

	background-color: transparent;
	border-radius: 0.25em;
	color: darken($white-dark, 20%);

	padding: calc(0.5em - 1px) calc(0.7em - 1px);
	overflow: hidden;

	outline: 1px solid $grey-dark;
	transition: all 0.1s ease-in-out;

	&.is-focused {
		outline: 1px solid $primary;
		color: $white-dark;
	}
}

.ui-input-icon {
	display: flex;
	align-items: center;
	margin-right: 0.25em;
}
</style>
