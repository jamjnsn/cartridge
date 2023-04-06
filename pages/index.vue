<template>
	<div>Welcome {{ user ? user.username : 'Guest' }}</div>
</template>

<script setup lang="ts">
const user = useUser()

definePageMeta({
	middleware: ['require-login']
})
</script>
