import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'
import { getPrismaErrorCode, sendError } from '../../utils/error'

export default async function (req: any, res: any) {
	const id = req.params.id
	const { username, password } = req.body

	const data: {
		username?: string
		password?: string
	} = {}

	if (username) data.username = username
	if (password) data.password = userHelper.hashPassword(password)

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
				throw sendError(res, {
					code: 404,
					message: 'User not found'
				})
			default:
				throw e
		}
	}
}
