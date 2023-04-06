import { compareSync } from 'bcrypt'

export const checkPassword = (password: string, hash: string) => {
	return compareSync(password, hash)
}
