<script setup lang="ts">
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import type { User } from '@prisma/client'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAxios from '@/utils/useAxios'
import UserForm from '@/components/forms/UserForm.vue'

const axios = useAxios()
const route = useRoute()
const router = useRouter()
const loadingUser = ref(true)
const user = ref<User>()

const submit = async (data: any) => {
	await axios
		.post(`/api/users`, data)
		.then((res) => {
			router.push('/admin/users')
		})
		.catch((e) => {
			console.log(e)
		})
}
</script>

<template>
	<AdminLayout>
		<h1 class="title">Creating a User</h1>
		<UserForm @submit="submit"></UserForm>
	</AdminLayout>
</template>

<style scoped lang="scss"></style>
