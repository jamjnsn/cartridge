import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import InlineSvg from 'vue-inline-svg'

import './assets/styles/main.scss'
import '@fontsource/poppins'

const app = createApp(App)

app.use(router)
app.component('inline-svg', InlineSvg)

app.mount('#app')
