import { User } from '@prisma/client'
import jwt from 'jsonwebtoken'

export const createToken = (user: User) => {
	const { jwtSecret } = useRuntimeConfig()

	const payload: LoginUser = {
		id: user.id,
		username: user.username,
		isAdmin: user.isAdmin
	}

	const token = jwt.sign(payload, jwtSecret)

	return token
}
