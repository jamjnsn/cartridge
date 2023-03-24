import prisma from '../utils/prisma'
import { sendError } from '../utils/error'

export default async function (req: any, res: any, next: any) {
	const { authorization } = req.headers

	if (authorization === undefined) {
		return sendError(res, {
			code: 403,
			message: 'No authorization header provided'
		})
	}

	const match = authorization.match(/Bearer (.+)/)

	if (match === null) {
		return sendError(res, {
			code: 403,
			message: 'Invalid authorization header'
		})
	}

	const token = match[1] as string

	const session = await prisma.session.findUnique({
		where: {
			token
		},
		include: {
			user: true
		}
	})

	if (session === null) {
		return sendError(res, {
			code: 404,
			message: 'Session not found'
		})
	}

	req.session = session

	next()
}
