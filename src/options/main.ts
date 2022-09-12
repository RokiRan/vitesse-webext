import { createApp } from 'vue'
import App from './Options.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '../styles'
import router from './router'
import { pinia } from './store'

const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
