import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import LandingPageHome from "@/views/LandingPage/LandingPageHome.vue"
import LandingPageQuemSomos from '@/views/LandingPage/LandingPageQuemSomos.vue';
import LandingPageParceiros from '@/views/LandingPage/LandingPageParceiros.vue';
import LandingPageContato from '@/views/LandingPage/LandingPageContato.vue';
import Login from "@/views/Login.vue";
import RegisterAnimal from "@/views/Protetora/RegisterAnimals.vue";
import Register from "@/views/RegisterUsers/Register.vue";
import Associate from "@/views/associate/Associate.vue";
import Administrator from "@/views/administrator/Administrator.vue";
import { Token } from "@/model/Token";
import Modal from "@/views/Modal.vue";

Vue.use(VueRouter);
const loginInstance = new Login();
const tokenLogin: Token = loginInstance.tokenLogin;
const user: string = loginInstance.tokenLogin.token;
const userauth: boolean = loginInstance.tokenLogin.auth;
const routes: Array<RouteConfig> = [
  {
    path: "/protetora/register-animal",
    name: "RegisterAnimal",
    component: RegisterAnimal,
  },

  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path:"/",
    name:"LangingPageHome",
    component:LandingPageHome,
  },
  {
    path:"/quem-somos",
    name:"LangingPageQuemSomos",
    component:LandingPageQuemSomos,
  },
  {
    path:"/parceiros",
    name:"LangingPageParceiros",
    component:LandingPageParceiros,
  },
  {
    path:"/contato",
    name:"LangingPageContato",
    component:LandingPageContato,
  },
  {
    path: "/associado",
    name: "Associado",
    component: Associate,
    beforeEnter: function (to, from, next) {
      const token = localStorage.getItem("token");

      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/administrador",
    name: "Adminitrador",
    component: Administrator,
    beforeEnter: function (to, from, next) {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "",
    name: "Modal",
    component: Modal,
    beforeEnter: function (to, from, next) {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        next("/login");
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
