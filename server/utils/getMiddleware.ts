import { cwd } from 'node:process'
import path from 'path'
import { globSync } from 'glob'
import config from '../../config'

export type MiddlewareHandler = (req: any, res: any, next: any) => null
export type Middleware = {
	[key: string]: MiddlewareHandler
}

export default async function getServerMiddleware(): Promise<{}> {
	const middlewares: Middleware = {}

	const middlewarePaths = path.join(cwd(), config.middlewareDir)
	const middlewareFiles = globSync(`${middlewarePaths}/**/*.ts`)

	for (const fullPath of middlewareFiles) {
		// Strip base path
		let name = fullPath.replace(middlewarePaths, '')

		// Trim leading slash
		if (name[0] === '/') {
			name = name.substring(1)
		}

		// Remove file extension
		name = name.replace(/\.ts/, '')

		// Get handler from middleware
		try {
			const { default: handler } = await import(fullPath)
			middlewares[name] = handler
		} catch (e) {
			console.log(`Failed to import middleware from ${fullPath}`)
		}
	}

	return middlewares
}
