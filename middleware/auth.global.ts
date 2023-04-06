import { User } from '@prisma/client'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const currentUser = useUser()

	// Fetch login information from token cookie if login state isn't found
	if (currentUser.value === null) {
		const token = useCookie('token')

		if (token.value !== null) {
			const { data: user } = await useFetch<User>('/api/auth/me', {
				headers: {
					authorization: `Bearer ${token.value}`
				}
			})

			if (user.value !== null) {
				currentUser.value = {
					id: user.value.id,
					username: user.value.username,
					isAdmin: user.value.isAdmin
				}
			}
		}
	}
})
