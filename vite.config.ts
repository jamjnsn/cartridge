import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import path from 'path'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'

export default defineConfig({
	plugins: [
		vue(),
		Pages({
			dirs: 'client/pages',
			extendRoute(route, parent) {
				// Protect all admin routes
				if (route.path.startsWith('/admin')) {
					return {
						...route,
						meta: { requiresAdmin: true }
					}
				}

				if (route.path === '/login') {
					// Require guest for login page
					return {
						...route,
						meta: { requiresGuest: true }
					}
				} else {
					// Require login for all other pages
					return {
						...route,
						meta: { requiresLogin: true }
					}
				}

				return route
			}
		}),
		AutoImport({
			dts: './client/auto-imports.d.ts',
			imports: ['vue', 'vue-router'],
			defaultExportByFilename: true,
			dirs: ['client/utils']
		}),
		Components({
			dts: './client/components.d.ts',
			dirs: ['client/components', 'client/views', 'client/layouts'],
			types: [
				{
					from: 'vue-router',
					names: ['RouterLink', 'RouterView']
				}
			]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(path.join(__dirname, 'client'))
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true
			},

			'/storage': {
				target: 'http://localhost:3000',
				changeOrigin: true
			},

			'/files': {
				target: 'http://localhost:3000',
				changeOrigin: true
			}
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/assets/styles/utilities/global.scss";`
			}
		}
	}
})
