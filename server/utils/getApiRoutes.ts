import { globSync } from 'glob'
import config from '../../config'

import { cwd } from 'node:process'
import path from 'path'

export type Route = {
	path: string
	method: string
	handler: (req: any, res: any) => void
	middleware: string[]
}

export default async function getApiRoutes(): Promise<Route[]> {
	const routes: Route[] = []

	const routesPath = path.join(cwd(), config.apiRoutesDir)
	const routeFiles = globSync(`${routesPath}/**/*.ts`)

	for (const routeFile of routeFiles) {
		const relativePath = routeFile.replace(routesPath, '')

		let pathSegments = relativePath.split('/')

		let filename = pathSegments.pop()

		// Ensure a filename is found
		if (!filename) continue

		// Get segments from filename
		filename = filename.replace('.ts', '')
		let [name, method] = filename.split('.')

		// Check if name calls for a param
		const match = name.match(/\[(\w+)\]/)
		if (match) {
			name = `:${match[1]}`
		}

		// Check if name is index
		if (name !== 'index') {
			pathSegments.push(name)
		}

		// Set method to GET if none is specified
		if (!method) method = 'get'

		const { default: handler, middleware } = await import(routeFile)

		// Ensure a handler is found
		if (!handler) {
			continue
		}

		const route: Route = {
			path: `${pathSegments.join('/')}`,
			method,
			handler,
			middleware
		}

		routes.push(route)
	}

	return routes
}
