import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import InlineSvg from 'vue-inline-svg'
import FeatherIcon from './components/FeatherIcon.vue'

import './assets/styles/main.scss'
import '@fontsource/poppins'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

app.component('inline-svg', InlineSvg)
app.component('feather-icon', FeatherIcon)

app.mount('#app')
