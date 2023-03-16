import userHelper from '../../utils/userHelper'
import prisma from '../../utils/prisma'

export default async function (req: any, res: any) {
	const id = req.params.id
	const { username, password } = req.body

	const data: {
		username?: string
		password?: string
	} = {}

	if (username) data.username = username
	if (password) data.password = userHelper.hashPassword(password)

	const user = await prisma.user.update({
		where: {
			id
		},
		data
	})

	res.send(userHelper.serialize(user))
}
