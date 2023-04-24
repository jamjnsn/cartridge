<script setup lang="ts">
const select = ref<HTMLSelectElement>()

const isFocused = ref(false)
const isOpened = ref(false)

const rootClasses = computed(() => {
	return ['ui-select', { '-focused': isFocused.value }, { '-disabled': props.disabled }]
})

const emit = defineEmits<{
	(event: 'update:modelValue', payload: string): void
}>()

const props = withDefaults(
	defineProps<{
		modelValue?: string
		icon?: UiIconName
		options?: UiSelectOptions[]
		placeholder?: string
		required?: boolean
		disabled?: boolean
	}>(),
	{
		modelValue: undefined,
		options: undefined,
		placeholder: undefined,
		required: false,
		icon: undefined,
		disabled: false
	}
)

const onInput = (event: Event) => {
	emit('update:modelValue', (event.target as HTMLInputElement).value)
}

const onFocus = () => {
	isFocused.value = true
}

const onBlur = () => {
	isFocused.value = false
}
</script>

<template>
	<div :class="rootClasses">
		<select
			ref="select"
			:disabled="disabled"
			@focus="onFocus"
			@blur="onBlur"
			@change="onInput"
		>
			<slot v-if="options === undefined" />
			<template v-else>
				<option
					v-if="placeholder"
					value=""
					:selected="modelValue === undefined"
					:disabled="required"
				>
					{{ placeholder }}
				</option>

				<option
					v-for="option in options"
					:key="option.name"
					:value="option.val"
					:selected="modelValue === option.val"
				>
					{{ option.name }}
				</option>
			</template>
		</select>
	</div>
</template>

<style lang="scss">
.ui-select {
	position: relative;
	display: flex;
	width: 100%;
	align-items: center;
	z-index: 1;

	// ToDo: Find out why this is normally less than input fields
	min-height: 35px;

	background-color: transparent;
	border-radius: 0.25em;
	color: darken($white-dark, 20%);

	outline: 1px solid $grey-dark;
	border: 0;
	transition: all 0.1s ease-in-out;

	& > select {
		padding: calc(0.5em - 1px) calc(0.7em - 1px);
		background-color: transparent;
		border: 0;
		outline: 0;
		color: currentColor;
		width: 100%;
	}

	&.-focused {
		outline: 1px solid $primary;
		color: $white-dark;
	}

	&.-disabled {
		background-color: $black-lighter;
	}

	&__icon {
		display: flex;
		align-items: center;
		margin-right: 0.25em;
	}
}
</style>
