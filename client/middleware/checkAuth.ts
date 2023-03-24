import axios from 'axios'
import { useUserStore } from '../utils/useUserStore'
import Cookies from 'js-cookie'

export default async function checkAuth(to: any, from: any) {
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
