export default defineEventHandler(async (event) => {
	requireAuth(event)

	const prisma = getPrismaClient()
	const users = await prisma.user.findMany()
	return users
})
