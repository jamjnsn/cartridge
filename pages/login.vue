<script setup lang="ts">
const tryLogin = async (event: any) => {
	const body = {
		username: event.target.elements.username.value,
		password: event.target.elements.password.value
	}

	await useFetch('/api/auth/login', {
		method: 'POST',
		body,
		async onResponse({ response }) {
			const { session, user } = response._data

			const sessionCookie = useCookie('token')
			sessionCookie.value = session.token

			const currentUser = useUser()
			currentUser.value = {
				id: user.id,
				username: user.username,
				isAdmin: user.isAdmin
			}

			navigateTo('/')
		}
	})
}

definePageMeta({
	middleware: ['require-guest']
})
</script>

<template>
	<form @submit.prevent="tryLogin">
		<h1>Login</h1>
		<input
			name="username"
			type="text"
			placeholder="Username"
		/>
		<input
			name="password"
			type="password"
			placeholder="Password"
		/>
		<button>Login</button>
	</form>
</template>
