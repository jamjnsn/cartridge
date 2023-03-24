import { useUserStore } from '../utils/useUserStore'
import Cookies from 'js-cookie'
import useAxios from '@/utils/useAxios'

export default async function checkAuth(to: any, from: any) {
	const axios = useAxios()
	const user = useUserStore()
	const token = Cookies.get('token')

	if (token === undefined) {
		user.username = undefined
	} else {
		await axios
			.get('/api/me', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((res) => {
				user.$patch(res.data)
			})
			.catch((e) => {
				user.username = undefined
			})
	}

	if (to.meta.requiresGuest && user.username !== undefined) {
		return {
			name: 'home'
		}
	}

	if ((to.meta.requiresLogin || to.meta.requiresAdmin) && user.username === undefined) {
		return {
			name: 'login'
		}
	}

	if (to.meta.requiresAdmin && !user.isAdmin) {
		return {
			name: 'home'
		}
	}
}
