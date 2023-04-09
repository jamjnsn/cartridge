<template>
	<div class="admin-layout">
		<nav class="admin-nav">
			<div class="admin-nav-start">
				<img
					src="/images/logo-full.png"
					class="logo"
				/>

				<NuxtLink to="/"><UiIcon type="users" /> Users</NuxtLink>
			</div>

			<div class="admin-nav-end">
				<NuxtLink to="/"><UiIcon type="arrow-left" /> Back to Site</NuxtLink>
				<NuxtLink to="/logout"><UiIcon type="log-out" /> Logout</NuxtLink>
			</div>
		</nav>

		<div class="admin-page">
			<slot />
		</div>
	</div>
</template>

<style scoped lang="scss">
.admin-layout {
	width: 100%;
	height: 100%;

	display: flex;
}

.admin-nav {
	flex: 0 0 auto;
	width: 250px;
	max-width: 20%;
	background-color: $black-lighter;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.logo {
		display: block;
		width: 100%;
		padding: 1rem;
	}

	a {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;

		&:hover {
			background-color: lighten($black-lighter, 5%);
		}

		.ui-icon {
			margin-right: 0.4em;
			color: transparentize($white, 0.5);
		}
	}
}

.admin-page {
	flex: 1 1 auto;
	padding: 2rem;
}

.admin-nav-start,
.admin-nav-end {
	padding: 1rem 0;
}

.admin-nav-end {
	background-color: lighten($black-lighter, 5%);

	a {
		&:hover {
			background-color: lighten($black-lighter, 8%);
		}
	}
}
</style>
