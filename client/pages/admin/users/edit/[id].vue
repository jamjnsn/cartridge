<script setup lang="ts">
import type { User } from '@prisma/client'

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
		<template #header>
			<h1>
				Editing <template v-if="user !== undefined">{{ user.username }}</template>
			</h1>
		</template>
		<template v-if="!loadingUser">
			<UserForm :user="user" @submit="submit"></UserForm>
		</template>
	</AdminLayout>
</template>

<style scoped lang="scss"></style>

<route>
{
	name: "admin-user-edit"
}
</route>
