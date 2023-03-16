import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'

export default async function (req: any, res: any) {
	const { username, password } = req.body

	const user = await prisma.user.create({
		data: {
			username,
			password: userHelper.hashPassword(password)
		}
	})

	res.send(user)
}
