<template>
  <section class="container_occurences">
    <div class="text">
      <h1>CADASTRO DE OCORRÊNCIAS</h1>
    </div>
    <div class="column is-two-fifths">
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.name">
        </div>
      </div>
      <div class="field">
        <label class="label">Contato</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.contact">
        </div>
      </div>
      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <input class="input" type="textarea" v-model="occurences.description">
        </div>
      </div>
      <div class="field">
        <label class="label">Ponto de referencia</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.referenceLocal">
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
      <div class="control">
        <button @click="RegisterOccurences()" class="butt is-success is-focused is-medium">Cadastrar</button>
      </div>
      <div class="columns" v-if="notificacao.ativo">
        <div class="column is-two-thirds">
          <div :class="notificacao.classe" v-if="isVisible">
            <button @click="onClickFecharNotificacao" class="delete"></button>
            {{ notificacao.mensagem }}
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

  isVisible = false;


  public RegisterOccurences(): void {
    this.ocurrencesClient.save(this.occurences).then(
      success => {
        console.log(success)
        this.showComponent();
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

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin-top: 2em;
  padding-left: 2em;

  .text {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: clamp(0.5em, 2em , 3em);
    line-height: 1.2em;
    color: #002D4C;
  }

  .column {
    padding: 3em;

    .label {
      color: #002D4C;
    }
  }
  .butt {
        width: 8em;
        height: 3em;
        background: #FBBD08;
        border-radius: 0.5em;
        border: none;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 1.2em;
        line-height: 1.5em;
        color: #002D4C;
        margin-right: 2em;
      }
}
</style>