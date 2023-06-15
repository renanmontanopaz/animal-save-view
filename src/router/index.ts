import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from "@/views/Login.vue";
import Associate from "@/views/associate/Associate.vue";
import Administrator from "@/views/administrator/Administrator.vue";
import {Token} from "@/model/Token";
import {LoginUser} from "@/model/Login";

Vue.use(VueRouter)
const loginInstance = new Login();
const tokenLogin: Token = loginInstance.tokenLogin;
const user: LoginUser = loginInstance.login
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
    meta: { requiresAuth: true }
  },
  {
    path: '/administrador',
    name: 'Adminitrador',
    component: Administrator,
    meta: {requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = tokenLogin.auth
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && user) {
    // Redireciona para a página de login se a autenticação for necessária e o usuário não estiver autenticado
    next('/login');
  } else {
    // Permite a navegação para a rota solicitada
    next();
  }
});
export default router
