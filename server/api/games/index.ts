import prisma from '../../utils/prisma'
import { useMeiliSearch } from '../../../utils/useMeiliSearch'

export default async function (req: any, res: any) {
	const { search, limit = 10 } = req.query

	if (search !== undefined) {
		const meilisearch = useMeiliSearch()
		const results = await meilisearch.index('games').search(search, {
			limit
		})
		res.send(results)
	} else {
		const games = await prisma.game.findMany()
		res.send(games)
	}
}

export const middleware = ['requireAuth']
