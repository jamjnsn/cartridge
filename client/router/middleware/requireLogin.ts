import { useUserStore } from '../../utils/useUserStore'

export default async function requireLogin(to: any, from: any) {
	const user = useUserStore()

	if (user.username === undefined) {
		return { name: 'login' }
	}
}
