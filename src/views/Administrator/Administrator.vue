<template>
  <main class="content column">
    <div class="panel is-primary">
      <p class="panel-heading">Gestão de Acesso</p>
      <p class="panel-tabs">
        <a v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }" @click="activateTab(tab)">
          <span>{{ tab.label }}</span>
        </a>
      </p>

      <div>
        <div v-if="user.id">
          <article :value="user" class="message is-success">
            <div class="message-header">
              <p>{{ user.login }}</p>
              <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
              <div>
                {{  }}
              </div>
            </div>
          </article>
        </div>
      </div>


      <div class="panel-block" v-if="tabs[0].isActive"
        style="display: flex; justify-content: center; flex-direction: column">
        <div class="columns" v-if="notificacao.ativo">
          <div class="column is-12">
            <div :class="notificacao.classe" v-if="isVisible">
              <button @click="onClickFecharNotificacao" class="delete"></button>
              {{ notificacao.mensagem }}
            </div>
          </div>
        </div>
        <div class="table-container">
          <table class="table is-bordered is-striped is-narrow is-hoverable">
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
              <tr class="table-row" v-for="item in allPending" @click="findByIdUser(item.user.id)">
                <td>{{ item.user.id }}</td>
                <td>{{ item.register }}</td>
                <td>{{ item.businessName == null ? item.firstName + " " + item.lastName : item.businessName }}</td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_ASSOCIATE'">Associado(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_PROVIDER'">Fornecedor(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_CAREGIVER'">Protetor(a)</td>
                <td class="container_buttons">
                  <button class="button is-small is-info" @click=""><strong>Detalhar</strong></button>
                  <button class="button is-small is-success"
                    @click="updateToApproved(item.user.id)"><strong>Aprovar</strong></button>
                  <button class="button is-small is-danger"
                    @click="updateToRejected(item.user.id)"><strong>Rejeitar</strong></button>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <RegisterPublic v-if="tabs[1].isActive"></RegisterPublic>
      <ManagerUsers v-if="tabs[2].isActive"></ManagerUsers>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Occurrences } from "@/model/Occurrences";
import { User } from "@/model/User";
import { AdminClient } from "@/client/Admin.client";
import { pendings } from "@/model/Pending";
import { Message } from "@/model/Message";
import RegisterPublic from "@/views/Administrator/RegisterPublic.vue";
import ManagerUsers from "@/views/Administrator/ManagerUsers.vue";
import { AssociateClient } from '@/client/Associate.client';
import { Associate } from '@/model/Associate';
import { ProviderClient } from '@/client/Provider.client';
import { Provider } from '@/model/Provider';
import { UserClient } from '@/client/User.client';

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}

@Component({
  components: {
    RegisterPublic,
    ManagerUsers
  }
})
export default class Administrator extends Vue {
  public adminClient: AdminClient = new AdminClient();
  public associateClient: AssociateClient = new AssociateClient();
  public providerClient: ProviderClient = new ProviderClient();
  public userClient: UserClient = new UserClient();

  public notificacao: Message = new Message();

  public associate: Associate = new Associate();
  public provider: Provider = new Provider();
  public user: User = new User();

  public allPending: pendings[] = [];

  isVisible = false;

  public mounted(): void {
    this.onClickRequisicao();
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

  public findByIdUser(id: number): void {
    this.userClient.findById(id).then(
      success => {
        this.user = success
        console.log(this.user)
      },
      error => console.log(error)
    )
  }


  public updateToApproved(id: number): void {
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

  public updateToRejected(id: number): void {
    this.adminClient.updateStatusUserPendingToRejected(id).then(
      success => {
        this.showComponent();
        this.notificacao = this.notificacao.new(
          true, 'notification is-danger', 'Usuário Rejeitado!'/*+ error.config.data*/
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

<style>
a {
  display: flex;
}

.panel.is-primary .panel-tabs a.is-active {
  border-bottom-color: hsl(171deg, 100%, 41%);
}

.table-row {
  cursor: pointer;
}

.container_buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
