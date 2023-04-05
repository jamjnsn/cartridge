import prisma from '../../utils/prisma'

export default async function (req: any, res: any) {
	const unmatchedFiles = await prisma.unmatchedFiles.findMany()
	res.send(unmatchedFiles)
}

export const middleware = ['requireAuth']
