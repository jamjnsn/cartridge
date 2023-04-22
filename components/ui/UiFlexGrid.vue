<script setup lang="ts">
const styles = {}
</script>

<template>
	<div
		class="flex-grid"
		:style="styles"
	>
		<slot />
		<div
			v-for="i in 20"
			:key="i"
			class="flex-grid__spacer"
		></div>
	</div>
</template>

<style lang="scss">
.flex-grid {
	display: flex;
	flex-wrap: wrap;
	width: 100%;

	& > * {
		width: 100%;
		display: block;
		flex: 1 1 auto;
		margin: 0.5rem;
	}
}
</style>
