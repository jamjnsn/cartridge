import prisma from '../utils/prisma'
import { getPrismaErrorCode, sendError } from '../utils/error'

export default async function (req: any, res: any) {
	const { authorization } = req.headers

	if (authorization === undefined) {
		throw sendError(res, {
			code: 403,
			message: 'No authorization header provided'
		})
	}

	const match = authorization.match(/Bearer (.+)/)

	if (match === null) {
		throw sendError(res, {
			code: 403,
			message: 'Invalid authorization header'
		})
	}

	const token = match[1] as string

	const session = await prisma.session.findUnique({
		where: {
			token
		}
	})

	if (session === null) {
		throw sendError(res, {
			code: 404,
			message: 'Session not found'
		})
	}

	await prisma.session.delete({
		where: {
			id: session.id
		}
	})

	res.send({ message: 'Session deleted' })
}
