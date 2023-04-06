export default defineEventHandler(async (event) => {
	const { authorization } = event.node.req.headers

	if (authorization === undefined)
		return createError({
			statusCode: 403,
			statusMessage: 'No authorization header provided'
		})

	const match = authorization.match(/Bearer (.*)/)

	if (match === null)
		return createError({
			statusCode: 403,
			statusMessage: 'Invalid authorization header'
		})

	const token = match[1]

	const prisma = getPrismaClient()
	const session = await prisma.session.findUnique({
		where: {
			token
		},
		include: {
			user: true
		}
	})

	if (session === null)
		return createError({
			statusCode: 404,
			statusMessage: 'No session found for token'
		})

	return session.user
})
