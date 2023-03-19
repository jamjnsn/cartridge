import axios from 'axios'
import { useUserStore } from '../utils/useUserStore'
import Cookies from 'js-cookie'

export default async function getUser(to: any, from: any) {
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
}
