<template>
  <section class="container_occurences">
    <div class="occurences">
      <div class="text">
        <h1>CADASTRO DE OCORRÊNCIAS</h1>
      </div>
      <div class="column is-full">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input :class="`${inputFirstName}`" @blur="validateInputName" type="text" v-model="occurences.name">
            <p v-if="errorMessageFirstName">
            <ul>
              <li v-for="error in errorMessageFirstName" :key="error"> {{ error }}</li>
            </ul>
            </p>
          </div>
        </div>
        <div class="field">
          <label class="label">Contato</label>
          <div class="control">
            <input :class="`${inputContact}`" @blur="validateInputContact" type="text" v-model="occurences.contact">
            <p v-if="errorMessageContact">
            <ul>
              <li v-for="error in errorMessageContact" :key="error">{{ error }}></li>
            </ul>
            </p>
          </div>
        </div>
        <div class="field">
          <label class="label">Descrição</label>
          <div class="control">
            <input :class="`${inputDescription}`" @blur="validateInputDescription" type="text"
              v-model="occurences.description">
            <p v-if="errorMessageDescription">
            <ul>
              <li v-for="error in errorMessageDescription" :key="error">{{ error }}</li>
            </ul>
            </p>
          </div>
        </div>
        <div class="field">
          <label class="label">Ponto de referencia</label>
          <div class="control">
            <input :class="`${inputReference}`" @blur="validateInputReference" type="text"
              v-model="occurences.referenceLocal">
            <p v-if="errorMessageReference">
            <ul>
              <li v-for="error in errorMessageReference" :key="error">{{ error }}</li>
            </ul>
            </p>
          </div>
        </div>
        <div class="field">
          <label class="label">Situação do Animal</label>
          <div class="select">
            <select v-model="occurences.situation">
              <option value="EMERGENCIA">Emergencia</option>
              <option value="URGENCIA">Urgencia</option>
            </select>
          </div>
        </div>
        <div class="controlButt">
          <router-link to="/"><button class="butt">Voltar</button></router-link>
          <button @click="RegisterOccurences()" class="butt2 is-success is-focused is-medium">Cadastrar</button>
        </div>
        <div class="columns" v-if="notificacao.ativo">
          <div class="column is-full">
            <div :class="notificacao.classe" v-if="isVisible">
              <button @click="onClickFecharNotificacao" class="delete"></button>
              {{ notificacao.mensagem }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import { OcurrencesClient } from '@/client/Ocurrences.client';
import { Occurrences } from '@/model/Occurrences';
import { Component, Vue } from 'vue-property-decorator'
import { Message } from "@/model/Message";

@Component
export default class RegisterOccurences extends Vue {

  public ocurrencesClient: OcurrencesClient = new OcurrencesClient();
  public occurences: Occurrences = new Occurrences;
  public notificacao: Message = new Message();

  //Name
  public inputFirstName: string = 'input';
  public errorMessageFirstName: string[] = [];

  public validateInputName() {
    if (!this.occurences.name) {
      this.errorMessageFirstName = ['O campo "Primeiro nome" é obrigatório!'];
      this.inputFirstName = 'input is-danger';
    }
    else if (this.occurences.name.length > 15) {
      this.errorMessageFirstName = ['O campo "Primeiro nome" deve ter no máximo 10 caracteres!'];
      this.inputFirstName = 'input is-danger';
    }
    else if (this.occurences.name.length <= 2) {
      this.errorMessageFirstName = ['O campo "Primeiro nome" deve ter no mínimo 3 caracteres!'];
      this.inputFirstName = 'input is-danger';
    } else {
      this.errorMessageFirstName = [];
      this.inputFirstName = 'input is-success';
    }
  }

  //Contato
  public inputContact: string = 'input';
  public errorMessageContact: string[] = [];

  public validatePhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^(?:\d{2}\s\d{9}|\d{2}\s\d\s\d{4}-\d{4}|\d{2}\s\d\s\d{8})$/;
    return phoneNumberRegex.test(this.occurences.contact);
  };

  public validateInputContact() {
    if (this.validatePhoneNumber(this.occurences.contact)) {
      this.errorMessageContact = [];
      this.inputContact = 'input is-success';
    } else if (!this.occurences.contact) {
      this.errorMessageContact = ['O campo "Contato" é obrigatório!'];
      this.inputContact = 'input is-danger';
    } else {
      this.errorMessageContact = ['Siga o seguinte formato: "45 9 00000000"!'];
      this.inputContact = 'input is-danger';
    }
  }

  //Descrição
  public inputDescription: string = 'input';
  public errorMessageDescription: string[] = [];

  public validateInputDescription() {
    if (!this.occurences.description) {
      this.errorMessageDescription = ['O campo "Descrição" é obrigatório!'];
      this.inputDescription = 'input is-danger';
    } else {
      this.errorMessageDescription = [];
      this.inputDescription = 'input is-success';
    }
  }

  //Referencia
  public inputReference: string = 'input';
  public errorMessageReference: string[] = [];

  public validateInputReference() {
    if (!this.occurences.referenceLocal) {
      this.errorMessageReference = ['O campo "Referência" é obrigatório!'];
      this.inputReference = 'input is-danger';
    } else {
      this.errorMessageReference = [];
      this.inputReference = 'input is-success';
    }
  }

  public resetInputsOccurences() {
    this.inputFirstName = 'input';
    this.inputContact = 'input';
    this.inputDescription = 'input';
    this.inputReference = 'input';
  }

  public validateForm() {
    this.validateInputName();
    this.validateInputContact();
    this.validateInputDescription();
    this.validateInputReference();
  }


  public allIputsValidsOccurences(): boolean {
    if (this.inputFirstName !== 'input is-danger' &&
      this.inputContact !== 'input is-danger' &&
      this.inputDescription !== 'input is-danger' &&
      this.inputReference !== 'input is-danger') {
      return true;
    } else {
      return false;
    }
  }

  isVisible = false;


  public RegisterOccurences(): void {
    this.validateForm();

    if (this.allIputsValidsOccurences() === true) {
      this.ocurrencesClient.save(this.occurences).then(
        success => {
          console.log(success)
          this.resetInputsOccurences();
          this.showComponent();
          this.occurences = new Occurrences()
          this.notificacao = this.notificacao.new(
            true,
            "notification is-primary",
            "Ocorrencia Cadastrada!"
          )
        },
        error => {
          console.log(error)
        }
      )
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

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.container_occurences {
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #002D4C;

  .occurences {
    background-color: #EBE3CC;
    border-radius: 10px;
  }

  .text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: clamp(0.5em, 2em, 3em);
    line-height: 1.2em;
    color: #002D4C;
    padding: 1em;
  }

  .column {
    padding-inline: 3em;

    .label {
      color: #002D4C;
    }
  }

  .controlButt {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4em;
    margin: 2em 0em;
  }

  .butt {
    width: 6em;
    height: 2em;
    border-radius: 0.3em;
    background: #FBBD08;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 1.2em;
    line-height: 1.5em;
    color: #002D4C;
    cursor: pointer;
  }

  .butt2 {
    width: 7em;
    height: 2em;
    background: #002D4C;
    border-radius: 0.3em;
    border: none;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 400;
    font-size: 1.2em;
    line-height: 1.5em;
    color: #EBE3CC;

  }

  .controlButt :hover {
    transform: scale(1.05);
    transition: all 0.2s;
    cursor: pointer;
  }
}
</style>