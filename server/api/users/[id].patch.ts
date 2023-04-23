export default defineEventHandler(async (event) => {
	const params = event.context.params
	const { username, password, isAdmin } = await readBody(event)

	const userId = params?.id

	if (!userId)
		return createError({
			statusCode: 400,
			statusMessage: 'No user ID provided'
		})

	const prisma = getPrismaClient()

	const data: {
		username?: string
		password?: string
		isAdmin?: boolean
	} = {
		username,
		isAdmin
	}

	if (password !== '') {
		data.password = hashPassword(password)
	}

	const user = await prisma.user.update({
		where: {
			id: userId
		},
		data
	})

	return user
})
