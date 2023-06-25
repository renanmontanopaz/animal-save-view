<template>
  <section>
    <div class="column is-two-fifths">
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.name" placeholder="Digite seu Nome aqui">
        </div>
      </div>
      <div class="field">
        <label class="label">Contato</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.contact" placeholder="Digite seu Telefone aqui">
        </div>
      </div>
      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <input class="input" type="textarea" v-model="occurences.description" placeholder="Como que era o Animal?">
        </div>
      </div>
      <div class="field">
        <label class="label">Ponto de referencia</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.referenceLocal" placeholder="">
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
        <button @click="RegisterOccurences()" class="button is-success is-focused">Cadastrar</button>
      </div>
      <div class="columns" v-if="notificacao.ativo">
        <div class="column is-12">
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
.column {}
</style>