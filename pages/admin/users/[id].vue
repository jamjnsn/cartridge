<script setup lang="ts">
import { User } from '@prisma/client'

const route = useRoute()

const userId = route.params.id
const showDeletePrompt = ref(false)

const { data: user } = await useFetch<User>(`/api/users/${userId}`, {
	headers: {
		authorization: getAuthHeader()
	},
	method: 'GET'
})

definePageMeta({
	layout: 'admin'
})

const formError = ref<string | null>(null)

const onFormSubmitted = async (body: any) => {
	const { error } = await useFetch(`/api/users/${userId}`, {
		method: 'PATCH',
		body,
		async onResponse({ response }) {
			return response._data
		}
	})

	if (error.value === null) {
		navigateTo('/admin/users')
	} else {
		formError.value = 'Failed to update user'
	}
}

const deleteUser = async () => {
	const { error } = await useFetch(`/api/users/${userId}`, {
		method: 'DELETE'
	})

	if (error.value === null) {
		navigateTo('/admin/users')
	} else {
		console.log('Failed to delete user')
	}
}
</script>

<template>
	<div v-if="user">
		<AdminHeader>
			<h1>Editing {{ user.username }}</h1>

			<div class="controls">
				<UiButton
					v-if="user.id !== '1'"
					color="danger"
					size="small"
					icon="trash"
					@click="showDeletePrompt = true"
				>
					Delete
				</UiButton>
			</div>
		</AdminHeader>

		<UiAlert
			v-if="formError !== null"
			color="danger"
			@click="formError = null"
		>
			{{ formError }}
		</UiAlert>

		<UserForm
			:user="user"
			@submit="onFormSubmitted"
		/>

		<Transition>
			<UiOverlay v-if="showDeletePrompt">
				<UiCard class="admin-user-card">
					<div
						v-if="user.isAdmin"
						class="admin-user-card__admin"
					>
						<UiIcon type="key" />
					</div>

					<span>Are you sure you want to delete {{ user.username }}?</span>

					<template #footer>
						<a
							class="card__footer-item"
							@click="deleteUser"
							>Yes</a
						>
						<a
							class="card__footer-item"
							@click="showDeletePrompt = false"
							>No</a
						>
					</template>
				</UiCard>
			</UiOverlay>
		</Transition>
	</div>
</template>
