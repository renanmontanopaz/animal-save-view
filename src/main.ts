import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/js/all'
import 'bulma/bulma.sass'
import Login from "@/views/Login.vue";
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
    const loginInstance = new Login();

    // Verifica a autenticação antes de cada navegação

  },
};