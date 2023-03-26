<template>
	<main class="centered-overlay">
		<slot />
	</main>
</template>

<style lang="scss" scoped>
main {
	background: $black-lighter url('/images/pattern.png');
}
</style>
