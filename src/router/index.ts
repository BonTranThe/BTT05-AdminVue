import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import ManageView from '../views/ManageView.vue'
import LoginUser from '../components/LoginUser.vue'
import RegisterUser from '../components/RegisterUser.vue'
import BackGround from '../components/BackGround.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginUser,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterUser,
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageView,
    children: [
      {
        path: '/homemanage',
        name: 'homemanage',
        component: BackGround,
      }
    ],
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
