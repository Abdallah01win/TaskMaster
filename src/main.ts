import './assets/main.css'

import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const state = localStorage.getItem('state')

if (state) {
  pinia.state.value = JSON.parse(state)
}

watch(
  pinia.state,
  (state) => {
    localStorage.setItem('state', JSON.stringify(state))
  },
  { deep: true },
)

app.use(pinia)
app.use(router)

app.mount('#app')
