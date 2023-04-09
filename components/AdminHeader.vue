<template>
	<header class="admin-page-header">
		<slot />
		<hr />
	</header>
</template>

<style scoped lang="scss">
.admin-page-header {
	margin-bottom: 1rem;

	hr {
		background-color: $black-lighter;
		height: 3px;
		border-radius: 5px;
		width: 100%;
		margin-top: 0.25rem;
	}
}
</style>

<style lang="scss">
.admin-page h1 {
	font-size: 1.7rem;
	font-weight: bold;
}
</style>
