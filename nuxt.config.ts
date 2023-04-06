export default defineNuxtConfig({
	runtimeConfig: {
		jwtSecret: process.env.JWT_SECRET
	}
})
