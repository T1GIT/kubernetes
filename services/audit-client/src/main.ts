import App from '@/App.vue'
import { primeVueConfig } from '@/core/constants/prime-vue-config'
import { repairsRoute } from '@/repairs/router'
import { RoutePath } from '@/shared/constants/route-path'
import { violationsRoute } from '@/violations/router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import dayjs from 'dayjs'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import 'dayjs/locale/ru'
import './index.css'

dayjs.locale('ru')

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: RoutePath.ROOT, redirect: RoutePath.VIOLATIONS },
    violationsRoute,
    repairsRoute,
  ],
})
app.use(router)

app
  .use(PrimeVue, primeVueConfig)
  .use(ToastService)
  .directive('ripple', Ripple)

app.use(VueQueryPlugin)

app.mount('#app')
