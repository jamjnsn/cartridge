<template>
	<div class="library-container">
		<nav>
			<div>
				<router-link to="/" class="home-link">
					<inline-svg :src="logo" class="logo" />
				</router-link>
			</div>

			<div class="search-container">
				<input
					class="search-input"
					v-model="searchQuery"
					type="text"
					ref="searchInput"
					placeholder="Search..."
				/>
			</div>

			<div class="menu-container">
				<div class="menu-button" :class="{ 'is-active': menuIsOpen }" @click="toggleMenu">
					<MenuIcon :is-open="menuIsOpen" />
				</div>

				<div class="menu" v-if="menuIsOpen">
					<div class="menu-item">
						<router-link to="/logout">Logout</router-link>
					</div>
				</div>
			</div>
		</nav>

		<main>...</main>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import { RouterLink } from 'vue-router'
import MenuIcon from '../components/MenuIcon.vue'

import logo from '../assets/images/logo.svg'

const searchInput = ref<HTMLInputElement | null>(null)

const menuIsOpen = ref(false)
const searchQuery = ''

const toggleMenu = () => {
	menuIsOpen.value = !menuIsOpen.value
}

const onKeyPress = (e: any) => {
	if (e.key === '/') {
		e.preventDefault()
		searchInput.value?.focus()
	}
}

onMounted(() => {
	window.addEventListener('keypress', onKeyPress)
})

onUnmounted(() => {
	window.removeEventListener('keypress', onKeyPress)
})
</script>

<style scoped lang="scss">
$menu-height: 80px;

.library-container {
	display: flex;
	flex-direction: column;
	position: absolute;
	width: 100vw;
	height: 100vh;
}

nav {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	padding: 1rem 2rem;
	background-color: $black-light;
	height: $menu-height;

	z-index: 10;

	& > div {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.home-link {
		display: flex;
		height: 100%;
		align-items: center;
		padding-right: 1rem;

		&:hover {
			.logo {
				filter: drop-shadow(0 0.02em 0.5em $primary) drop-shadow(0 0.02em 1.5em $secondary)
					drop-shadow(0 0.01em 0.5em $black);
				transform: scale(1.05);
			}
		}

		.logo {
			display: block;
			width: 25px;
			height: auto;
			filter: none;
			transform: scale(1);
			transition: all 0.15s ease;
		}
	}

	.home-link,
	.menu-container {
		flex: 0 0 auto;
	}

	.search-container {
		flex: 1 1 auto;

		.search-input {
			position: static;
			z-index: 15;
			display: block;
			width: 100%;
			padding: 0.75em 1em;
			border-radius: 0.25em;
			outline-width: 0.1em;

			&:focus {
				box-shadow: 0 0.05em 1em $primary;
				outline-color: $secondary;
				transform: scale(1.005);
			}
		}
	}

	.menu-container {
		margin-left: 0.5rem;

		.menu-button {
			width: calc($menu-height - 2rem); // Navbar top + bottom padding
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			color: $grey;
			text-shadow: 0 0.05em 0.5em transparent;
			filter: drop-shadow(0 0.05em 0.5em transparentize($white, 0.8));
			cursor: pointer;

			transition: all 0.1s ease;
			border-radius: 0.25em;

			&.is-active {
				background: $fancy-gradient;
				color: $white;
			}
		}

		&:hover {
			// color: $white;
		}

		.menu {
			width: 200px;
			background: $primary;
			position: absolute;
			top: 100%;
			right: 0;
			margin-top: 0.5rem;
			border-radius: 0.25em;
			padding: 0.5rem;

			.menu-item {
				background-color: rgba(0, 0, 0, 0.1);
				border-radius: 0.15em;

				transition: all 0.1s ease;

				&:hover {
					box-shadow: 0.1em 0.1em 0 rgba(0, 0, 0, 0.2);
					transform: translate(-0.1em, -0.1em);
				}

				a {
					display: block;
					width: 100%;
					height: 100%;
					padding: 0.75rem;
				}
			}
		}
	}
}

main {
	overflow-y: auto;
	padding: 2rem;
}
</style>
