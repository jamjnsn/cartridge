<template>
	<div class="layout-panel">
		<div class="layout-panel__content">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
.layout-panel {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;

	&__content {
		width: 600px;
		max-width: 100%;
		margin: 1rem;
	}
}
</style>
