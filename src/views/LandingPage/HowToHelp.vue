<template>
  <div class="modal">
    <div class="modal-background">
      <div class="modal-card">
        <header class="modal-card-head">
          <h1 class="modal-card-title">Como Ajudar</h1>
          <button class="delete" aria-label="close" @click="close"></button>
        </header>
        <section class="modal-card-body">
          <h2>Como você pode ajudar os animais através da animal save?</h2>
          <p>Não custa quase nada ajudar! E é bem facil!</p>
          <ol>
            <li>Você faz o cadastro do seu nome e CPF/CNPJ</li>
            <li>Você escolhe um valor para ajudar, que será debitado da sua conta mensalmente.</li>
            <li>Você cadastra a sua conta corrente para o débito uma única vez, e pronto!</li>
          </ol>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class Modal extends Vue {

  close() {
      this.$emit('close');
  }
  
}

</script>
<style lang="scss" scoped></style>