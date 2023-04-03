const PrismaClient = require('@prisma/client').PrismaClient
const Prisma = require('@prisma/client').Prisma

const igdbApi = require('igdb-api-node').default
const fs = require('fs')
const path = require('path')
const MeiliSearch = require('meilisearch').MeiliSearch

require('dotenv').config()

const prisma = new PrismaClient()
const igdb = igdbApi()
const axios = require('axios')
const meiliSearch = new MeiliSearch({ host: 'http://localhost:7700' })

const sleep = () => new Promise((r) => setTimeout(r, 250))

const platformAliases = {
	'genesis-slash-megadrive': ['Genesis']
}

const gamesPath = process.env.GAMES_DIRECTORY

const updateSearchIndexes = async () => {
	const platforms = await prisma.platform.findMany()
	const games = await prisma.game.findMany()

	meiliSearch.index('platforms').updateDocuments(platforms)
	meiliSearch.index('games').updateDocuments(games)
}

/**
 * Gets a lowercase slug to search IGDB with based on folder name or alias.
 * @param folderName Name of the folder.
 * @returns Lowercase slug for search.
 */
const resolveSlug = (folderName) => {
	for (const slug in platformAliases) {
		const aliases = platformAliases[slug]
		for (const matchString of aliases) {
			const regex = new RegExp(matchString, 'i')

			if (regex.test(folderName)) {
				return slug
			}
		}
	}

	// String isn't a known alias, use it as-is
	return folderName.toLowerCase()
}

const findPlatform = async (folderName) => {
	const slug = resolveSlug(folderName)

	let platform = null

	// Check if platform already cached
	platform = await prisma.platform.findUnique({
		where: {
			slug
		}
	})

	// Search IGDB for platform
	if (!platform) {
		await sleep()
		const result = await igdb
			.fields('*')
			.where(`slug = "${slug}"`)
			.request('/platforms')
			.then((res) => (res.data.length > 0 ? res.data[0] : null))

		if (!result) {
			console.log(`No data found for ${slug}`)
			return null
		}

		const data = {
			name: result.name,
			slug: result.slug,
			data: result
		}

		platform = await prisma.platform.upsert({
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

	return platform
}

const searchGame = async (gameName, platform) => {
	await sleep()
	const results = await igdb
		.fields('*')
		.search(cleanFileName(gameName))
		.request('/games')
		.then((res) => res.data)

	for (const result of results) {
		// Object from API is inconsistent. Need to convert it to an array.
		const platforms = result.platforms ? Object.values(result.platforms) : []

		if (platforms.includes(platform.id)) {
			return result
		}
	}

	return null
}

const downloadFile = (fileUrl, outputPath) => {
	const writer = fs.createWriteStream(outputPath)

	return axios({
		method: 'get',
		url: fileUrl,
		responseType: 'stream'
	}).then((response) => {
		return new Promise((resolve, reject) => {
			response.data.pipe(writer)
			let error = null

			writer.on('error', (err) => {
				error = err
				writer.close()
				reject(err)
			})
			writer.on('close', () => {
				if (!error) {
					resolve(true)
				}
			})
		})
	})
}

const downloadGameImages = async (game) => {
	const destFolder = path.join(__dirname, '/public/storage/media/covers')
	fs.mkdirSync(destFolder, { recursive: true })

	const destPath = path.join(destFolder, `${game.slug}.jpg`)

	if (fs.existsSync(destPath)) return

	await sleep()
	const response = await igdb.fields('*').where(`game = ${game.id}`).request('/covers')

	if (response.data.length > 0) {
		const imageId = response.data[0]['image_id']
		const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`

		await downloadFile(imageUrl, destPath)
	}
}

/**
 * Finds a platform based on a folder's name and imports all matching games found within.
 * @param {*} folderName
 */
const scanFolder = async (folderName) => {
	const folderPath = path.join(gamesPath, folderName)

	// Find platform
	const platform = await findPlatform(folderName)

	if (!platform) {
		return
	}

	// Find games
	for (const file of fs.readdirSync(folderPath)) {
		const filePath = path.join(gamesPath, folderName, file)
		const fileInfo = path.parse(filePath)

		if (fs.lstatSync(filePath).isDirectory()) continue

		const gamePath = path.join(folderName, file)

		let fileRecord = await prisma.file.findUnique({
			where: {
				path: gamePath
			},
			include: {
				game: true
			}
		})

		let game

		if (fileRecord) {
			game = fileRecord.game
		} else {
			const gameData = await searchGame(fileInfo.name, platform)

			if (gameData === null) {
				console.log(`No match found for ${file}`)
				continue
			}

			const recordData = {
				name: gameData.name,
				slug: gameData.slug,
				data: gameData
			}

			game = await prisma.game.upsert({
				where: {
					id: gameData.id
				},
				update: {
					...recordData
				},
				create: {
					id: gameData.id,
					...recordData
				}
			})

			try {
				// Create file record
				fileRecord = await prisma.file.create({
					data: {
						path: gamePath,
						platformId: platform.id,
						gameId: game.id
					}
				})
			} catch (e) {
				if (e instanceof Prisma.PrismaClientKnownRequestError) {
					// The .code property can be accessed in a type-safe manner
					if (e.code === 'P2002') {
						console.log(`Duplicate file found for ${gamePath}`)
					}
				}
			}
		}

		// Download cover and screenshots
		await downloadGameImages(game)
	}
}

const cleanFileName = (fileName) => {
	// Trim language tags and other asides
	fileName = fileName.replaceAll(/(\(.*?\))/g, '')

	// I don't know if people tag ROMs with square brackets but they might
	fileName = fileName.replaceAll(/(\[.*?\])/g, '')

	// Keep only remaining word characters and spaces
	fileName = fileName.replaceAll(/[^\w ]/g, '')

	return fileName
}

const main = async () => {
	console.log('Starting scan')

	for (const file of fs.readdirSync(gamesPath)) {
		const filePath = path.join(gamesPath, file)

		// Only scan directories in root games directory
		if (!fs.lstatSync(filePath).isDirectory()) continue

		// Import games from folder
		await scanFolder(file)
	}

	console.log('Updating MeiliSearch')
	await updateSearchIndexes()
}

main()
