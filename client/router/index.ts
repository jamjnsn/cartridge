import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import checkAuth from '../middleware/checkAuth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { requiresLogin: true }
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('../views/LoginView.vue'),
			meta: { requiresGuest: true }
		},
		{
			path: '/logout',
			name: 'logout',
			component: () => import('../views/LogoutView.vue'),
			meta: { requiresLogin: true }
		},
		{
			path: '/games/:slug',
			name: 'game',
			component: () => import('../views/GameView.vue')
		},
		{
			path: '/admin',
			name: 'admin-dashboard',
			component: () => import('../views/admin/DashboardView.vue'),
			meta: { requiresAdmin: true }
		},
		{
			path: '/admin/users',
			name: 'admin-users',
			component: () => import('../views/admin/UsersView.vue'),
			meta: { requiresAdmin: true }
		},
		{
			path: '/admin/users/:id',
			name: 'admin-users-edit',
			component: () => import('../views/admin/UsersEditView.vue'),
			meta: { requiresAdmin: true }
		},
		{
			path: '/admin/users/create',
			name: 'admin-users-create',
			component: () => import('../views/admin/UsersCreateView.vue'),
			meta: { requiresAdmin: true }
		}
	]
})

router.beforeEach(checkAuth)

export default router
