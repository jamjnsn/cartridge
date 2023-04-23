<script setup lang="ts">
import { User } from '@prisma/client'

const props = defineProps<{
	user?: User
}>()

const username = ref(props.user?.username || '')
const password = ref('')
const passwordConfirm = ref('')

type UserFormBody = {
	username: string | undefined
	password: string | undefined
	isAdmin: boolean
}

const formError = ref<string | null>(null)

const isAdmin = ref(props.user?.isAdmin || false)
const emit = defineEmits<{
	(e: 'submit', body: UserFormBody): void
}>()

const submit = () => {
	formError.value = null

	const body: UserFormBody = {
		username: username.value,
		password: password.value,
		isAdmin: isAdmin.value
	}

	if (password.value !== '' && password.value !== passwordConfirm.value) {
		formError.value = 'Password does not match confirmation.'
		return
	}

	emit('submit', body)
}
</script>

<template>
	<form @submit.prevent="submit">
		<Transition>
			<UiAlert
				v-if="formError !== null"
				color="danger"
				@dismiss="formError = null"
				>{{ formError }}</UiAlert
			>
		</Transition>

		<UiField label="Username">
			<UiInput
				v-model="username"
				required
			/>
		</UiField>

		<UiField label="Password">
			<UiInput
				v-model="password"
				type="password"
				:required="user === null"
			/>
		</UiField>

		<UiField label="Password (Confirm)">
			<UiInput
				v-model="passwordConfirm"
				type="password"
				:required="password !== ''"
			/>
		</UiField>

		<UiField label="Admin">
			<UiToggle
				v-model="isAdmin"
				:disabled="user?.id === '1'"
			/>
		</UiField>

		<UiGroup>
			<UiButton color="primary">Save</UiButton>
			<NuxtLink to="/admin/users"><UiButton color="ghost">Cancel</UiButton></NuxtLink>
		</UiGroup>
	</form>
</template>
