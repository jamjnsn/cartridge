import prisma from '../../utils/prisma'
import { useMeiliSearch } from '../../../utils/useMeiliSearch'

export default async function (req: any, res: any) {
	const { search } = req.query

	if (search !== undefined && search !== '') {
		const meilisearch = useMeiliSearch()
		const results = await meilisearch.index('games').search(search)
		res.send(results.hits)
	} else {
		const games = await prisma.game.findMany()
		res.send(games)
	}
}

export const middleware = ['requireAuth']
