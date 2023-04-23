export const getAuthHeader = () => {
	const token = useCookie('token')
	return `Bearer ${token.value}`
}
