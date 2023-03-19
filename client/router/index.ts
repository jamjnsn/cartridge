import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import getUser from '../middleware/getUser'
import requireLogin from '../middleware/requireLogin'
import requireGuest from '../middleware/requireGuest'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			beforeEnter: requireLogin
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
			beforeEnter: requireGuest
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => import('../views/LogoutView.vue'),
			beforeEnter: requireLogin
		}
	]
})

router.beforeEach(getUser)

export default router
