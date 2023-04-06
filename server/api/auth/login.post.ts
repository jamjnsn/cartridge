export default defineEventHandler(async (event) => {
	const { username, password } = await readBody(event)

	const prisma = getPrismaClient()
	const user = await prisma.user.findUnique({
		where: {
			username
		}
	})

	if (user === null) {
		return createError({
			statusCode: 404,
			statusMessage: 'User not found'
		})
	}

	if (!checkPassword(password, user.password)) {
		return createError({
			statusCode: 400,
			statusMessage: 'Incorrect password'
		})
	}

	const token = createToken(user)
	const session = await prisma.session.create({
		data: {
			token,
			userId: user.id
		}
	})

	return {
		session,
		user
	}
})
