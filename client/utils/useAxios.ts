import axios from 'axios'
import axiosRetry from 'axios-retry'

axiosRetry(axios, {
	retries: Infinity,
	retryDelay: (retryCount) => {
		return retryCount * 1000
	}
})

import Cookies from 'js-cookie'

export function useAxios() {
	const token = Cookies.get('token')

	if (token !== undefined) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	}

	return axios
}
