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
		class="toggle-container"
		:class="{ 'is-disabled': disabled }"
	>
		<input
			type="checkbox"
			:checked="isOn"
			:disabled="disabled"
			@click="toggle"
		/>
		<div class="toggle"></div>
	</label>
</template>

<style scoped lang="scss">
$handle-width: 15px;
$padding: 5px;

.toggle-container {
	position: relative;
	display: inline-block;
	width: calc($handle-width * 2 + $padding * 2);
	height: calc($handle-width + $padding * 2);

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

.toggle {
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: $grey;
	transition: 0.2s;
}

.toggle:before {
	position: absolute;
	content: '';
	height: $handle-width;
	width: $handle-width;
	left: $padding;
	bottom: $padding;
	background-color: $white;
	transition: 0.2s;
}

input:checked + .toggle {
	background-color: $primary;
}

input:checked + .toggle:before {
	transform: translateX($handle-width);
}

.toggle {
	border-radius: $handle-width;
}

.toggle:before {
	border-radius: 50%;
}
</style>
