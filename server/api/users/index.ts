import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'

export default async function (req: any, res: any) {
	const users = await prisma.user.findMany()
	res.send(userHelper.serializeMany(users))
}

export const middleware = ["requireAuth"]