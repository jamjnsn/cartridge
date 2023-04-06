export default defineNuxtRouteMiddleware((to, from) => {
	const user = useUser()

	if (user.value !== null) {
		return navigateTo('/')
	}
})
