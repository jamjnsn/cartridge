export default defineNuxtConfig({
	runtimeConfig: {
		jwtSecret: process.env.JWT_SECRET,
		twitchClientId: process.env.TWITCH_CLIENT_ID,
		twitchAccessToken: process.env.TWITCH_APP_ACCESS_TOKEN,
		gamesDirectory: process.env.GAMES_DIRECTORY
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' }
	},
	css: ['@/assets/styles/main.scss'],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: '@import "@/assets/styles/_global.scss";'
				}
			}
		}
	}
})
