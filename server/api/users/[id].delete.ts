import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'
import { sendError } from '../../utils/error'

export default async function (req: any, res: any) {
	const id = req.params.id

	if(id === "1") {
		return sendError(res, {
			code: 400,
			message: "Unable to delete user with ID 1"
		})
	}

	const user = await prisma.user.delete({
		where: {
			id
		}
	})

	res.send({ message: 'User deleted' })
}

export const middleware = ["requireAuth", "requireAdmin"]