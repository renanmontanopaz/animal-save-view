<template>
  <div class="">
    <div class="" v-if="notificacao.ativo">
      <div class="column is-12">
        <div :class="notificacao.classe" v-if="isVisible">
          <button @click="onClickFecharNotificacao" class="delete" ></button>
          {{ notificacao.mensagem }}
        </div>
      </div>
    </div>
    <div class="column">
    <div class="box" v-for="item in occurrenceList" style="padding: 1rem; gap: 3rem;">
      <header class="">
        <h3 class="card-header-title">Ocorrência Nº{{item.id}}</h3>
      </header>
      <div>
        <p>Usuário que reportou:{{" "+item.name}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component} from "vue-property-decorator";
import Vue from 'vue'
import {Occurrences} from "@/model/Occurrences";
import {Message} from "@/model/Message";
import {OcurrencesClient} from "@/client/Ocurrences.client";
@Component
export default class RegisterPublic extends Vue {
  private occurrenceList: Occurrences[] = []
  public notificacao: Message = new Message();
  isVisible = false;
  public occurrenceClient: OcurrencesClient = new OcurrencesClient()
  public mounted(): void {
    this.listOccurrences()
  }

  public listOccurrences(): void {
    this.occurrenceClient.listAll().then(
        success => {
          this.occurrenceList = success
          console.log(this.occurrenceList)
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
