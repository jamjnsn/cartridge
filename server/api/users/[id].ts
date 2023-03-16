import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'
import { sendError } from '../../utils/error'

export default async function (req: any, res: any) {
	const id = req.params.id
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	})

	if (user === null) {
		throw sendError(res, {
			code: 404,
			message: 'User not found'
		})
	} else {
		res.send(userHelper.serialize(user))
	}
}
