<script setup lang="ts">
import MenuIcon from '@/components/MenuIcon.vue'
import logo from '@/assets/images/logo.svg'
// import { useUserStore } from '@/utils/useUserStore'

const searchInput = ref<HTMLInputElement | null>(null)
const searchInputFocused = ref(false)
const menuIsOpen = ref(false)
const searchQuery = ''

const user = useUserStore()

const toggleMenu = () => {
	menuIsOpen.value = !menuIsOpen.value
}
const onKeyDown = (e: any) => {
	if (e.key === '/') {
		e.preventDefault()
		searchInput.value?.focus()
	}

	switch (e.key) {
		case '/':
			e.preventDefault()
			searchInput.value?.focus()
			break
		case 'Escape':
			e.preventDefault()
			searchInput.value?.blur()
			break
	}
}

onMounted(async () => {
	window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
	window.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
	<div class="layout">
		<nav>
			<div>
				<router-link to="/" class="home-link">
					<inline-svg :src="logo" class="logo" />
				</router-link>
			</div>

			<div
				class="search-container"
				@click="searchInput?.focus()"
				:class="{ 'is-active': searchInputFocused }"
			>
				<div class="search-icon">
					<feather-icon type="search" />
				</div>

				<input
					class="search-input"
					v-model="searchQuery"
					type="text"
					ref="searchInput"
					placeholder="Search..."
					@focus="searchInputFocused = true"
					@blur="searchInputFocused = false"
				/>
			</div>

			<div class="menu-container">
				<button class="menu-button" :class="{ 'is-active': menuIsOpen }" @click="toggleMenu">
					<MenuIcon :is-open="menuIsOpen" />
				</button>

				<div class="menu" v-if="menuIsOpen">
					<template v-if="user.isAdmin">
						<router-link to="/admin" class="button is-full-width"
							><feather-icon type="key" /> Admin</router-link
						>
					</template>
					<router-link to="/logout" class="button is-bad is-full-width"
						><feather-icon type="log-out" /> Logout</router-link
					>
				</div>
			</div>
		</nav>

		<main>
			<slot />
		</main>
	</div>
</template>

<style scoped lang="scss">
$menu-height: 80px;

.layout {
	display: flex;
	flex-direction: column;
	position: absolute;
	width: 100vw;
	height: 100vh;
}

main {
	flex: 1 1 auto;
	overflow-y: auto;
}

nav {
	flex: 0 0 auto;
	display: flex;
	align-items: center;
	padding: 1rem 2rem;
	background-color: $black;
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
		border-radius: 0.25em;
		outline: 0.1em solid transparent;
		transition: all 0.1s ease;
		background-color: $black-lighter;
		padding: 0.75em 1em;

		&.is-active {
			outline-color: $primary;
			box-shadow: 0 0.05em 1em $primary;
			outline-color: $secondary;
			transform: scale(1.005);
		}

		.search-icon {
			color: $grey-dark;
			width: 15px;
			height: 15px;
		}

		.search-input {
			display: block;
			width: 100%;
			outline: 0;
			background: transparent;

			&:focus {
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
			box-shadow: 0 0.1em 1em $black;

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
			background: $black-lighter;
			position: absolute;
			top: 100%;
			right: 0;
			margin-top: 0.5rem;
			border-radius: 0.25em;
			padding: 0.5rem;
			box-shadow: 0 0.1em 1em $black;

			.button {
				display: flex;
				width: 100%;

				&:not(:last-child) {
					margin-bottom: 0.5rem;
				}
			}

			.menu-item {
				display: flex;
				align-items: center;

				background-color: rgba(0, 0, 0, 0.1);
				border-radius: 0.15em;

				transition: all 0.1s ease;

				&:not(:last-child) {
					margin-bottom: 0.5rem;
				}

				&:hover {
					box-shadow: 0 0.1em 0 rgba(0, 0, 0, 0.2);
				}

				a {
					display: flex;
					align-items: center;
					width: 100%;
					height: 100%;
					padding: 0.75rem;
				}

				.ui-icon {
					margin-right: 0.5em;
				}
			}
		}
	}
}
</style>
