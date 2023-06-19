<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <p >Selecione o Protetor(a)</p>
          <div class="select is-normal field">
            <select v-model="Ocorrencia.caregiver">
              <option v-for="item2 in caregiverList" :value="item2" >{{item2.firstName}}</option>
            </select>
          </div>
          <div class="control" style="margin-top: 10px">
            <button class="button is-link control" @click="Cadaster()">Encaminhar</button>
          </div>
          <div class="">
            <slot name="">
              <button class="" @click="close">
                Fechar
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<style>
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
  width: 300px;
  min-height: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
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

</style>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {CaregiverClient} from "@/client/Caregiver.client";
import {Caregiver} from "@/model/Caregiver";
import {OcurrencesClient} from "@/client/Ocurrences.client";
import {Occurrences} from "@/model/Occurrences";
import RegisterPublic from "@/views/administrator/RegisterPublic.vue";

export interface ocurrencia{
  id: number;
  active: boolean;
  register: Date,
  name: string;
  contact: string;
  description: string;
  referenceLocal: string;
  situation: string;
  caregiver: {
    id: number
  }
}
@Component
export default class Modal extends Vue {
  @Prop() Ocorrencia!: Occurrences;
  public caregiverClient: CaregiverClient = new CaregiverClient();
  public caregiverList: Caregiver[] = [];
  public caregiver: Caregiver = new Caregiver();
  public occurrenceClient: OcurrencesClient = new OcurrencesClient();
  public occurrence: Occurrences = new Occurrences();
  public register = new RegisterPublic;
  private id: number = 0
  public mounted(): void {
    this.listCaregiver()
  }

  public listCaregiver(): void {
    this.caregiverClient.listAll().then(
        success => {
          this.caregiverList = success
          console.log(this.caregiverList)
        },
        error => {
          console.log(error)
        }
    )
  }

  public recebeId(): void {
    const numeroArmazenado = localStorage.getItem('idocorrencia');
    if (numeroArmazenado !== null) {
      const numeroRecuperado: number = parseInt(numeroArmazenado, 10);
      this.id = numeroRecuperado
      console.log('recuperado',this.id)
    }
    this.FoundOccurrence()
  }
  public FoundOccurrence(): void {
    this.occurrenceClient.findById(this.id).then(
        success => {
          this.occurrence = success
        },
        error => {
          console.log(error)
        }
    )
  }

  public Cadaster(): void {
    const idLocal = parseInt(localStorage.getItem('idocorrencia') || '0', 10)

    const objetoEnviado: ocurrencia = {
      id: this.Ocorrencia.id,
      active: this.Ocorrencia.active,
      register: this.Ocorrencia.register,
      name: this.Ocorrencia.name,
      contact: this.Ocorrencia.contact,
      description: this.Ocorrencia.description,
      referenceLocal: this.Ocorrencia.referenceLocal,
      situation: this.Ocorrencia.situation,
      caregiver: {
        id: this.Ocorrencia.caregiver.id
      }
    };
    this.occurrenceClient.update(objetoEnviado).then(
        success => {
          console.log(success)
        },
        error => {
          console.log(error)
        }
    )
  }
  close() {
      this.$emit('close');
  }

  /*public updateOccurrence(): void {
    this.occurrenceClient.update(this.occurrence).then(
        success => {
          console.log('Registro cadastrado com sucesso')
        },
        error => {
          console.log(error)
        }
    )
  }*/
}

</script>