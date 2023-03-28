import { useUserStore } from '../../utils/useUserStore'

export default async function requireGuest(to: any, from: any) {
	const user = useUserStore()

	if (user.username !== undefined) {
		return { name: 'home' }
	}
}
