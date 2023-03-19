import prisma from '../utils/prisma'
import { getPrismaErrorCode, sendError } from '../utils/error'
import userHelper from '../utils/userHelper'

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
		},
		include: {
			user: true
		}
	})

	if (session === null) {
		throw sendError(res, {
			code: 404,
			message: 'Session not found'
		})
	}

	res.send(userHelper.serialize(session.user))
}
