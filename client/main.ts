import { createApp } from 'vue'
import { createPinia } from 'pinia'

import devalue from '@nuxt/devalue'

import App from './App.vue'
import router from './router'

import InlineSvg from 'vue-inline-svg'

import './assets/styles/main.scss'
import '@fontsource/poppins'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

devalue(pinia.state.value)

app.component('inline-svg', InlineSvg)

app.mount('#app')
