<template>
	<div class="layout">
		<div class="sidebar">
			<div class="sidebar-start">
				<img src="/images/logo-full.png" class="logo" />

				<!-- <router-link :to="{ name: 'admin-library' }" class="button is-full-width is-primary">
					<feather-icon type="book" /> Library
				</router-link> -->

				<router-link :to="{ name: 'admin-users' }" class="button is-full-width is-primary">
					<feather-icon type="users" /> Users
				</router-link>
			</div>

			<div class="sidebar-end">
				<router-link :to="{ name: 'home' }" class="button is-full-width">
					<feather-icon type="arrow-left" /> Back to Site
				</router-link>
				<router-link :to="{ name: 'logout' }" class="button is-bad is-full-width">
					<feather-icon type="log-out" /> Logout
				</router-link>
			</div>
		</div>

		<main>
			<slot />
		</main>
	</div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/logo.svg'
</script>

<style lang="scss" scoped>
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

	.button:not(:last-child) {
		margin-bottom: 0.5rem;
	}

	.sidebar-end {
		justify-self: flex-end;
	}
}

.logo {
	width: 100%;
	height: auto;
	margin-bottom: 2rem;
}

.sidebar,
main {
	padding: 2rem;
	overflow-y: auto;
}

main {
	flex: 1 1 auto;
}

hr {
	outline: none;
	border: none;
	border-bottom: 1px solid $grey-darker;
}
</style>
