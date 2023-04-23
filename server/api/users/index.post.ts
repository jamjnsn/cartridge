export default defineEventHandler(async (event) => {
	const { username, password, isAdmin } = await readBody(event)

	const prisma = getPrismaClient()
	const user = await prisma.user.create({
		data: {
			username,
			password: hashPassword(password),
			isAdmin: isAdmin === 'true'
		}
	})

	return user
})
