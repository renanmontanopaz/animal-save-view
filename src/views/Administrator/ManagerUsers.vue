<template>
  <div class="content column is-12">

      <p class="panel-tabs">
        <a v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }" @click="activateTab(tab)">
          <span>{{ tab.label }}</span>
        </a>
      </p>
    <div class="panel-block columns is-desktop" v-if="tabs[0].isActive" style=" align-items: flex-start; flex-wrap: wrap; gap: 10px">

      <div class="card column" v-for="item in userCaregiverList">
        <header class="card-header">
          <p class="card-header-title" style="margin-bottom: 5px">
            {{item.firstName}}
          </p>
          <button class="card-header-icon" aria-label="more options" @click="openDrop(item.id, item.firstName)">
            <p style="margin-top: 10px">Detalhar</p>
            <span class="icon">
            <i class="fas fa-angle-down" :id="item.firstName" aria-hidden="true"></i>
          </span>
          </button>
        </header>
        <div class="card-content" v-if="select == item.id">
          <div class="content" :id="item.lastName">
              <table style="text-align: start;overflow-wrap: break-word;" class="table is-striped is-narrow is-hoverable">
                <tr><td></td><td></td></tr>
                <tr>
                  <td>Nome</td>
                  <td><strong>{{item.firstName}}</strong></td>
                </tr>
                <tr>
                  <td>Sobrenome</td>
                  <td><strong>{{item.lastName}}</strong></td>
                </tr>
                <tr>
                  <td>Contato</td>
                  <td><strong>{{item.contact}}<br/>{{item.user.login}}</strong></td>
                </tr>
                <tr>
                  <td>CPF</td>
                  <td><strong>{{item.cpf}}</strong></td>
                </tr>
                <tr>
                  <td>Endereço</td>
                  <td><strong>{{"CEP: "+item.address.cep}}<br/>{{"Rua: "+item.address.road}}<br/>{{"Número: "+item.address.houseNumber}}
                  <br/>{{"Bairro: "+item.address.neighborhood}}
                  </strong></td>
                </tr>
                <tr>
                  <td>Espaço físico</td>
                  <td><strong>{{item.physicalSpace+" M²"}}</strong></td>
                </tr>
                <tr>
                  <td>Credenciais de Login</td>
                  <td><strong>{{item.user.login}}<br/>Senha: Criptografada</strong></td>
                </tr>
                <tr>
                  <td>Tipo de Usuário</td>
                  <td><strong v-if="item.user.roles[0].authority === 'ROLE_CAREGIVER'">Protetor(a)</strong></td>
                </tr>
                <tr>
                  <td>Data do Cadastro</td>
                  <td><strong>{{item.register}}</strong></td>
                </tr>
              </table>

          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" style="background-color: #FFDC7D; color: black" @click="showModal()">Editar</a>
          <ModalManagerCaregiver v-show="isModalVisible" @close="closeModal" :caregiver="userCaregiverList" :id-caregiver="item.id"></ModalManagerCaregiver>
          <a class="card-footer-item" style="background-color: #F03A5F; color: white" @click="EditCaregiver(item.id)">Deletar</a>
        </footer>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {Message} from "@/model/Message";
import {AdminClient} from "@/client/Admin.client";
import {AssociateClient} from "@/client/Associate.client";
import {CaregiverClient} from "@/client/Caregiver.client";
import {ProviderClient} from "@/client/Provider.client";
import {Caregiver} from "@/model/Caregiver";
import {Associate} from "@/model/Associate";
import {Provider} from "@/model/Provider";
import ModalManagerCaregiver from "@/views/Administrator/ModalManagerCaregiver.vue";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}
@Component({
  components: {ModalManagerCaregiver}
})
export default class ManagerUsers extends Vue {
  public notificacao: Message = new Message();
  isVisible = false;
  isModalVisible = false
  private adminClient: AdminClient = new AdminClient();
  public userAssociateList: Associate[] = []
  public userCaregiverList: Caregiver[] = []
  public userProviderList: Provider[] = []
  public associateClient: AssociateClient = new AssociateClient()
  public caregiverClient: CaregiverClient = new CaregiverClient()
  public providerClient: ProviderClient = new ProviderClient()
  public mounted(): void {
    this.ListUsersProvider();
    this.ListUsersAssociate();
    this.ListUsersCareriver();
  }

  tabs: Tab[] = [
    { label: 'Protetor(a)', icon: 'fas fa-image', isActive: true },
    { label: 'Associado(a)', icon: 'fas fa-image', isActive: false },
    { label: 'Fornecedor(a)', icon: 'fas fa-image', isActive: false }
  ];
  activeTab: Tab | null = this.tabs.find(tab => tab.isActive) || null;
  activateTab(tab: Tab): void {
    this.tabs.forEach((t: Tab) => {
      t.isActive = (t === tab);
    });
    this.activeTab = tab.isActive ? tab : null;
  }
  public ListUsersAssociate(): void {
    this.associateClient.listAll().then(
        sucess => {
          this.userAssociateList = sucess
        },
        error => {
          console.log(error)
        }
    )
  }
  public ListUsersProvider(): void {
    this.providerClient.listAll().then(
        sucess => {
          this.userProviderList = sucess
        },
        error => {
          console.log(error)
        }
    )
  }
  public ListUsersCareriver(): void {
    this.caregiverClient.listAll().then(
        sucess => {
          this.userCaregiverList = sucess
        },
        error => {
          console.log(error)
        }
    )
  }

  public select: number = 0;

  public openDrop(id:number, icone:string) {
    const icon = document.getElementById(`${icone}`) as HTMLElement;
    if(this.select === id){
      this.select = 0;
      icon.classList.remove('fa', 'fa-angle-up');
      icon.classList.add('fas', 'fa-angle-down');
    } else {
      this.select = id;
      icon.classList.remove('fas', 'fa-angle-down');
      icon.classList.add('fa', 'fa-angle-up');
    }
  }
  public EditCaregiver(id:number): void {
    const foundCaregiver = this.userCaregiverList.find((item) => item.id === id);
    console.log(foundCaregiver)
    if (foundCaregiver !== undefined) {
      foundCaregiver.active = false;
      this.caregiverClient.disable(id).then(
          success => {
            console.log(success)
          },
          error => {
            console.log(error)
          }
      )
    } else {
      console.log('Não foi encontrado um cuidador com o ID fornecido.');
    }
  }

  public showModal(): void {
    this.isModalVisible = true;

  }
  public closeModal(): void {
    this.isModalVisible = false;
  }
}

</script>
<style scoped>
td{
  overflow-wrap: break-word;
}
tr{
  flex-wrap: wrap;
}
</style>