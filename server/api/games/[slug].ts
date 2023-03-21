import prisma from '../../utils/prisma'
import { sendError } from '../../utils/error'

export default async function (req: any, res: any) {
	const slug = req.params.slug
	const game = await prisma.game.findUnique({
		where: {
			slug
		},
		include: {
			platforms: true,
			files: {
				include: {
					platform: true
				}
			}
		}
	})

	if (game === null) {
		throw sendError(res, {
			code: 404,
			message: 'Game not found'
		})
	} else {
		res.send(game)
	}
}
