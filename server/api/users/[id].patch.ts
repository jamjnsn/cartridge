import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'
import { getPrismaErrorCode, sendError } from '../../utils/error'

export default async function (req: any, res: any) {
	const user = req.session.user
	const id = req.params.id

	if(user.id !== id && !user.isAdmin) {
		return sendError(res, {
			code: 403,
			message: "User not authorized"
		})
	}

	const { username, password, isAdmin } = req.body

	const data: {
		username?: string
		password?: string
		isAdmin?: boolean
	} = {}

	if (username) data.username = username
	if (password) data.password = userHelper.hashPassword(password)
	
	// ToDo: Find better way to keep initial user
	if(isAdmin !== undefined && id !== 1) {
		data.isAdmin = isAdmin
	}

	try {
		const user = await prisma.user.update({
			where: {
				id
			},
			data
		})

		res.send(userHelper.serialize(user))
	} catch (e) {
		switch (getPrismaErrorCode(e)) {
			case 'P2025':
				return sendError(res, {
					code: 404,
					message: 'User not found'
				})
			default:
				throw e
		}
	}
}

export const middleware = ["requireAuth"]