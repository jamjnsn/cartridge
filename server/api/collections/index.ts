export default defineEventHandler(async (event) => {
	const prisma = getPrismaClient()
	const collections = await prisma.collection.findMany({
		include: {
			platform: true
		}
	})
	return collections
})
