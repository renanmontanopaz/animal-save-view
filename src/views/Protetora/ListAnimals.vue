<template>
  <div class="containerFlex">
    <div class="title">Animais</div>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Raça</th>
          <th>Tipo</th>
          <th>Tamanho</th>
          <th>Cor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="animal in animals" :key="animal.name">
          <td>{{ animal.name }}</td>
          <td>{{ animal.breed }}</td>
          <td>{{ animal.animalType }}</td>
          <td>{{ animal.animalSize }}</td>
          <td>{{ animal.color }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" scoped>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator";

import { Associate } from "@/model/Associate";
import { Message } from "@/model/Message";

import { AssociateClient } from "@/client/Associate.client";
import router from "@/router";
import { UserClient } from "@/client/User.client";
import { AnimalClient } from "@/client/Animal.client";
import { AnimalType } from "../../model/enum/AnimalType";

@Component
export default class Register extends Vue {
  private userClient: UserClient = new UserClient();
  private associateClient: AssociateClient = new AssociateClient();

  public associateAtributesList: Associate[] = [];

  public associate: Associate = new Associate();

  public notificacao: Message = new Message();

  public notificationSave: boolean = false;
  public selectUpdatePassword: boolean = false;

  //ASSOCIATE
  public inputFirstName: string = "input";
  public inputLastName: string = "input";
  public inputContact: string = "input";
  public inputCpf: string = "input";
  public inputEmail: string = "input";
  public inputCep: string = "input";
  public inputNumber: string = "input";
  public inputPassword: string = "input";
  public inputConfirmPassword: string = "input";

  //ASSOCIATE
  public errorMessageFirstName: string[] = [];
  public errorMessageLastName: string[] = [];
  public errorMessageContact: string[] = [];
  public errorMessageCpf: string[] = [];
  public errorMessageEmail: string[] = [];
  public errorMessageCep: string[] = [];
  public errorMessageNumber: string[] = [];
  public errorMessagePassword: string[] = [];
  public errorMessageConfirmPassword: string[] = [];
  public updateData: Associate = new Associate();

  public mounted(): void {
    this.getAssociateByUser();
    this.fillAssociate();
  }

  public getAssociateByUser(): void {
    var id = Number(this.$route.params.id);
    this.userClient.findAssociateByIdUser(id).then(
      (success) => {
        this.associate = success;
      },
      (error) => console.log(error)
    );
  }

  animals: any[] = [];
  animalClient: AnimalClient = new AnimalClient();

  async created() {
    const allAnimals = await this.animalClient.listAll();
    const caregiverId = Number(this.$route.params.id); // Acessando o id da URL
    this.animals = allAnimals.filter(
      (animal) => animal.caregiver?.id === caregiverId
    );
  }

  public fillAssociate(): void {
    this.updateData = {
      id: this.associate?.id,
      register: this.associate.register,
      firstName: this.associate?.firstName,
      lastName: this.associate?.lastName,
      contact: this.associate?.contact,
      cpf: this.associate?.cpf,
      address: {
        id: this.associate?.address?.id,
        cep: this.associate?.address?.cep,
        neighborhood: this.associate?.address?.neighborhood,
        road: this.associate?.address?.road,
        houseNumber: this.associate?.address?.houseNumber,
        active: this.associate?.address?.active,
        register: this.associate?.address?.register,
        update: this.associate?.address?.update,
      },
      user: {
        id: this.associate?.user?.id,
        login: this.associate?.user?.login,
        password: this.associate?.user?.password,
        newPassword: this.associate?.user?.newPassword,
        confirmPassword: this.associate?.user?.confirmPassword,
        admin: this.associate?.user?.admin,
        approved: this.associate?.user?.approved,
        pending: this.associate?.user?.pending,
        rejected: this.associate?.user?.rejected,
        caregiver: this.associate?.user?.caregiver,
        provider: this.associate?.user?.provider,
        associate: this.associate?.user?.associate,
        occurrences: this.associate?.user?.occurrences,
      },
      active: this.associate?.active,
      update: this.associate.update,
    };
    console.log(this.updateData);
  }

  public onClickUpdate(): void {
    // this.validateFormAssociate();
    this.fillAssociate();
    if (this.allIputsValidsAssociate() === true) {
      this.associateClient.update(this.updateData).then(
        (success) => {
          console.log("Associado editado com sucesso!!!");
          this.notificationSave = true;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  public allIputsValidsNewPassword(): boolean {
    if (
      this.inputPassword !== "input is-danger" &&
      this.inputConfirmPassword !== "input is-danger"
    ) {
      return true;
    } else {
      return false;
    }
  }

  public onClickUpdatePassword(): void {
    this.validateInputPassword();
    this.validateConfirmPassword();
    debugger;
    if (this.allIputsValidsNewPassword() === true) {
      this.userClient
        .newPassword(this.associate.user.newPassword, this.associate.user.id)
        .then(
          (success) => {
            console.log("Senha editada com sucesso!!!");
            this.notificationSave = true;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  public clickUpdatePassword() {
    this.selectUpdatePassword = true;
  }

  public backUpdatePassword() {
    this.selectUpdatePassword = false;
  }

  public onClickBack() {
    var id = Number(this.$route.params.id);
    router.push({ path: `/associado/${id}` });
  }

  //ASSOCIATE
  public resetInputsAssociate() {
    this.inputFirstName = "input";
    this.inputLastName = "input";
    this.inputContact = "input";
    this.inputCpf = "input";
    this.inputEmail = "input";
    this.inputCep = "input";
    this.inputNumber = "input";
  }

  //ASSOCIATE
  async fetchAddress(): Promise<void> {
    if (this.associate.address.cep.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${this.associate.address.cep}/json/`
        );
        const { logradouro, bairro } = response.data;
        if (logradouro == null || bairro == null) {
          this.errorMessageCep = ["CEP inválido!"];
          this.inputCep = "input is-danger";
        }
        this.associate.address.road = logradouro;
        this.associate.address.neighborhood = bairro;
      } catch (error) {
        this.errorMessageCep = ["CEP inválido!"];
        this.inputCep = "input is-danger";
        this.clearAddressFields();
      }
    } else {
      this.errorMessageCep = ["CEP inválido!"];
      this.inputCep = "input is-danger";
      this.clearAddressFields();
    }
  }

  //ASSOCIATE
  private clearAddressFields(): void {
    this.associate.address.road = "";
    this.associate.address.neighborhood = "";
  }

  //PASSWORD
  public validateInputPassword() {
    if (!this.associate.user.newPassword) {
      this.errorMessagePassword = ['O campo "Senha" é obrigatório!'];
      this.inputPassword = "input is-danger";
    } else if (this.associate.user.newPassword.length <= 4) {
      this.errorMessagePassword = [
        'O campo "Senha" deve ter no mínimo 5 caracteres!',
      ];
      this.inputPassword = "input is-danger";
    } else if (this.associate.user.newPassword.length >= 11) {
      this.errorMessagePassword = [
        'O campo "Senha" deve ter no máximo 10 caracteres!',
      ];
      this.inputPassword = "input is-danger";
    } else {
      this.errorMessagePassword = [];
      this.inputPassword = "input is-success";
    }
  }

  //CONFIRM PASSWORD
  public validateConfirmPassword() {
    if (!this.associate.user.confirmPassword) {
      this.errorMessageConfirmPassword = [
        'O campo "Confirmar Senha" é obrigatório!',
      ];
      this.inputConfirmPassword = "input is-danger";
    } else if (
      this.associate.user.confirmPassword !== this.associate.user.newPassword
    ) {
      this.errorMessageConfirmPassword = ["As senhas não correspondem!"];
      this.inputConfirmPassword = "input is-danger";
    } else {
      this.errorMessageConfirmPassword = [];
      this.inputConfirmPassword = "input is-success";
    }
  }

  //ASSOCIATE
  public allIputsValidsAssociate(): boolean {
    if (
      this.inputFirstName !== "input is-danger" &&
      this.inputLastName !== "input is-danger" &&
      this.inputContact !== "input is-danger" &&
      this.inputCpf !== "input is-danger" &&
      this.inputEmail !== "input is-danger" &&
      this.inputCep !== "input is-danger" &&
      this.inputNumber !== "input is-danger"
    ) {
      return true;
    } else {
      return false;
    }
  }

  public closeNotification() {
    this.notificationSave = false;
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid black;
}
.title {
  align-self: center;
  font-size: xx-large;
  font-weight: bold;
}

.containerFlex {
  display: flex;
  flex-direction: column;
  margin: 5%;
  align-self: flex-start;
}
</style>
