import { createApp } from 'vue'
import App from './Options.vue'
import '../styles'
import router from './router'
const app = createApp(App)
app.use(router)
app.mount('#app')
