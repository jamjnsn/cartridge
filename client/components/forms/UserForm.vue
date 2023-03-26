<script setup lang="ts">
import { User } from '@prisma/client'
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const props = defineProps<{
	user?: User
}>()

const submit = (event: any) => {
	event.preventDefault()

	formError.value = undefined

	if (password.value !== passwordConfirm.value) {
		formError.value = "Password doesn't match confirmation"
		return
	}

	emit('submit', {
		username: username.value,
		password: password.value,
		isAdmin: isAdmin.value
	})
}

const isEditing = props.user !== undefined

// Fill info if user is provided
const username = ref(isEditing ? props.user.username : '')
const password = ref('')
const passwordConfirm = ref('')
const isAdmin = ref(isEditing ? props.user.isAdmin : false)

const formError = ref<string | undefined>(undefined)
</script>

<template>
	<form @submit="submit">
		<Transition>
			<div class="alert is-bad" v-if="formError !== undefined">
				<a class="close-button" @click="formError = undefined">
					<feather-icon type="x" />
				</a>
				{{ formError }}
			</div>
		</Transition>
		<div class="field">
			<label>Username</label>
			<input type="text" v-model="username" required />
		</div>

		<div class="field">
			<label>Password</label>
			<input type="password" v-model="password" :required="!isEditing" />
		</div>

		<div class="field">
			<label>Password (Confirm)</label>
			<input type="password" v-model="passwordConfirm" :required="password !== ''" />
		</div>

		<div class="field is-inline">
			<label>Admin</label>
			<InputToggle v-model="isAdmin" :disabled="user?.id === '1'" />
		</div>

		<hr />

		<div class="buttons">
			<button type="submit" class="button is-primary">Save</button>
			<RouterLink to="/admin/users" class="button is-ghost"> Cancel </RouterLink>
		</div>
	</form>
</template>

<style scoped lang="scss">
form {
	width: 300px;
	max-width: 100%;

	hr {
		margin-bottom: 1rem;
	}
}
</style>
