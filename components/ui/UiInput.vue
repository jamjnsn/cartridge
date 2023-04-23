<script setup lang="ts">
const isFocused = ref(false)
const input = ref<HTMLInputElement>()

const emit = defineEmits<{
	(event: 'update:modelValue', payload: string): void
}>()

const props = withDefaults(
	defineProps<{
		modelValue?: string
		type?: 'text' | 'password' | 'email' | 'tel'
		icon?: UiIconName
		name?: string
		placeholder?: string
		clearable?: boolean
		required?: boolean
	}>(),
	{
		modelValue: '',
		type: 'text',
		icon: undefined,
		name: '',
		placeholder: '',
		clearable: false,
		required: false
	}
)

const updateInput = (event: Event) => {
	emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const clearInput = () => {
	emit('update:modelValue', '')
	input.value?.focus()
}
</script>

<template>
	<div
		class="input"
		:class="{
			'-focused': isFocused
		}"
	>
		<div
			v-if="icon"
			class="input__icon"
		>
			<UiIcon :type="icon" />
		</div>

		<input
			ref="input"
			:name="name"
			:type="type"
			:placeholder="placeholder"
			:value="modelValue"
			:required="required"
			@input="updateInput"
			@focus="isFocused = true"
			@blur="isFocused = false"
		/>

		<Transition>
			<div
				v-if="clearable && modelValue !== ''"
				class="input__clear"
				@click="clearInput"
			>
				<UiIcon type="x-circle" />
			</div>
		</Transition>
	</div>
</template>

<style lang="scss">
.input {
	position: relative;
	display: flex;
	align-items: center;
	width: 100%;

	z-index: 1;

	background-color: transparent;
	border-radius: 0.25em;
	color: darken($white-dark, 20%);

	padding: calc(0.5em - 1px) calc(0.7em - 1px);

	outline: 1px solid $grey-dark;
	transition: all 0.1s ease-in-out;

	& > input {
		flex: 1 1 auto;
		background: none;
		display: block;
		color: currentColor;
	}

	&.-focused {
		outline: 1px solid $primary;
		color: $white-dark;
	}
}

.input__clear {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 0.25em;
}

.input__icon {
	display: flex;
	align-items: center;
	margin-right: 0.25em;
}
</style>
