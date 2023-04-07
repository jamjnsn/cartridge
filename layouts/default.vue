<template>
	<div class="centered-container">
		<main>
			<slot />
		</main>
	</div>
</template>

<style lang="scss">
#__nuxt {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	overflow-x: scroll;
}

.centered-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}
</style>
