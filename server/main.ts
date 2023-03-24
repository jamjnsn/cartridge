import express, { RequestHandler } from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import getApiRoutes from './utils/getApiRoutes'
import getServerMiddleware, { Middleware } from './utils/getMiddleware'

import config from '../config'

const makeApp = async () => {
	const app = express()

	// Use body parser
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(bodyParser.raw())

	// Define storage routes
	app.use('/storage', express.static(config.storagePath))

	if (config.gamesPath !== undefined) {
		app.use('/files', express.static(config.gamesPath))
	}

	// Get middleware
	const middleware: Middleware = await getServerMiddleware()

	// Get API routes
	const apiRoutes = await getApiRoutes()
	for (const route of apiRoutes) {
		const method = route.method as 'get' | 'post' | 'put' | 'patch' | 'delete'
		const handlers: RequestHandler[] = []

		route.middleware?.forEach((middlewareName) => {
			const middlewareHandler = middleware[middlewareName]
			handlers.push(middlewareHandler)
		})

		app[method](`/api${route.path}`, ...handlers, route.handler)
	}

	return app
}

makeApp().then((app) => {
	app.listen(3000, () => console.log('Server is listening on port 3000...'))
})
