<template>
	<div class="icon" :class="{ 'is-open': isOpen }">
		<span><div></div></span>
		<span><div></div></span>
		<span><div></div></span>
		<span><div></div></span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	isOpen: Boolean
})
</script>

<style lang="scss" scoped>
$width: 27px;
$height: 20px;
$bar-height: 5px;
$bar-spacing: 3px;

.icon {
	width: $width;
	height: $height;
	position: relative;
	transform: scale(1);
	transition: transform 0.2s ease-in-out, color 0.2s ease, filter 0.1s ease;
	cursor: pointer;

	&:hover {
		filter: drop-shadow(0 0.02em 0.75em $primary);

		span > div {
			opacity: 1;
		}
	}

	span {
		display: block;
		position: absolute;
		height: $bar-height;
		width: 100%;
		background: currentColor;
		border-radius: 12px;
		opacity: 1;
		left: 0;
		transform: rotate(0deg) scale(1);
		transition: all 0.25s ease-in-out;

		& > div {
			position: absolute;
			width: 100%;
			height: 100%;
			background: $fancy-gradient;
			border-radius: 12px;
			opacity: 0;
			transition: all 0.1s ease;
		}
	}

	span:nth-child(1) {
		top: 0px;
	}

	span:nth-child(2),
	span:nth-child(3) {
		top: calc($height / 3 + ($bar-height / 2));
	}

	span:nth-child(4) {
		top: calc($height / 3 * 2 + ($bar-height / 2 * 2));
	}
}

.icon.is-open {
	&:hover {
		transform: scale(1.02);
	}

	span {
		& > div {
			background: none;
		}
	}

	span:nth-child(1) {
		transform: scale(0);
	}

	span:nth-child(2) {
		transform: rotate(45deg);
	}

	span:nth-child(3) {
		transform: rotate(-45deg);
	}

	span:nth-child(4) {
		transform: scale(0);
	}
}
</style>
