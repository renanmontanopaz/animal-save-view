<template>
  <section>
    <div class="form">
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.name" placeholder="Text input">
        </div>
      </div>
      <div class="field">
        <label class="label">Contato</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.contact" placeholder="Text input">
        </div>
      </div>
      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.description" placeholder="Text input">
        </div>
      </div>
      <div class="field">
        <label class="label">Ponto de referencia</label>
        <div class="control">
          <input class="input" type="text" v-model="occurences.referenceLocal" placeholder="Text input">
        </div>
      </div>
      <div class="field">
        <div class="select">
          <select v-model="occurences.situation">
            <option>Emergencia</option>
            <option>Urgencia</option>
          </select>
        </div>
      </div>
      <div class="control">
        <button @click="RegisterOccurences()" class="button is-success is-focused">Cadastrar</button>
      </div>
    </div>
  </section>
</template>

<script lang="ts">

import { OcurrencesClient } from '@/client/Ocurrences.client';
import { Occurrences } from '@/model/Occurrences';
import { Component, Vue } from 'vue-property-decorator'


@Component
export default class RegisterOccurences extends Vue {

  public ocurrencesClient: OcurrencesClient = new OcurrencesClient();
  public occurences: Occurrences = new Occurrences;

  public RegisterOccurences(): void {
    this.ocurrencesClient.save(this.occurences).then(
      success => {
        console.log(success)
      },
      error => {
        console.log(error)
      }
    )
  }
}

</script>

<style lang="scss" scoped></style>