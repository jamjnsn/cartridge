<script setup lang="ts">
import type { User } from '@prisma/client'

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
