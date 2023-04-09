<template>
	<div class="layout-admin">
		<nav class="layout-admin__nav">
			<div class="layout-admin__nav-start">
				<img
					src="/images/logo-full.png"
					class="layout-admin__nav-logo"
				/>

				<NuxtLink to="/admin"><UiIcon type="home" /> Dashboard</NuxtLink>
				<NuxtLink to="/admin/users"><UiIcon type="users" /> Users</NuxtLink>
			</div>

			<div class="layout-admin__nav-end">
				<NuxtLink to="/"><UiIcon type="arrow-left" /> Back to Site</NuxtLink>
				<NuxtLink to="/logout"><UiIcon type="log-out" /> Logout</NuxtLink>
			</div>
		</nav>

		<div class="layout-admin__page">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
.layout-admin {
	width: 100%;
	height: 100%;

	display: flex;
}

.layout-admin__nav {
	flex: 0 0 auto;
	width: 250px;
	max-width: 20%;
	background-color: $black-lighter;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&-logo {
		display: block;
		width: 100%;
		padding: 1rem;
	}

	&-start,
	&-end {
		padding: 1rem 0;
	}

	&-end {
		background-color: lighten($black-lighter, 5%);

		a {
			&:hover {
				background-color: lighten($black-lighter, 8%);
			}
		}
	}

	a {
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;

		&:hover {
			background-color: lighten($black-lighter, 5%);
		}

		.icon {
			margin-right: 0.4em;
			color: transparentize($white, 0.5);
		}
	}
}

.layout-admin__page {
	flex: 1 1 auto;
	padding: 2rem;
}
</style>
