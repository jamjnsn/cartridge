<script setup lang="ts">
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import type { User } from '@prisma/client'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const loadingUser = ref(true)
const user = ref<User>()

onMounted(async () => {
	await axios.get(`/api/user/${route.params.id}`).then((res) => {
		user.value = res.data
		loadingUser.value = false
	})
})
</script>

<template>
	<AdminLayout> User </AdminLayout>
</template>

<style scoped lang="scss"></style>
