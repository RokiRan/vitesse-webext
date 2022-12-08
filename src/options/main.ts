import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import App from './Options.vue'
import 'ant-design-vue/dist/antd.css'
import '../styles'
import router from './router'
import { pinia } from './store'
import { io } from 'socket.io-client'

// const socket = io('ws://localhost:4000')

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
