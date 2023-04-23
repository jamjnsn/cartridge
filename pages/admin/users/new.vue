<script setup lang="ts">
import { SlowBuffer } from 'buffer'

definePageMeta({
	layout: 'admin'
})

const formError = ref<string | null>(null)

const onFormSubmitted = async (body: any) => {
	const { error } = await useFetch('/api/users', {
		method: 'POST',
		body,
		async onResponse({ response }) {
			return response._data
		}
	})

	if (error.value === null) {
		navigateTo('/admin/users')
	} else {
		formError.value = 'Failed to create user'
	}
}
</script>

<template>
	<div>
		<AdminHeader>
			<h1>New User</h1>
		</AdminHeader>

		<UiAlert
			v-if="formError !== null"
			color="danger"
			@click="formError = null"
		>
			{{ formError }}
		</UiAlert>

		<UserForm @submit="onFormSubmitted" />
	</div>
</template>
