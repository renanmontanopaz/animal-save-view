import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from "@/views/Login.vue";
import Associate from "@/views/associate/Associate.vue";
import Administrator from "@/views/administrator/Administrator.vue";
import {Token} from "@/model/Token";


Vue.use(VueRouter)
const loginInstance = new Login();
const tokenLogin: Token = loginInstance.tokenLogin;
const user: string = loginInstance.tokenLogin.token
const userauth: boolean = loginInstance.tokenLogin.auth
const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/associado',
    name: 'Associado',
    component: Associate,
    beforeEnter: function (to, from, next) {
      const token = localStorage.getItem('token')

      if (!token) {
        next('/login')
      } else {
        next()
      }
    },
  },
  {
    path: '/administrador',
    name: 'Adminitrador',
    component: Administrator,
    beforeEnter: function (to, from, next) {
      const token = localStorage.getItem('token')
      console.log(token)
      if (!token) {
        next('/login')
      } else {
        next()
      }
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
