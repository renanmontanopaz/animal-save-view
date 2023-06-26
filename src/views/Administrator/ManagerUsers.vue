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
                <tr>
                  <td>Gasto Mensal</td>
                  <td><strong>{{item.spending}}</strong></td>
                </tr>
              </table>

          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" style="background-color: #FFDC7D; color: black" @click="openModal(item)">Editar</a>
          <a class="card-footer-item" style="background-color: #F03A5F; color: white" @click="EditActiveCaregiver(item.id)">Deletar</a>
        </footer>
      </div>
      <transition name="modal">
      <div v-if="isModalVisible" ref="modalMask" class="modal-mask column is-full">
        <div class="modal-wrapper column is-full">
          <div class="modal-container column is-6">
            <div class="field columns is-desktop">
              <div class="column">
                <input class="input is-info " type="text" placeholder="Nome" v-model="caregiverFound.firstName">
                <input class="input is-info " type="text" placeholder="Sobrenome" v-model="caregiverFound.lastName">
                <input class="input is-info " type="text" placeholder="Telefone" v-model="caregiverFound.contact">
                <input class="input is-info " type="text" placeholder="Email" v-model="caregiverFound.user.login">
                <input class="input is-info " type="text" placeholder="CPF" v-model="caregiverFound.cpf">
                <input class="input is-info " type="text" placeholder="Espaço físico m²" v-model="caregiverFound.physicalSpace">
                <input class="input is-info " type="text" placeholder="Gasto mensal" v-model="caregiverFound.spending">
              </div>
              <div class="column">
                <input class="input is-info " type="text" placeholder="CEP" v-model="caregiverFound.address.cep">
                <input class="input is-info " type="text" placeholder="Rua/Avenida" v-model="caregiverFound.address.road">
                <input class="input is-info " type="number" placeholder="Número" v-model="caregiverFound.address.houseNumber">
                <input class="input is-info " type="text" placeholder="Bairro" style="margin-bottom: 15px" v-model="caregiverFound.address.neighborhood">
              </div>
            </div>
            <div class="control" style="gap: 10px">
              <button class="button is-link" @click="EditCaregiver(caregiverFound)" style="margin-right: 10px">Salvar</button>
              <button class="button is-danger" style="margin-left: 10px" @click="openModal">Fechar</button>
            </div>
          </div>
        </div>
      </div>
      </transition>
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
import {AddressClient} from "@/client/Address.client";
import {Address} from "@/model/Address";
import moment from "moment";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}
interface caregiver {
  "id": number,
  "active": boolean,
  "register": string,
  "update": string,
  "firstName": string,
  "lastName": string,
  "contact": string,
  "cpf": string,
  "address": {
    "id": number
  },
  "physicalSpace": string,
  "spending": string,
  "capacityAnimals": number,
  "user": {
    "id": number
  }
}
@Component
export default class ManagerUsers extends Vue {
  public notificacao: Message = new Message();
  isVisible = false;
  public isModalVisible: Boolean = false;
  private adminClient: AdminClient = new AdminClient();
  public userAssociateList: Associate[] = []
  public userCaregiverList: Caregiver[] = []
  public userProviderList: Provider[] = []
  public associateClient: AssociateClient = new AssociateClient()
  public caregiverClient: CaregiverClient = new CaregiverClient()
  public providerClient: ProviderClient = new ProviderClient()
  public caregiverFound: Caregiver = new Caregiver()
  public addressClient: AddressClient = new AddressClient()
  public address: Address = new Address()

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
  public EditActiveCaregiver(id:number): void {
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

  public EditCaregiver(data: Caregiver): void {
    this.addressClient.update(data.address).then(
        success => {
          console.log(success)
        },
        error => {
          console.log(error)
        }
    )
    const caregiverData: caregiver = {
      id: data.id,
      active: data.active,
      register: moment().format('DD/MM/YYYY HH:mm:ss'),
      update: moment().format('DD/MM/YYYY HH:mm:ss'),
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      cpf: data.cpf,
      address: {
        id: data.address.id
      },
      physicalSpace: data.physicalSpace,
      spending: data.spending,
      capacityAnimals: data.capacityAnimals,
      user: {
        id: data.user.id,
      }
    };
    this.caregiverClient.update(caregiverData).then(
        success => {
          console.log(success)
        },
        error => {
          console.log(error)
        }
    )
  }

  public openModal(caregiver: Caregiver) {
    this.caregiverFound = caregiver
    if(this.isModalVisible){
      this.isModalVisible = false
      console.log(this.isModalVisible)
    } else {
      this.isModalVisible = true;
      console.log(this.isModalVisible)
    }
  }
  public closeModalOutside(event: MouseEvent): void {
    const modalMask = this.$refs.modalMask as HTMLElement;

    if (event.target === modalMask) {
      this.isModalVisible = false;
      console.log(this.isModalVisible);
      modalMask.removeEventListener('click', this.closeModalOutside);
    }
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container input{
  margin-bottom: 5px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.field{
  flex-direction: row;
  display: flex;
}

@media (max-width: 768px) {
  .field{
    flex-direction: column;
  }
}
</style>