<template>
	<div class="overlay">
		<LoadingSpinner />
	</div>
</template>

<style scoped lang="scss">
.overlay {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.8);
	display: flex;
	align-items: center;
	justify-content: center;
	backdrop-filter: blur(1px);
}
</style>

<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue'
</script>
