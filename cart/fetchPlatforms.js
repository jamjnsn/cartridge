const PrismaClient = require('@prisma/client').PrismaClient
const igdbApi = require('igdb-api-node').default
const MeiliSearch = require('meilisearch').MeiliSearch

const prisma = new PrismaClient()
const igdb = igdbApi()
const meiliSearch = new MeiliSearch({ host: 'http://localhost:7700' })

const fetchPlatforms = async () => {
	console.log('Fetching platforms from IGDB')

	const results = await igdb
		.fields('*')
		.limit(500) // Include all results (200 as of writing)
		.request('/platforms')
		.then((res) => {
			return res.data
		})

	for (const result of results) {
		const data = {
			name: result.name,
			slug: result.slug,
			data: result
		}

		// Update or create platform in database
		await prisma.platform.upsert({
			where: {
				id: result.id
			},
			update: {
				...data
			},
			create: {
				id: result.id,
				...data
			}
		})
	}

	// Get all platforms
	const platforms = await prisma.platform.findMany()

	// ToDo: Add data to search index
	meiliSearch.index('platforms').addDocuments(platforms)
}

module.exports = fetchPlatforms
