<script setup lang="ts">
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
		.patch(`/api/users/${user.value?.id}`, data)
		.then((res) => {
			router.push('/admin/users')
		})
		.catch((e) => {
			console.log(e)
		})
}

onMounted(async () => {
	await axios.get(`/api/users/${route.params.id}`).then((res) => {
		user.value = res.data
		loadingUser.value = false
	})
})
</script>

<template>
	<AdminLayout>
		<template v-if="!loadingUser">
			<h1 class="title">Editing {{ user?.username }}</h1>
			<UserForm :user="user" @submit="submit"></UserForm>
		</template>
	</AdminLayout>
</template>

<style scoped lang="scss"></style>
