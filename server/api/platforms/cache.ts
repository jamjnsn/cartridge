export default defineEventHandler(async (event) => {
	const prisma = getPrismaClient()

	const platforms = await useIgdb({
		endpoint: 'platforms',
		body: ['fields *', 'limit 200']
	})

	for (const platformData of platforms) {
		const data = {
			id: platformData.id,
			name: platformData.name,
			slug: platformData.slug,
			data: platformData
		}

		const platform = await prisma.platform.upsert({
			where: {
				id: platformData.id
			},
			update: data,
			create: data
		})
	}

	return 'Done caching platforms.'
})
