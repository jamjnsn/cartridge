<template>
	<div class="overlay">
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
	background-color: rgba(0, 0, 0, 0.25);
	backdrop-filter: blur(2px);
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
