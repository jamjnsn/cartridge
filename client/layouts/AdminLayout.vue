<template>
	<div class="layout">
		<div class="sidebar">
			<div class="sidebar-start">
				<img src="/images/logo-full.png" class="logo" />

				<router-link :to="{ name: 'admin-library' }">
					<feather-icon type="book" /> Library
				</router-link>

				<router-link :to="{ name: 'admin-users' }">
					<feather-icon type="users" /> Users
				</router-link>
			</div>

			<div class="sidebar-end">
				<router-link :to="{ name: 'home' }">
					<feather-icon type="arrow-left" /> Back to Site
				</router-link>
				<router-link :to="{ name: 'logout' }"> <feather-icon type="log-out" /> Logout </router-link>
			</div>
		</div>

		<main>
			<header class="layout-header">
				<slot name="header" />
			</header>

			<hr />

			<slot />
		</main>
	</div>
</template>

<style lang="scss" scoped>
hr {
	height: 3px;
	border-radius: 10px;
	margin-bottom: 1.5rem;
}

.layout {
	display: flex;
	flex-direction: row;
	height: 100%;
	width: 100%;
}

.sidebar {
	display: flex;
	flex-direction: column;
	flex: 0 0 auto;
	width: 250px;
	background-color: $black-lighter;
	justify-content: space-between;

	.logo {
		padding: 1rem;
		width: 100%;
		height: auto;
	}

	a {
		display: flex;
		align-items: center;
		padding: 0.35rem 1rem;
		color: $white-dark;

		&:hover {
			text-decoration: none;
			background-color: lighten($black-lighter, 5%);
		}

		.vue-feather {
			color: transparentize($white, 0.5);
			margin-right: 0.5em;
		}
	}

	.sidebar-end {
		background-color: lighten($black-lighter, 5%);
		padding: 0.5rem 0;
		justify-self: flex-end;

		a {
			&:hover {
				background-color: lighten($black-lighter, 8%);
			}
		}
	}
}

.sidebar,
main {
	overflow-y: auto;
}

main {
	flex: 1 1 auto;
	padding: 2.5rem;
}
</style>

<style lang="scss">
.layout-header {
	display: flex;
	align-items: center;
	justify-content: space-between;

	h1 {
		font-size: 2rem;
		font-family: $alt-font;
		font-weight: bold;
	}

	.controls {
	}
}
</style>
