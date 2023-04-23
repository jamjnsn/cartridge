export default defineEventHandler(async (event) => {
	event.context.auth = {
		user: null
	}

	const { authorization } = event.node.req.headers

	if (authorization === undefined) return

	const match = authorization.match(/Bearer (.*)/)

	if (match === null) return

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

	if (session === null) return

	event.context.auth = {
		user: session.user
	}
})
