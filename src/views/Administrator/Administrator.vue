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
        <div v-if="select === '1'">
          <div class="message-body modal-container">
            <div class="container-all-inputs-modal">
              <div class="container-inputs-modal">
                <div class="field">
                  <label class="label">Data & hora</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.register" readonly>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Nome</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.firstName" readonly>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Sobrenome</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.lastName" readonly>
                  </div>
                </div>
              </div>

              <div class="container-inputs-modal">
                <div class="field">
                  <label class="label">CPF</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.cpf" readonly>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.user.login" readonly>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Contato</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.contact" readonly>
                  </div>
                </div>
              </div>

              <div class="container-inputs-modal">
                <div class="field">
                  <label class="label">Bairro</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.address.neighborhood" readonly>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Rua</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.address.road" readonly>
                  </div>
                </div>

                <div class="field">
                  <label class="label">Número</label>
                  <div class="control">
                    <input class="input" type="text" v-model="associate.address.houseNumber" readonly>
                  </div>
                </div>
              </div>
              <div id="container-bottons" class="field is-grouped">
                <div class="control">
                  <button @click="updateToRejected(associate.user.id)"
                    class="button is-danger is-focused">Rejeitar</button>
                </div>

                <div class="control">
                  <button @click="updateToApproved(associate.user.id)"
                    class="button is-success is-focused">Aprovar</button>
                </div>

                <div class="control">
                  <button @click="closeModal" class="button is-info is-focused">Voltar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="select === '2'">
          <article :value="provider" class="message is-success">
            <div class="message-header">
              <p>{{ provider.user.login }}</p>
              <button class="delete" aria-label="delete" @click="closeModal()"></button>
            </div>
            <div class="message-body">
              <div>
                Exemplo de conteúdo
              </div>
            </div>
          </article>
        </div>
      </div>

      <div>
        <div v-if="select === '3'">
          <article :value="caregiver" class="message is-success">
            <div class="message-header">
              <p>{{ caregiver.user.login }}</p>
              <button class="delete" aria-label="delete" @click="closeModal()"></button>
            </div>
            <div class="message-body">
              <div>
                Exemplo de conteúdo
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
              <tr class="table-row" v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_ASSOCIATE'"
                v-for="item in allPending" @click="findByIdAssociate(item.id)">
                <td>{{ item.user.id }}</td>
                <td>{{ item.register }}</td>
                <td>{{ item.businessName == null ? item.firstName + " " + item.lastName : item.businessName }}</td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_ASSOCIATE'">Associado(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_PROVIDER'">Fornecedor(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_CAREGIVER'">Protetor(a)</td>
                <td class="container_buttons">
                  <button :class="['button', 'is-small', 'is-success', { 'is-disabled': select !== '0' }]"
                    :disabled="select !== '0'" @click="updateToApproved(item.user.id)"><strong>Aprovar</strong></button>
                  <button :class="['button', 'is-small', 'is-danger', { 'is-disabled': select !== '0' }]"
                    :disabled="select !== '0'" @click="updateToRejected(item.user.id)"><strong>Rejeitar</strong></button>
                </td>
              </tr>

              <tr class="table-row" v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_PROVIDER'"
                v-for="item in allPending" @click="findByIdProvider(item.id)">
                <td>{{ item.user.id }}</td>
                <td>{{ item.register }}</td>
                <td>{{ item.businessName == null ? item.firstName + " " + item.lastName : item.businessName }}</td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_ASSOCIATE'">Associado(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_PROVIDER'">Fornecedor(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_CAREGIVER'">Protetor(a)</td>
                <td class="container_buttons">
                  <button :class="['button', 'is-small', 'is-success', { 'is-disabled': select !== '0' }]"
                    :disabled="select !== '0'" @click="updateToApproved(item.user.id)"><strong>Aprovar</strong></button>
                  <button :class="['button', 'is-small', 'is-danger', { 'is-disabled': select !== '0' }]"
                    :disabled="select !== '0'" @click="updateToRejected(item.user.id)"><strong>Rejeitar</strong></button>
                </td>
              </tr>

              <tr class="table-row" v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_CAREGIVER'"
                v-for="item in allPending" @click="findByIdCaregiver(item.id)">
                <td>{{ item.user.id }}</td>
                <td>{{ item.register }}</td>
                <td>{{ item.businessName == null ? item.firstName + " " + item.lastName : item.businessName }}</td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_ASSOCIATE'">Associado(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_PROVIDER'">Fornecedor(a)
                </td>
                <td v-if="item.user.authorities.map((t) => (t.authority)).join(',') === 'ROLE_CAREGIVER'">Protetor(a)</td>
                <td class="container_buttons">
                  <button :class="['button', 'is-small', 'is-success', { 'is-disabled': select !== '0' }]"
                    :disabled="select !== '0'" @click="updateToApproved(item.user.id)"><strong>Aprovar</strong></button>
                  <button :class="['button', 'is-small', 'is-danger', { 'is-disabled': select !== '0' }]"
                    :disabled="select !== '0'" @click="updateToRejected(item.user.id)"><strong>Rejeitar</strong></button>
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

<script lang="ts" scoped>
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
import { Caregiver } from '@/model/Caregiver';
import { CaregiverClient } from '@/client/Caregiver.client';

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
  public caregiverClient: CaregiverClient = new CaregiverClient();

  public notificacao: Message = new Message();

  public associate: Associate = new Associate();
  public provider: Provider = new Provider();
  public caregiver: Caregiver = new Caregiver();

  public allPending: pendings[] = [];

  isVisible = false;

  public select: string = '0';

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

  public findByIdAssociate(id: number): void {
    this.associateClient.findById(id).then(
      success => {
        this.associate = success
        this.select = "1"
        console.log(this.associate)
      },
      error => console.log(error)
    )
  }

  public findByIdProvider(id: number): void {
    this.providerClient.findById(id).then(
      success => {
        this.provider = success
        this.select = "2"
        console.log(this.provider)
      },
      error => console.log(error)
    )
  }

  public findByIdCaregiver(id: number): void {
    this.caregiverClient.findById(id).then(
      success => {
        this.caregiver = success
        this.select = "3"
        console.log(this.caregiver)
      },
      error => console.log(error)
    )
  }

  public updateToApproved(id: number): void {
    this.adminClient.updateStatusPendingToApproved(id).then(
      success => {
        this.showComponent();
        this.notificacao = this.notificacao.new(
          true, 'notification is-success', 'Usuário Aprovado!'
        )
        this.onClickRequisicao()
        this.select = "0"
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
        this.select = "0"
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

  public closeModal() {
    this.select = "0";
  }
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.is-disabled {
  display: none;
}

.container-all-inputs-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(228, 228, 228);
  border-radius: 10px;
  padding: 30px;
  border: 2px solid black;
}

.container-inputs-modal {
  display: flex;
  gap: 20px;
}

#container-bottons {
  padding-top: 15px;
}

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
