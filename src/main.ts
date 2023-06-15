import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/js/all'
import 'bulma/bulma.sass'
import {useRouter} from "vue-router/composables";
import {Token} from "@/model/Token";
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
export default {
  setup() {
    const router = useRouter();

    // Verifica a autenticação antes de cada navegação
    router.beforeEach((to, from, next) => {
      const requiresAuth = Token;

      // Simule a lógica de autenticação, por exemplo, verificando se o usuário está logado
      const isAuthenticated = true; // Altere isso de acordo com sua lógica real

      if (requiresAuth && !isAuthenticated) {
        // Redireciona para a página de login se a autenticação for necessária e o usuário não estiver autenticado
        next('/login');
      } else {
        // Permite a navegação para a rota solicitada
        next();
      }
    });
  },
};