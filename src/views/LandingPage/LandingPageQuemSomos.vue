<template>
  <section class="containerQuemSomos">
    <div class="containerImage">
      <img src="../../assets/FotoMenina.svg" alt="">
    </div>
    <div class="containerText">
      <p>Juntos pela felicidade dos animais! Seja parte da nossa equipe, lutando por um mundo onde nenhum animal seja
        deixado para trás.</p>
    </div>
    <div class="Pegadas2">
      <img src="../../assets/Pegadas.svg" alt="">
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "~bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.containerQuemSomos {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #002D4C;
  gap: 60px;

  .containerImage {
    width: 22%;
    z-index: 1;
  }

  .containerText {
    width: 40%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 35px;
    line-height: 100px;
    text-align: center;
    color: #EBE3CC;
  }
  .Pegadas2{
    position: absolute;
    width: 20.5%;
    left: 0%;
    top: 48%;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class LandingPageQuemSomos extends Vue {

}
</script>