import prisma from '../../utils/prisma'

export default async function (req: any, res: any) {
	const games = await prisma.game.findMany()
	res.send(games)
}
