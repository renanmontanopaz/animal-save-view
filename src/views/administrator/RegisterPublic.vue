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
    <div class="box columns is-gapless" v-for="item in occurrenceList"
         style="justify-content: center; align-items: center; flex-direction: column;">
      <header class="">
        <h3 class="">Ocorrência Nº{{item.id}}</h3>
      </header>
      <div class="columns" style="width: 100%">
        <blockquote class="" style="">
          <p class="card-header-title" >Usuário que reportou:{{" "+item.name}}</p>
          <p class="card-header-title" style="align-items: flex-start">Situação do animal:{{" "+item.description}}</p>
        </blockquote>
        <blockquote class="" style="">
          <p class="card-header-title" >Localidade:{{" "+item.referenceLocal}}</p>
          <p class="card-header-title">Situação do animal:{{" "+ item.situation}}</p>
        </blockquote>
        <blockquote class="" style="">
          <div class="control" style="margin-top: 10px">
            <button class="button is-link" @click="showModal(item.id)">Encaminhar Ocorrência</button>
            <Modal v-show="isModalVisible" @close="closeModal" />
          </div>
        </blockquote>
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
import Modal from "@/views/Modal.vue";

@Component({
    components: {Modal}
})
export default class RegisterPublic extends Vue {
  private occurrenceList: Occurrences[] = []
  public notificacao: Message = new Message();
  isVisible = false;
  public occurrenceClient: OcurrencesClient = new OcurrencesClient();
  public occurrence: Occurrences = new Occurrences();
  public idTres: number = 0
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

  public updateOccurrence(): void {
    this.occurrenceClient.update(this.occurrence).then(
        success => {
          console.log('Registro cadastrado com sucesso')
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
  isModalVisible = false
  //private id = Number(this.$route.params.id);
  public showModal(id:number): void {
    this.isModalVisible = true;
    localStorage.setItem('idocorrencia', id.toString())
  }
  public closeModal(): void {
    this.isModalVisible = false;
  }

}
</script>
