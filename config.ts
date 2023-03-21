import * as dotenv from 'dotenv'
dotenv.config()

import path from 'path'

const config = {
	apiRoutesDir: '/server/api',
	middlewareDir: '/server/middleware',
	jwtSecret: process.env.JWT_SECRET,
	storagePath: path.join(__dirname, '/public/storage'),
	gamesPath: process.env.GAMES_DIRECTORY || path.join(__dirname, '/public/storage/files'),
	twitch: {
		cliendId: process.env.TWITCH_CLIENT_ID,
		appAccessToken: process.env.TWITCH_APP_ACCESS_TOKEN
	}
}

export default config
