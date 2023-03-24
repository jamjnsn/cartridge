import prisma from '../utils/prisma'
import { getPrismaErrorCode, sendError } from '../utils/error'

export default async function (req: any, res: any) {
	const session = req.session

	if(req.session === null) {
		return sendError(res, {
			code: 403,
			message: "User not authorized"
		})
	}

	await prisma.session.delete({
		where: {
			id: session.id
		}
	})

	res.send({ message: 'Session deleted' })
}

export const middleware = ["requireAuth"]