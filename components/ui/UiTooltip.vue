<script setup lang="ts">
withDefaults(
	defineProps<{
		label: string
	}>(),
	{}
)
</script>

<template>
	<div class="tooltip">
		<div class="tooltip__content">
			{{ label }}
		</div>
		<slot />
	</div>
</template>

<style lang="scss">
$tooltip-size: 5px;

.tooltip {
	width: auto;
	display: inline-flex;

	&:hover {
		.tooltip__content {
			opacity: 1;
			transform: translateY(-100%) translateX(-50%) scale(1);
		}
	}
}

.tooltip__content {
	opacity: 0;
	min-width: 50px;
	text-align: center;
	z-index: 1;
	position: absolute;
	background-color: $primary;
	padding: 0.3em 0.5em;
	top: calc(($tooltip-size + 0.35rem) * -1);
	left: 50%;
	transform: translateY(-100%) translateX(-50%) scale(0);
	border-radius: 0.2em;
	filter: drop-shadow(0 2px 0 darken($primary, 8%));
	transition: all 0.1s ease;

	&::after {
		content: '';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -$tooltip-size;
		border-width: $tooltip-size;
		border-style: solid;
		border-color: $primary transparent transparent transparent;
	}
}
</style>
