import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const prisma = getPrismaClient()

	const unimportedDirectories: string[] = []
	const files = fs.readdirSync(config.gamesDirectory)

	for (const file of files) {
		const filePath = path.join(config.gamesDirectory, file)
		const stats = fs.lstatSync(filePath)

		if (!stats.isDirectory()) continue

		const collection = await prisma.collection.findFirst({
			where: {
				path: filePath
			}
		})

		if (collection !== null) continue

		unimportedDirectories.push(filePath)
	}

	return unimportedDirectories
})
