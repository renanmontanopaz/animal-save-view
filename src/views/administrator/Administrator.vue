<template>
  <main class="column is-full">
    <article class="panel is-primary">
      <p class="panel-heading">Gestão de Acesso</p>
      <p class="panel-tabs">
        <a v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }" @click="activateTab(tab)">
          <span>{{ tab.label }}</span>
        </a>
      </p>
      <div class="panel-block" v-if="tabs[0].isActive">
        <div class="tabela">
          <table class="table is-bordered is-striped is-narrow is-hoverable">
            <thead class="blue">
            <tr style="background: hsl(171deg, 100%, 41%)">
              <th>ID do Usuário</th>
              <th>Data &nbsp; &nbsp; &nbsp;|&nbsp; &nbsp; &nbsp; Hora</th>
              <th>Nome</th>
              <th>Tipo de Usuário</th>
              <th>Ação</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in allPending" :key="item.id">
              <td>{{item.id}}</td>
              <th>{{item.register}}
                <th>{{item.firstName+" "+ item.lastName}}</th>
                <th>{{item.user.authorities.map((t) =>(t.authority)).join(',')}}</th>
              </th>
              <td v-if="item.user.authorities.map((t) =>(t.authority)).join(',') == 'ROLE_PROVIDER'">
                <button class="button is-small is-default">Aprovar</button>
              </td>
              <td v-if="item.user.authorities.map((t) =>(t.authority)).join(',') == 'ROLE_ASSOCIATE'">
                <button class="button is-small is-default">Aprovar</button>
              </td>
              <td v-if="item.user.authorities.map((t) =>(t.authority)).join(',') == 'ROLE_CAREGIVER'">
                <button class="button is-small is-default">Aprovar</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </article>
  </main>
</template>

<style>
a{
  display: flex;
}
.panel.is-primary .panel-tabs a.is-active {
  border-bottom-color: hsl(171deg, 100%, 41%);
}
</style>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {Occurrences} from "@/model/Occurrences";
import {User} from "@/model/User";
import {AdminClient} from "@/client/Admin.client";
import {Associate} from "@/model/Associate";
import {Caregiver} from "@/model/Caregiver";
import {Provider} from "@/model/Provider";
import {pendings} from "@/model/Pending";
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
  requisicao: string;
}

@Component
export default class Administrator extends Vue {
  private occurrencesList: Occurrences[] = []
  public usersList: User[] = []
  public allPending: pendings[] = []
  public adminClient: AdminClient = new AdminClient();
  tabs: Tab[] = [
    { label: 'Usuários Pendentes', icon: 'fas fa-image', isActive: true,requisicao: "onClickRequisicao()" },
    { label: 'Cadastros Pendentes', icon: 'fas fa-image', isActive: false,requisicao: "" },
    { label: 'Registro Público', icon: 'fas fa-image', isActive: false,requisicao: "" },
    { label: 'Gerenciar Usuários', icon: 'fas fa-image', isActive: false,requisicao: "" }
  ];
  activeTab: Tab | null = this.tabs.find(tab => tab.isActive) || null;
  activateTab(tab: Tab): void {
    this.tabs.forEach((t: Tab) => {
      t.isActive = (t === tab);
    });
    this.activeTab = tab.isActive ? tab : null;
  }

  public onClickRequisicao(): void {
    this.adminClient.findAllPending().then(
        success => {
          this.allPending = success
          console.log(this.allPending)
        },
        error => {
          console.log(error)
        }
    )
  }
}

</script>