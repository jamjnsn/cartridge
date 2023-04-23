export default defineEventHandler(async (event) => {
	const params = event.context.params

	const userId = params?.id

	if (!userId)
		return createError({
			statusCode: 400,
			statusMessage: 'No user ID provided'
		})

	if (userId === '1')
		return createError({
			statusCode: 400,
			statusMessage: 'Initial user cannot be deleted'
		})

	const prisma = getPrismaClient()
	await prisma.user.delete({
		where: {
			id: userId
		}
	})

	return 'User deleted'
})
