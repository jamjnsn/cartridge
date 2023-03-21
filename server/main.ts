import express from 'express'
import bodyParser from 'body-parser'

import asyncHandler from 'express-async-handler'

import getApiRoutes from './utils/getApiRoutes'
import getServerMiddleware, { Middleware, MiddlewareHandler } from './utils/getMiddleware'

import * as dotenv from 'dotenv'
dotenv.config()

const makeApp = async () => {
	const app = express()

	// Use body parser
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(bodyParser.raw())

	app.use('/storage', express.static('../public/storage'))

	// Get middleware
	const middleware: Middleware = await getServerMiddleware()

	// Get API routes
	const apiRoutes = await getApiRoutes()
	for (const route of apiRoutes) {
		const method = route.method as 'get' | 'post' | 'put' | 'patch' | 'delete'
		const handlers: MiddlewareHandler[] = []

		route.middleware?.forEach((middlewareName) => {
			const middlewareHandler = middleware[middlewareName]
			handlers.push(middlewareHandler)
		})

		app[method](`/api${route.path}`, ...handlers, asyncHandler(route.handler))
	}

	return app
}

makeApp().then((app) => {
	app.listen(3000, () => console.log('Server is listening on port 3000...'))
})
