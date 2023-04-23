export default defineEventHandler(async (event) => {
	const params = event.context.params

	if (!params?.id)
		return createError({
			statusCode: 400,
			statusMessage: 'No user ID provided'
		})

	const prisma = getPrismaClient()
	const user = await prisma.user.findUnique({
		where: {
			id: params.id
		}
	})

	return user
})
