<template>
	<AuthLayout>
		<div class="panel">
			<header class="panel-header">Login</header>

			<div class="panel-body">
				<Transition>
					<div class="alert is-bad" v-if="error !== ''">
						<button @click="error = ''"><feather-icon type="x" /></button>
						{{ error }}
					</div>
				</Transition>

				<form @submit.prevent="submit">
					<div class="field">
						<label><feather-icon type="user" /> Username</label>
						<input type="text" name="username" :disabled="isProcessing" />
					</div>

					<div class="field">
						<label><feather-icon type="lock" /> Password</label>
						<input type="password" name="password" :disabled="isProcessing" />
					</div>

					<div class="buttons">
						<button class="button is-primary" :disabled="isProcessing">
							<feather-icon type="play" /> Start
						</button>
					</div>
				</form>

				<Transition>
					<LoadingOverlay v-if="isProcessing" />
				</Transition>
			</div>
		</div>
	</AuthLayout>
</template>

<script setup lang="ts">
import axios from 'axios'
import Cookies from 'js-cookie'

import AuthLayout from '../components/layouts/AuthLayout.vue'
import LoadingOverlay from '../components/LoadingOverlay.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isProcessing = ref(false)
const error = ref('')

const submit = (e: any) => {
	const username = e.target.elements.username.value
	const password = e.target.elements.password.value

	isProcessing.value = true

	axios
		.post('/api/login', {
			username,
			password
		})
		.then((res) => {
			const token = res.data.token
			Cookies.set('token', token, { expires: 7 })

			router.push({
				name: 'home'
			})
		})
		.catch((e) => {
			console.log(e.response.data)
			isProcessing.value = false
			error.value = e.response.data.message
		})
}
</script>

<style scoped lang="scss">
.panel {
	width: 300px;
	max-width: 100%;
	margin: 1rem;
}
</style>
