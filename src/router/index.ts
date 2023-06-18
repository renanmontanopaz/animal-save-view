import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/RegisterUsers/Register.vue"
import Associate from "@/views/associate/Associate.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path:'/register',
    name: 'home',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/associado',
    name: 'associado',
    component: Associate,
    meta: { requiresAuth: true, allowedRoles: ['admin','associate'] }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
