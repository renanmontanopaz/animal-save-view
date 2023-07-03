<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="botao">
            <button class="delete is-large" @click="close">Fechar</button>
          </div>
          <p>{{ idCaregiver }}</p>

          <div class="control" style="margin-top: 10px">
            <button class="button is-link control">Encaminhar</button>
          </div>
          <div class=""></div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";
import { Caregiver } from "@/model/Caregiver";

@Component
export default class ModalManagerCaregiver extends Vue {
  @Prop() caregiver!: Caregiver;
  @Prop() idCaregiver!: number;
  close() {
    this.$emit("close");
    console.log(this.caregiver);
  }
}
</script>
