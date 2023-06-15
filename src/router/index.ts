import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from "@/views/Login.vue";
import Associate from "@/views/associate/Associate.vue";
import Administrator from "@/views/administrator/Administrator.vue";

Vue.use(VueRouter)

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
    meta: { requiresAuth: true, allowedRoles: ['admin','associate'] }
  },
  {
    path: '/administrador',
    name: 'Adminitrador',
    component: Administrator,
    meta: {requiresAuth: true, allowedRoles: ['admin']}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
