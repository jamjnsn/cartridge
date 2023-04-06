import { PrismaClient } from '@prisma/client'
import { hashSync, genSaltSync } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
	const salt = genSaltSync()

	const admin = await prisma.user.upsert({
		where: { id: '1' },
		update: {},
		create: {
			id: '1',
			username: 'admin',
			password: hashSync('hunter2', salt),
			isAdmin: true
		}
	})

	console.log(admin)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
