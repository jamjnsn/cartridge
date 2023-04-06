import jwt from 'jsonwebtoken'

export const decodeToken = (token: string) => {
	const { jwtSecret } = useRuntimeConfig()

	const payload = jwt.verify(token, jwtSecret)
	return payload as LoginUser
}
