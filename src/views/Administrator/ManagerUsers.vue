<template>
  <div id="container-principal" class="content column is-12">
    <p class="panel-tabs">
      <a
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ 'is-active': tab.isActive }"
        @click="activateTab(tab)"
      >
        <span>{{ tab.label }}</span>
      </a>
    </p>
    <div
      class="panel-block columns is-desktop"
      v-if="tabs[0].isActive"
      style="align-items: flex-start; flex-wrap: wrap; gap: 10px"
    >
      <div class="card column" v-for="item in userCaregiverList">
        <header class="card-header">
          <p class="card-header-title" style="margin-bottom: 5px">
            {{ item.firstName }}
          </p>
          <button
            class="card-header-icon"
            aria-label="more options"
            @click="openDrop(item.id)"
          >
            <p style="margin-top: 10px">Detalhar</p>
            <span :class="'icon ' + item.cpf">
              <i
                class="fas fa-angle-down"
                :id="item.firstName"
                aria-hidden="true"
              ></i>
            </span>
          </button>
        </header>
        <div class="card-content" v-if="select == item.id">
          <div class="content" :id="item.lastName">
            <table
              style="text-align: start; overflow-wrap: break-word"
              class="table is-striped is-narrow is-hoverable"
            >
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Nome</td>
                <td>
                  <strong>{{ item.firstName }}</strong>
                </td>
              </tr>
              <tr>
                <td>Sobrenome</td>
                <td>
                  <strong>{{ item.lastName }}</strong>
                </td>
              </tr>

              <tr>
                <td>CPF</td>
                <td>
                  <strong>{{ item.cpf }}</strong>
                </td>
              </tr>
              <tr>
                <td>Endereço</td>
                <td>
                  <strong
                    >{{ "CEP: " + item.address.cep }}<br />{{
                      "Rua: " + item.address.road
                    }}<br />{{ "Número: " + item.address.houseNumber }} <br />{{
                      "Bairro: " + item.address.neighborhood
                    }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Espaço físico</td>
                <td>
                  <strong>{{ item.physicalSpace + " M²" }}</strong>
                </td>
              </tr>
              <tr>
                <td>Data do Cadastro</td>
                <td>
                  <strong>{{ item.register }}</strong>
                </td>
              </tr>
              <tr>
                <td>Gasto Mensal</td>
                <td>
                  <strong>{{ item.spending }}</strong>
                </td>
              </tr>
              <tr>
                <td>Animais</td>
                <td>
                  <section
                    class="modal-card-body"
                    style="height: 100px; padding: 0; width: 100%"
                  >
                    <p v-for="item in animalList">
                      <strong>{{ item.name }}</strong>
                    </p>
                  </section>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="openModal(item.id)">Editar</a>
        </footer>
      </div>
      <transition name="modal">
        <div
          v-if="isModalVisible"
          ref="modalMask"
          class="modal-mask column is-full"
        >
          <div class="modal-wrapper column is-full">
            <div class="modal-container column is-6">
              <div class="field columns is-desktop">
                <div class="column">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="caregiverFound.firstName"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Sobrenome"
                    v-model="caregiverFound.lastName"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Telefone"
                    v-model="caregiverFound.contact"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="CPF"
                    v-model="caregiverFound.cpf"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Espaço físico m²"
                    v-model="caregiverFound.physicalSpace"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Gasto mensal"
                    v-model="caregiverFound.spending"
                  />
                </div>
                <div class="column">
                  <input
                    class="input"
                    type="text"
                    placeholder="CEP"
                    v-model="caregiverFound.address.cep"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Rua/Avenida"
                    v-model="caregiverFound.address.road"
                  />
                  <input
                    class="input"
                    type="number"
                    placeholder="Número"
                    v-model="caregiverFound.address.houseNumber"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Bairro"
                    style="margin-bottom: 15px"
                    v-model="caregiverFound.address.neighborhood"
                  />
                </div>
              </div>
              <div class="columns" v-if="notificacao.ativo">
                <div class="column is-12">
                  <div :class="notificacao.classe" v-if="isVisible">
                    <button
                      @click="onClickFecharNotificacao"
                      class="delete"
                    ></button>
                    {{ notificacao.mensagem }}
                  </div>
                </div>
              </div>
              <div
                class="control column is-7"
                style="justify-content: space-between; display: flex"
              >
                <button
                  class="button is-info is-focused"
                  id="button-voltar"
                  style="margin-left: 10px"
                  @click="openModal"
                >
                  Fechar
                </button>
                <button
                  class="button is-success is-focused"
                  id="button-aprovar"
                  @click="EditCaregiver(caregiverFound)"
                  style="margin-right: 10px"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div
      class="panel-block columns is-desktop"
      v-if="tabs[1].isActive"
      style="align-items: flex-start; flex-wrap: wrap; gap: 10px"
    >
      <div class="card column" v-for="item2 in userAssociateList">
        <header class="card-header">
          <p class="card-header-title" style="margin-bottom: 5px">
            {{ item2.firstName }}
          </p>
          <button
            class="card-header-icon"
            aria-label="more options"
            @click="openDropAssociate(item2.id)"
          >
            <p style="margin-top: 10px">Detalhar</p>
            <span :class="'icon ' + item2.cpf">
              <i
                class="fas fa-angle-down"
                :id="item2.lastName"
                aria-hidden="true"
              ></i>
            </span>
          </button>
        </header>
        <div class="card-content" v-if="selectAssociate == item2.id">
          <div class="content" :id="item2.lastName">
            <table
              style="text-align: start; overflow-wrap: break-word"
              class="table is-striped is-narrow is-hoverable"
            >
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Nome</td>
                <td>
                  <strong>{{ item2.firstName }}</strong>
                </td>
              </tr>
              <tr>
                <td>Sobrenome</td>
                <td>
                  <strong>{{ item2.lastName }}</strong>
                </td>
              </tr>

              <tr>
                <td>CPF</td>
                <td>
                  <strong>{{ item2.cpf }}</strong>
                </td>
              </tr>
              <tr>
                <td>Endereço</td>
                <td>
                  <strong
                    >{{ "CEP: " + item2.address.cep }}<br />{{
                      "Rua: " + item2.address.road
                    }}<br />{{ "Número: " + item2.address.houseNumber }}
                    <br />{{ "Bairro: " + item2.address.neighborhood }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Data do Cadastro</td>
                <td>
                  <strong>{{ item2.register }}</strong>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="openModalAssociate(item2.id)"
            >Editar</a
          >
        </footer>
      </div>
      <transition name="modal">
        <div
          v-if="isModalVisible"
          ref="modalMask"
          class="modal-mask column is-full"
        >
          <div class="modal-wrapper column is-full">
            <div class="modal-container column is-6">
              <div class="field columns is-desktop">
                <div class="column">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome"
                    v-model="associateFound.firstName"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Sobrenome"
                    v-model="associateFound.lastName"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Telefone"
                    v-model="associateFound.contact"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="CPF"
                    v-model="associateFound.cpf"
                  />
                </div>
                <div class="column">
                  <input
                    class="input"
                    type="text"
                    placeholder="CEP"
                    v-model="associateFound.address.cep"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Rua/Avenida"
                    v-model="associateFound.address.road"
                  />
                  <input
                    class="input"
                    type="number"
                    placeholder="Número"
                    v-model="associateFound.address.houseNumber"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Bairro"
                    style="margin-bottom: 15px"
                    v-model="associateFound.address.neighborhood"
                  />
                </div>
              </div>
              <div class="columns" v-if="notificacao.ativo">
                <div class="column is-12">
                  <div :class="notificacao.classe" v-if="isVisible">
                    <button
                      @click="onClickFecharNotificacao"
                      class="delete"
                    ></button>
                    {{ notificacao.mensagem }}
                  </div>
                </div>
              </div>
              <div
                class="control column is-7"
                style="justify-content: space-between; display: flex"
              >
                <button
                  class="button is-info is-focused"
                  id="button-voltar"
                  style="margin-left: 10px"
                  @click="openModalAssociate"
                >
                  Fechar
                </button>
                <button
                  class="button is-success is-focused"
                  id="button-aprovar"
                  @click="EditAssociate(associateFound)"
                  style="margin-right: 10px"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div
      class="panel-block columns is-desktop"
      v-if="tabs[2].isActive"
      style="align-items: flex-start; flex-wrap: wrap; gap: 10px"
    >
      <div class="card column" v-for="item3 in userProviderList">
        <header class="card-header">
          <p class="card-header-title" style="margin-bottom: 5px">
            {{ item3.businessName }}
          </p>
          <button
            class="card-header-icon"
            aria-label="more options"
            @click="openDropProvider(item3.id)"
          >
            <p style="margin-top: 10px">Detalhar</p>
            <span :class="'icon ' + item3.businessName">
              <i
                class="fas fa-angle-down"
                :id="item3.cnpj"
                aria-hidden="true"
              ></i>
            </span>
          </button>
        </header>
        <div class="card-content" v-if="selectProvider == item3.id">
          <div class="content" :id="item3.fantasyName">
            <table
              style="text-align: start; overflow-wrap: break-word"
              class="table is-striped is-narrow is-hoverable"
            >
              <tr>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Nome da Empresa</td>
                <td>
                  <strong>{{ item3.businessName }}</strong>
                </td>
              </tr>
              <tr>
                <td>Nome Fantasia</td>
                <td>
                  <strong>{{ item3.fantasyName }}</strong>
                </td>
              </tr>

              <tr>
                <td>CNPJ</td>
                <td>
                  <strong>{{ item3.cnpj }}</strong>
                </td>
              </tr>
              <tr>
                <td>Endereço</td>
                <td>
                  <strong
                    >{{ "CEP: " + item3.address.cep }}<br />{{
                      "Rua: " + item3.address.road
                    }}<br />{{ "Número: " + item3.address.houseNumber }}
                    <br />{{ "Bairro: " + item3.address.neighborhood }}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Data do Cadastro</td>
                <td>
                  <strong>{{ item3.register }}</strong>
                </td>
              </tr>
              <tr>
                <td>Serviços Oferecidos</td>
                <td>
                  <section
                    class="modal-card-body"
                    style="height: 100px; padding: 0; width: 100%"
                  >
                    <p v-for="item in taskList">
                      <strong>{{ item.name }}</strong>
                    </p>
                  </section>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="openModalProvider(item3.id)"
            >Editar</a
          >
        </footer>
      </div>
      <transition name="modal">
        <div
          v-if="isModalVisible"
          ref="modalMask"
          class="modal-mask column is-full"
        >
          <div class="modal-wrapper column is-full">
            <div class="modal-container column is-6">
              <div class="field columns is-desktop">
                <div class="column">
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome da empresa"
                    v-model="providerFound.businessName"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Nome fantasia"
                    v-model="providerFound.fantasyName"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Telefone"
                    v-model="providerFound.contact"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="CNPJ"
                    v-model="providerFound.cnpj"
                  />
                </div>
                <div class="column">
                  <input
                    class="input"
                    type="text"
                    placeholder="CEP"
                    v-model="providerFound.address.cep"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Rua/Avenida"
                    v-model="providerFound.address.road"
                  />
                  <input
                    class="input"
                    type="number"
                    placeholder="Número"
                    v-model="providerFound.address.houseNumber"
                  />
                  <input
                    class="input"
                    type="text"
                    placeholder="Bairro"
                    style="margin-bottom: 15px"
                    v-model="providerFound.address.neighborhood"
                  />
                </div>
              </div>
              <div class="columns" v-if="notificacao.ativo">
                <div class="column is-12">
                  <div :class="notificacao.classe" v-if="isVisible">
                    <button
                      @click="onClickFecharNotificacao"
                      class="delete"
                    ></button>
                    {{ notificacao.mensagem }}
                  </div>
                </div>
              </div>
              <div
                class="control column is-7"
                style="justify-content: space-between; display: flex"
              >
                <button
                  class="button is-info is-focused"
                  id="button-voltar"
                  style="margin-left: 10px"
                  @click="openModalProvider"
                >
                  Fechar
                </button>
                <button
                  class="button is-success is-focused"
                  id="button-aprovar"
                  @click="EditProvider(providerFound)"
                  style="margin-right: 10px"
                >
                  Salvar
                </button>
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
import { Component } from "vue-property-decorator";
import { Message } from "@/model/Message";
import { AdminClient } from "@/client/Admin.client";
import { AssociateClient } from "@/client/Associate.client";
import { CaregiverClient } from "@/client/Caregiver.client";
import { ProviderClient } from "@/client/Provider.client";
import { Caregiver } from "@/model/Caregiver";
import { Associate } from "@/model/Associate";
import { Provider } from "@/model/Provider";
import { AddressClient } from "@/client/Address.client";
import { Address } from "@/model/Address";
import moment from "moment";
import { AnimalClient } from "@/client/Animal.client";
import { Animal } from "@/model/Animal";
import { Task } from "@/model/Task";
import { TaskClient } from "@/client/Task.client";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}
interface caregiver {
  id: number;
  active: boolean;
  register: string;
  update: string;
  firstName: string;
  lastName: string;
  contact: string;
  cpf: string;
  address: {
    id: number;
    cep: string;
    neighborhood: string;
    road: string;
    houseNumber: number;
  };
  physicalSpace: string;
  spending: string;
  capacityAnimals: number;
}
interface associate {
  id: number;
  active: boolean;
  register: string;
  update: string;
  firstName: string;
  lastName: string;
  contact: string;
  cpf: string;
  address: {
    id: number;
    cep: string;
    neighborhood: string;
    road: string;
    houseNumber: number;
  };
}
interface provider {
  id: number;
  active: boolean;
  register: string;
  update: string;
  fantasyName: string;
  businessName: string;
  contact: string;
  cnpj: string;
  address: {
    id: number;
    cep: string;
    neighborhood: string;
    road: string;
    houseNumber: number;
  };
}
@Component
export default class ManagerUsers extends Vue {
  public notificacao: Message = new Message();
  isVisible = false;
  public isModalVisible: Boolean = false;
  private adminClient: AdminClient = new AdminClient();
  public userAssociateList: Associate[] = [];
  public userCaregiverList: Caregiver[] = [];
  public userProviderList: Provider[] = [];
  public associateClient: AssociateClient = new AssociateClient();
  public caregiverClient: CaregiverClient = new CaregiverClient();
  public providerClient: ProviderClient = new ProviderClient();
  public caregiverFound: Caregiver = new Caregiver();
  public associateFound: Associate = new Associate();
  public providerFound: Provider = new Provider();
  public addressClient: AddressClient = new AddressClient();
  public address: Address = new Address();
  public animalClient: AnimalClient = new AnimalClient();
  public animalList: Animal[] = [];
  public taskList: Task[] = [];
  public taskClient: TaskClient = new TaskClient();
  public mounted(): void {
    this.ListUsersProvider();
    this.ListUsersAssociate();
    this.ListUsersCareriver();
  }

  tabs: Tab[] = [
    { label: "Protetor(a)", icon: "fas fa-image", isActive: true },
    { label: "Associado(a)", icon: "fas fa-image", isActive: false },
    { label: "Fornecedor(a)", icon: "fas fa-image", isActive: false },
  ];
  activeTab: Tab | null = this.tabs.find((tab) => tab.isActive) || null;
  activateTab(tab: Tab): void {
    this.tabs.forEach((t: Tab) => {
      t.isActive = t === tab;
    });
    this.activeTab = tab.isActive ? tab : null;
  }
  public ListUsersAssociate(): void {
    this.associateClient.listAll().then(
      (sucess) => {
        this.userAssociateList = sucess;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public ListUsersProvider(): void {
    this.providerClient.listAll().then(
      (sucess) => {
        this.userProviderList = sucess;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public ListUsersCareriver(): void {
    this.caregiverClient.listAll().then(
      (sucess) => {
        this.userCaregiverList = sucess;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public select: number = 0;
  public selectAssociate: number = 0;
  public selectProvider: number = 0;
  public openDrop(id: number) {
    if (this.select === id) {
      this.select = 0;
    } else {
      this.select = id;
    }
    this.animalClient.findAllByCaregiver(id).then(
      (success) => {
        this.animalList = success;
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public openDropAssociate(id2: number) {
    if (this.selectAssociate === id2) {
      this.selectAssociate = 0;
    } else {
      this.selectAssociate = id2;
    }
  }
  public openDropProvider(id3: number) {
    this.taskClient.findTaskByIdProvider(id3).then(
      (success) => {
        this.taskList = success;
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.selectProvider === id3) {
      this.selectProvider = 0;
    } else {
      this.selectProvider = id3;
    }
  }

  public openModalAssociate(id: number) {
    this.associateFound = this.userAssociateList.find(
      (item) => item.id === id
    )!;
    this.ListUsersAssociate();
    if (this.isModalVisible) {
      this.isModalVisible = false;
      console.log(this.isModalVisible);
    } else {
      this.isModalVisible = true;
      console.log(this.isModalVisible);
    }
  }
  public openModalProvider(id: number) {
    this.providerFound = this.userProviderList.find((item) => item.id === id)!;
    this.ListUsersProvider();
    if (this.isModalVisible) {
      this.isModalVisible = false;
      console.log(this.isModalVisible);
    } else {
      this.isModalVisible = true;
      console.log(this.isModalVisible);
    }
  }
  public EditCaregiver(data: Caregiver): void {
    this.addressClient.update(data.address).then(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
    const caregiverData: caregiver = {
      id: data.id,
      active: data.active,
      register: moment().format("DD/MM/YYYY HH:mm:ss"),
      update: moment().format("DD/MM/YYYY HH:mm:ss"),
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      cpf: data.cpf,
      address: {
        id: data.address.id,
        cep: data.address.cep,
        neighborhood: data.address.neighborhood,
        road: data.address.road,
        houseNumber: data.address.houseNumber,
      },
      physicalSpace: data.physicalSpace,
      spending: data.spending,
      capacityAnimals: data.capacityAnimals,
    };
    this.caregiverClient.update(caregiverData).then(
      (success) => {
        console.log(success);
        this.showComponent();
        this.notificacao = this.notificacao.new(
          true,
          "notification is-primary",
          "Usuário editado com sucesso"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public EditAssociate(data: Associate): void {
    this.addressClient.update(data.address).then(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
    const associateData: associate = {
      id: data.id,
      active: data.active,
      register: moment().format("DD/MM/YYYY HH:mm:ss"),
      update: moment().format("DD/MM/YYYY HH:mm:ss"),
      firstName: data.firstName,
      lastName: data.lastName,
      contact: data.contact,
      cpf: data.cpf,
      address: {
        id: data.address.id,
        cep: data.address.cep,
        neighborhood: data.address.neighborhood,
        road: data.address.road,
        houseNumber: data.address.houseNumber,
      },
    };
    this.associateClient.update(associateData).then(
      (success) => {
        console.log(success);
        this.showComponent();
        this.notificacao = this.notificacao.new(
          true,
          "notification is-primary",
          "Usuário editado com sucesso"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public EditProvider(data: Provider): void {
    this.addressClient.update(data.address).then(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.log(error);
      }
    );
    const providerData: provider = {
      id: data.id,
      active: data.active,
      register: moment().format("DD/MM/YYYY HH:mm:ss"),
      update: moment().format("DD/MM/YYYY HH:mm:ss"),
      businessName: data.businessName,
      fantasyName: data.fantasyName,
      contact: data.contact,
      cnpj: data.cnpj,
      address: {
        id: data.address.id,
        cep: data.address.cep,
        neighborhood: data.address.neighborhood,
        road: data.address.road,
        houseNumber: data.address.houseNumber,
      },
    };
    this.providerClient.update(providerData).then(
      (success) => {
        console.log(success);
        this.showComponent();
        this.notificacao = this.notificacao.new(
          true,
          "notification is-primary",
          "Empresa editada com sucesso"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public openModal(id: number) {
    this.caregiverFound = this.userCaregiverList.find(
      (item) => item.id === id
    )!;
    this.ListUsersCareriver();
    if (this.isModalVisible) {
      this.isModalVisible = false;
      console.log(this.isModalVisible);
    } else {
      this.isModalVisible = true;
      console.log(this.isModalVisible);
    }
  }

  public onClickFecharNotificacao(): void {
    this.notificacao = new Message();
  }

  public showComponent(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 4000);
  }
}
</script>
<style scoped>
#container-principal {
  height: 100vh;
  background-color: #ebe3cc;
}

.card-header {
  background-color: #002d4c;
}
.card-header-title {
  color: white;
}
.card-header-icon p {
  color: white;
}
.card-header-icon span {
  color: white;
}
td {
  overflow-wrap: break-word;
}
tr {
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

.modal-container input {
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

.field {
  flex-direction: row;
  display: flex;
}

@media (max-width: 768px) {
  .field {
    flex-direction: column;
  }
}
.panel-tabs a.is-active span {
  color: #fbbd08;
}
.panel-tabs a {
  color: #002d4c;
}
.card-footer-item {
  color: #002d4c;
}
.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ebe3cc;
  border-radius: 10px;
  padding: 30px;
  border: 2px solid #ebe3cc;
}
#button-aprovar {
  width: 110px;
  height: 35px;
  border-radius: 5px;
  background-color: #48c88f;
  color: white;
  font-size: 14px;
  font-weight: 700;

  font-family: "Poppins";
  font-style: normal;
}

#button-aprovar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

#button-voltar {
  width: 110px;
  height: 35px;
  border-radius: 5px;
  background-color: #3b95fc;
  color: white;
  font-size: 14px;
  font-weight: 700;

  font-family: "Poppins";
  font-style: normal;
}

#button-voltar:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
