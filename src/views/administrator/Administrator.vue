<template>
  <main class="content column">
    <div class="panel is-primary">
      <p class="panel-heading">Gestão de Acesso</p>
      <p class="panel-tabs">
        <a v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }" @click="activateTab(tab)">
          <span>{{ tab.label }}</span>
        </a>
      </p>
      <div class="panel-block" v-if="tabs[0].isActive" style="display: flex; justify-content: center; flex-direction: column">
        <div class="columns" v-if="notificacao.ativo">
          <div class="column is-12">
            <div :class="notificacao.classe" v-if="isVisible">
              <button @click="onClickFecharNotificacao" class="delete" ></button>
              {{ notificacao.mensagem }}
            </div>
          </div>
        </div>
        <div class="table-container">
          <table class="table is-bordered is-striped is-narrow is-hoverable" >
            <thead class="blue">
            <tr style="background: hsl(171deg, 100%, 41%)">
              <th>ID do Usuário</th>
              <th>Data & Hora</th>
              <th>Nome</th>
              <th>Tipo de Usuário</th>
              <th>Ação</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in allPending" :key="item.id">
              <td>{{item.id}}</td>
              <th>{{item.register}}
                <th>{{item.businessName == null ? item.firstName+" "+ item.lastName : item.businessName}}</th>
                <th>{{item.user.authorities.map((t) =>(t.authority)).join(',')}}</th>
              </th>
              <td v-if="item.user.authorities.map((t) =>(t.authority)).join(',') == 'ROLE_PROVIDER'">
                <button class="button is-small is-link" @click="updateProvider(item.id)"><strong>Aprovar</strong></button>
                <button class="button is-small is-danger"><strong>Rejeitar</strong></button>
              </td>
              <td v-if="item.user.authorities.map((t) =>(t.authority)).join(',') == 'ROLE_ASSOCIATE'">
                <button class="button is-small is-link" @click="updateAssociate(item.id)"><strong>Aprovar</strong></button>
                <button class="button is-small is-danger" @click=""><strong>Rejeitar</strong></button>
              </td>
              <td v-if="item.user.authorities.map((t) =>(t.authority)).join(',') == 'ROLE_CAREGIVER'">
                <button class="button is-small is-link" @click="updateCaregiver(item.id)"><strong>Aprovar</strong></button>
                <button class="button is-small is-danger"><strong>Rejeitar</strong></button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <RegisterPublic v-if="tabs[1].isActive"></RegisterPublic>
    </div>
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
import {Component, Vue} from 'vue-property-decorator';
import {Occurrences} from "@/model/Occurrences";
import {User} from "@/model/User";
import {AdminClient} from "@/client/Admin.client";
import {pendings} from "@/model/Pending";
import {Message} from "@/model/Message";
import RegisterPublic from "@/views/administrator/RegisterPublic.vue";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}

@Component({
  components: {RegisterPublic}
})
export default class Administrator extends Vue {

  private occurrencesList: Occurrences[] = []
  public usersList: User[] = []
  public allPending: pendings[] = []
  public adminClient: AdminClient = new AdminClient();
  public notificacao: Message = new Message();
  isVisible = false;
  public mounted(): void{
    this.onClickRequisicao()
  }
  tabs: Tab[] = [
    { label: 'Usuários Pendentes', icon: 'fas fa-image', isActive: true },
    { label: 'Registro Público', icon: 'fas fa-image', isActive: false },
    { label: 'Gerenciar Usuários', icon: 'fas fa-image', isActive: false }
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

  public updateAssociate(id:number): void {
    this.adminClient.updateStatusPendingToApproved(id).then(
        success => {
          this.showComponent();
          this.notificacao = this.notificacao.new(
              true, 'notification is-primary', 'Usuário Aprovado!'/*+ error.config.data*/
          )
          this.onClickRequisicao()
        },
        error => {
          console.log(error)
        }
    )
  }

  public updateCaregiver(id:number): void {
    this.adminClient.updateStatusCaregiverPendingToApproved(id).then(
        success => {
          this.showComponent();
          this.notificacao = this.notificacao.new(
              true, 'notification is-primary', 'Usuário Aprovado!'/*+ error.config.data*/
          )
          this.onClickRequisicao()
        },
        error => {
          console.log(error)
        }
    )
  }

  public updateProvider(id:number): void {
    this.adminClient.updateStatusProviderPendingToApproved(id).then(
        success => {
          this.showComponent();
          this.notificacao = this.notificacao.new(
              true, 'notification is-primary', 'Usuário Aprovado!'/*+ error.config.data*/
          )
          this.onClickRequisicao()
        },
        error => {
          console.log(error)
        }
    )
  }
  public showComponent(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 4000); // Tempo em milissegundos (5 segundos)
  }
  public onClickFecharNotificacao(): void {
    this.notificacao = new Message()
  }

}
</script>
