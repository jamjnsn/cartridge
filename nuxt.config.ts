export default defineNuxtConfig({
	runtimeConfig: {
		jwtSecret: process.env.JWT_SECRET
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
