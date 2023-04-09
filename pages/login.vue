<script setup lang="ts">
const isLoading = ref(false)

const tryLogin = async (event: any) => {
	isLoading.value = true

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
	<UiPanel color="primary">
		<template #header><h1>Login</h1></template>

		<form @submit.prevent="tryLogin">
			<UiField label="Username">
				<UiInput
					name="username"
					icon="user"
				/>
			</UiField>

			<UiField label="Password">
				<UiInput
					name="password"
					type="password"
					icon="lock"
				/>
			</UiField>

			<UiGroup>
				<UiButton
					color="primary"
					icon="play"
					:loading="isLoading"
				>
					Start
				</UiButton>
			</UiGroup>
		</form>
	</UiPanel>
</template>
