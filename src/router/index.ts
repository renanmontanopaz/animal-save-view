import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/LandingPage/Home.vue"
import AboutUs from '@/views/LandingPage/AboutUs.vue';
import Partners from '@/views/LandingPage/Partners.vue';
import Footer from '@/views/LandingPage/Footer.vue';
import Header from '@/views/LandingPage/Header.vue';
import Login from "@/views/Login.vue";
import RegisterAnimal from "@/views/Protetora/RegisterAnimals.vue";
import Register from "@/views/RegisterUsers/Register.vue";
import Associate from "@/views/associate/Associate.vue";
import Administrator from "@/views/Administrator/Administrator.vue";
import { Token } from "@/model/Token";
import Modal from "@/views/Modal.vue";
import HeaderVue from '@/views/LandingPage/Header.vue';

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
    path: "/",
    name: "Header",
    component: Header,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/quem-somos",
        component: AboutUs,
      },
      {
        path: "/parceiros",
        component: Partners,
      },
      {
        path: "/contato",
        component: Footer,
      }
    ]
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
