export const useApiFetch = async <T>(url: string, options: any = {}) => {
	const token = useCookie('token')

	return await useFetch<T>(url, {
		headers: {
			authorization: `Bearer ${token.value}`
		},
		...options
	})
}
