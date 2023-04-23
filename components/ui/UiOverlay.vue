<template>
	<div class="overlay">
		<div class="overlay__background"></div>
		<slot />
	</div>
</template>

<style lang="scss">
.overlay {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;

	&__background {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(2px);
		transform: scale(1.01);
	}
}
</style>
