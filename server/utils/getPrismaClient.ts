import { PrismaClient } from '@prisma/client'

// ToDo: Find a way to not duplicate instances for a session
export const getPrismaClient = () => {
	return new PrismaClient()
}
