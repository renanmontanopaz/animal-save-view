import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from "@/views/Login.vue";
import Register from "@/views/RegisterUsers/Register.vue"

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
