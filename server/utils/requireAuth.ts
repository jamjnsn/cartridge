import { H3Event } from 'h3'

export const requireAuth = (event: H3Event) => {
	if (event.context.auth.user === null) {
		throw createError({
			statusCode: 403,
			statusMessage: 'Invalid authorization'
		})
	}
}
