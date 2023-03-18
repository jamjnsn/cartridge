<template>
	<AuthLayout>
		<LoadingOverlay />
	</AuthLayout>
</template>

<script setup lang="ts">
import axios from 'axios'
import Cookies from 'js-cookie'

import { useRouter } from 'vue-router'

import LoadingOverlay from '../components/LoadingOverlay.vue'
import AuthLayout from '../components/layouts/AuthLayout.vue'

const token = Cookies.get('token')
const router = useRouter()

if (token) {
	axios
		.post(
			'/api/logout',
			{},
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.catch((e) => {
			console.log(e.response.message)
		})
		.finally(() => {
			Cookies.remove('token')

			router.push({
				name: 'home'
			})
		})
}
</script>
