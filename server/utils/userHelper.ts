import { hashSync, compareSync, genSaltSync } from 'bcrypt'
import { User } from '@prisma/client'

const userHelper = {
	hashPassword(password: string): string {
		const salt = genSaltSync()
		return hashSync(password, salt)
	},

	comparePassword(password: string, hashedPassword: string): boolean {
		if (password === undefined || hashedPassword === undefined) return false
		return compareSync(password, hashedPassword)
	},

	serialize(user: User): any {
		return {
			id: user.id,
			username: user.username,
			isAdmin: user.isAdmin
		}
	},

	serializeMany(users: User[]): any[] {
		const serializedUsers: any[] = []

		for (const user of users) {
			serializedUsers.push(this.serialize(user))
		}

		return serializedUsers
	}
}

export default userHelper
