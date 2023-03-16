import userHelper from '../server/utils/userHelper'
import prisma from '../server/utils/prisma'

async function main() {
	const admin = await prisma.user.upsert({
		where: { id: '1' },
		update: {},
		create: {
			id: '1',
			username: 'admin',
			password: userHelper.hashPassword('hunter2'),
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

export default {}
