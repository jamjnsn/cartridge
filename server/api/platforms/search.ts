import prisma from '../../utils/prisma'
import { getPrismaErrorCode, sendError } from '../../utils/error'
import { useMeiliSearch } from '../../../utils/useMeiliSearch'

export default async function (req: any, res: any) {
	const { query } = req.query

	const client = useMeiliSearch()

	// ToDo: Find a place to define index names in code
	const results = await client
		.index('platforms')
		.search(query)
		.then((res) => {
			return res.hits
		})

	res.send(results)
}
