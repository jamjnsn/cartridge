import { User } from '@prisma/client'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const currentUser = useUser()

	// Fetch login information from token cookie if login state isn't found
	if (currentUser.value === null) {
		const token = useCookie('token')

		if (token.value !== null) {
			const { data: user } = await useApiFetch<User>('/api/auth/me')

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
