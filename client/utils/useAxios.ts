import axios from "axios";

import Cookies from 'js-cookie'

export default function useAxios() {
	const token = Cookies.get('token')

	if(token !== undefined) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	}

	return axios
}