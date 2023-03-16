import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'

export default async function (req: any, res: any) {
	const id = req.params.id
	const user = await prisma.user.findUnique({
		where: {
			id
		}
	})

	if (user === null) {
		res.status(404).send({ message: 'User not found' })
	} else {
		res.send(userHelper.serialize(user))
	}
}
