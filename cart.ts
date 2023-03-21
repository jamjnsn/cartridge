import config from './config'

import { globSync as glob } from 'glob'
import fs from 'fs'

import { downloadFile } from './server/utils/downloadFile'

import { Platform, Prisma, Game } from '@prisma/client'
import prisma from './server/utils/prisma'

import igdbApi from 'igdb-api-node'
import path from 'path'
const igdb = igdbApi(config.twitch.cliendId, config.twitch.appAccessToken)

const apiDelay = 250 // In milliseconds
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const platformAliases: { [key: string]: string[] } = {
	'genesis-slash-megadrive': ['(Sega )?Genesis', '(Sega )?Mega Drive']
}

const resolveAlias = (alias: string) => {
	for (const slug in platformAliases) {
		const aliases = platformAliases[slug]
		for (const matchString of aliases) {
			const regex = new RegExp(matchString, 'i')

			if (regex.test(alias)) {
				return slug
			}
		}
	}

	// String isn't a known alias, use it as-is
	return alias.toLowerCase()
}

const getPlatform = async (slug: string) => {
	let platform = await prisma.platform.findUnique({
		where: {
			slug
		}
	})

	if (platform === null) {
		await sleep(apiDelay)
		const response = await igdb.fields('*').where(`slug = "${slug}"`).request('/platforms')

		if (response.data.length === 1) {
			const platformData = response.data[0]
			console.log(`Found platform for ${slug}: ${platformData.name}`)

			platform = await prisma.platform.create({
				data: {
					id: platformData.id,
					name: platformData.name,
					slug: platformData.slug,
					data: platformData as Prisma.JsonObject
				}
			})
		}
	}

	return platform
}

const getGameCover = async (game: Game) => {
	const coverFilePath = path.join(config.storageDirectories.covers, `${game.slug}.jpg`)
	if (fs.existsSync(coverFilePath)) return

	const response = await igdb.fields('*').where(`game = ${game.id}`).request('/covers')

	if (response.data.length > 0) {
		const imageId = response.data[0]['image_id']
		const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`

		fs.mkdirSync(config.storageDirectories.covers, { recursive: true })

		await downloadFile(imageUrl, coverFilePath)
	}
}

const getGame = async (filePath: string, platform: Platform): Promise<Game | null> => {
	const fileInfo = path.parse(filePath)

	let file = await prisma.file.findUnique({
		where: {
			path: fileInfo.base
		},
		include: {
			game: true
		}
	})

	if (file !== null) return file.game

	const name = path.parse(filePath).name

	await sleep(apiDelay)
	const response = await igdb
		.fields('*')
		.search(name)
		.where(`platforms = ${platform.id}`)
		.request('/games')

	if (response.data.length === 0) return null

	const gameData = response.data[0]

	let game = await prisma.game.findUnique({
		where: {
			id: gameData.id
		}
	})

	if (game === null) {
		game = await prisma.game.create({
			data: {
				id: gameData.id,
				name: gameData.name,
				slug: gameData.slug,
				data: gameData as Prisma.JsonObject
			}
		})
	}

	file = await prisma.file.create({
		data: {
			path: fileInfo.base,
			gameId: game.id,
			platformId: platform.id
		},
		include: {
			game: true
		}
	})

	return game
}

const scanGames = async (platform: Platform, dir: string) => {
	for (const file of fs.readdirSync(dir)) {
		const fullPath = path.join(dir, file)

		if (fs.lstatSync(fullPath).isDirectory()) continue

		const game = await getGame(fullPath, platform)

		if (game === null) continue

		// Get game images
		await getGameCover(game)
	}
}

const scanPlatforms = async (dir: string) => {
	for (const file of fs.readdirSync(dir)) {
		const fullPath = path.join(dir, file)

		// Only scan directories in root games directory
		if (!fs.lstatSync(fullPath).isDirectory()) continue

		const slug = resolveAlias(file)
		const platform = await getPlatform(slug)

		// Ensure a platform was found
		if (platform === null) {
			console.log(`No platform found for ${slug}`)
			continue
		}

		await scanGames(platform, fullPath)
	}
}

console.log('Starting scan')

if (config.gamesDirectory === undefined) {
	throw new Error('Games directory not defined')
}

scanPlatforms(config.gamesDirectory)
