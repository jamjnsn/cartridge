import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
	state: () => ({ id: undefined, username: undefined, isAdmin: false })
})
