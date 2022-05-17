import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginUser from '../components/LoginUser.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginUser,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'login',
    component: LoginUser,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
})

export default router
