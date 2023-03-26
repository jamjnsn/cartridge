import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import path from 'path'

import Components from 'unplugin-vue-components/vite'

export default defineConfig({
	plugins: [
		vue(),
		Components({
			dirs: ['client/components'],
			dts: true,
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
