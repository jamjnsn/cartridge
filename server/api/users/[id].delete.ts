import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'

export default async function (req: any, res: any) {
	const id = req.params.id
	const user = await prisma.user.delete({
		where: {
			id
		}
	})

	res.send({ message: 'User deleted' })
}

export const middleware = ["requireAuth", "requireAdmin"]