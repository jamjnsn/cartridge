<template>
	<header class="admin-header">
		<div class="admin-header__content">
			<slot />
		</div>

		<hr />
	</header>
</template>

<style lang="scss">
.admin-header {
	margin-bottom: 1rem;

	h1 {
		font-size: 1.7rem;
		font-weight: bold;
	}

	hr {
		background-color: $black-lighter;
		height: 3px;
		border-radius: 5px;
		width: 100%;
		margin-top: 0.25rem;
	}
}

.admin-header__content {
	align-items: center;
	display: flex;
	justify-content: space-between;
}
</style>
