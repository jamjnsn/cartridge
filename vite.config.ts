import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname)
		}
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true
			}
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/client/assets/styles/global.scss";`
			}
		}
	}
})
