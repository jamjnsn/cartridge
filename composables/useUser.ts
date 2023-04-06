export const useUser = () => {
	return useState<LoginUser | null>('user', () => null)
}
