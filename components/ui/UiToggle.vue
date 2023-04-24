<script setup lang="ts">
const props = defineProps({
	modelValue: Boolean,
	disabled: Boolean
})

const emit = defineEmits(['update:modelValue'])

const isOn = ref(props.modelValue)

const toggle = (event: any) => {
	isOn.value = !isOn.value
	emit('update:modelValue', isOn.value)
}
</script>

<template>
	<label
		class="toggle"
		:class="{ 'is-disabled': disabled }"
	>
		<input
			type="checkbox"
			:checked="isOn"
			:disabled="disabled"
			@click="toggle"
		/>
		<div class="toggle__handle"></div>

		<div class="toggle__label">
			<slot />
		</div>
	</label>
</template>

<style scoped lang="scss">
$handle-width: 15px;
$padding: 5px;

.toggle {
	position: relative;
	display: inline-flex;
	align-items: center;
	cursor: pointer;

	input {
		display: none;
	}

	&.is-disabled {
		input:checked + .toggle {
			background-color: $grey-dark;
		}

		.toggle:before {
			background-color: transparentize($black, 0.75);
		}

		.toggle {
			background-color: $grey-dark;
		}
	}
}

.toggle__handle {
	width: calc($handle-width * 2 + $padding * 2);
	height: calc($handle-width + $padding * 2);
	background-color: $grey;
	transition: 0.2s;
	border-radius: $handle-width;
	margin-right: 0.5em;
}

.toggle__handle:before {
	position: absolute;
	content: '';
	height: $handle-width;
	width: $handle-width;
	left: $padding;
	bottom: $padding;
	background-color: $white;
	transition: 0.2s;
	border-radius: 50%;
}

input:checked + .toggle__handle {
	background-color: $primary;
}

input:checked + .toggle__handle:before {
	transform: translateX($handle-width);
}
</style>
