<template>
	<div>Logging out...</div>
</template>

<script setup lang="ts">
useHead({
	title: 'Logout'
})

definePageMeta({
	middleware: ['require-login']
})

const user = useUser()
const tokenCookie = useCookie('token')

user.value = null
tokenCookie.value = null

navigateTo('/')
</script>
