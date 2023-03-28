import { createRouter, createWebHistory } from 'vue-router'

import routes from '~pages'
import checkAuth from './middleware/checkAuth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...routes]
})

router.beforeEach(checkAuth)

export default router
