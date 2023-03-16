import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'
import { getPrismaErrorCode, sendError } from '../../utils/error'

export default async function (req: any, res: any) {
	const { username, password } = req.body

	if (username === undefined || password === undefined) {
		throw sendError(res, {
			code: 400,
			message: 'Please provide a username and a password'
		})
	}

	try {
		const user = await prisma.user.create({
			data: {
				username,
				password: userHelper.hashPassword(password)
			}
		})

		res.send(user)
	} catch (e) {
		switch (getPrismaErrorCode(e)) {
			case 'P2002':
				throw sendError(res, {
					code: 400,
					message: 'Username already exists'
				})
			default:
				throw e
		}
	}
}
