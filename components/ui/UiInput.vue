<script setup lang="ts">
const isFocused = ref(false)
const isRevealed = ref(false)

const suggestionOptions = ref<string[]>([])

const input = ref<HTMLInputElement>()

const currentErrors = ref<string[]>([])
const errors = computed({
	get: () => currentErrors.value,
	set: (val) => {
		console.log(val)
		currentErrors.value = val
		emit('update:errors', val)
	}
})

const hasError = computed(() => {
	return currentErrors.value.length > 0
})

const rootClasses = computed(() => {
	return [
		'input',
		{ '-focused': isFocused.value },
		{ '-error': hasError },
		{ '-disabled': props.disabled }
	]
})

const emit = defineEmits<{
	(event: 'update:modelValue', payload: string): void
	(event: 'update:errors', payload: string[]): void
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
		revealable?: boolean
		disabled?: boolean
		suggestions?: string[] | undefined
	}>(),
	{
		modelValue: undefined,
		type: 'text',
		icon: undefined,
		name: '',
		placeholder: '',
		clearable: false,
		required: false,
		revealable: false,
		disabled: false,
		suggestions: undefined
	}
)

const clearInput = () => {
	emit('update:modelValue', '')
	input.value?.focus()
}

const toggleReveal = () => {
	isRevealed.value = !isRevealed.value
}

const findSuggestions = () => {
	suggestionOptions.value = []

	// ToDo: Filter suggestions here
	suggestionOptions.value = props.suggestions || []
}

const onInput = (event: Event) => {
	emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const selectSuggestion = (suggestion: string) => {
	if (input.value) {
		input.value.value = suggestion
		suggestionOptions.value = []
		emit('update:modelValue', suggestion)
		input.value.focus()
	}
}

const onFocus = () => {
	isFocused.value = true

	findSuggestions()
}

const onBlur = () => {
	isFocused.value = false
	suggestionOptions.value = []
}

const onInvalid = (event: any) => {
	// Add blank message for HTML validation error
	errors.value = ['']
}
</script>

<template>
	<div :class="rootClasses">
		<div
			v-if="icon"
			class="input__icon"
		>
			<UiIcon :type="icon" />
		</div>

		<input
			ref="input"
			:name="name"
			:type="revealable ? (isRevealed ? 'text' : 'password') : type"
			:placeholder="placeholder"
			:required="required"
			:value="modelValue"
			:disabled="disabled"
			@input="onInput"
			@focus="onFocus"
			@blur="onBlur"
			@invalid="onInvalid"
		/>

		<Transition>
			<div
				v-if="clearable && modelValue !== '' && !disabled"
				class="input__clear"
				@click="clearInput"
			>
				<UiIcon type="x-circle" />
			</div>
		</Transition>

		<Transition>
			<div
				v-if="revealable && type === 'password' && !disabled"
				class="input__reveal"
				@click="toggleReveal"
			>
				<UiIcon :type="isRevealed ? 'eye-off' : 'eye'" />
			</div>
		</Transition>

		<Transition>
			<div
				v-if="suggestionOptions.length > 0"
				class="input__suggestions"
			>
				<div
					v-for="suggestion in suggestions"
					:key="suggestion"
					class="input__suggestion"
					@click="selectSuggestion(suggestion)"
				>
					{{ suggestion }}
				</div>
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

	&.-disabled {
		background-color: $black-lighter;
	}
}

.input__reveal,
.input__clear {
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 0.25em;
	color: $grey;
	transition: all 0.2s ease;

	&:hover {
		color: $white;
	}
}

.input__icon {
	display: flex;
	align-items: center;
	margin-right: 0.25em;
}

.input__suggestions {
	display: block;
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	background-color: $grey-darker;
	border-radius: 0.3em;
	margin-top: 0.25em;
	padding: 0.25em;
	box-shadow: 0 0.1em 0.4em rgba(0, 0, 0, 0.4);
}

.input__suggestion {
	display: block;
	padding: 0.5em;
	background-color: transparent;
	transition: all 0.1s ease;
	border-radius: 0.2em;
	cursor: pointer;

	&:hover {
		background-color: $grey-dark;
	}
}
</style>
