<template>
  <section class="containerQuemSomos">
    <div class="Pegadas2">
      <img src="../../assets/Pegadas.svg" alt="" />
    </div>
    <div class="containerImage">
      <img src="../../assets/FotoMenina.svg" alt="" />
    </div>
    <div class="containerText">
      <p>
        Juntos pela felicidade dos animais! Seja parte da nossa equipe, lutando
        por um mundo onde nenhum animal seja deixado para trás.
      </p>
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
  background-color: #002d4c;
  gap: 60px;

  .Pegadas2 {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    position: absolute;
    width: 25%;
    left: 0%;
  }

  .containerImage {
    width: 24%;
    z-index: 1;
  }

  .containerText {
    width: 40%;
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-size: 35px;
    line-height: 100px;
    text-align: center;
    color: #ebe3cc;
  }
}

@media (max-width: 550px) {
  .containerQuemSomos {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #002d4c;
    gap: 2em;

    .Pegadas2 {
      display: none;
    }

    .containerImage {
      width: 175px;
      z-index: 1;
    }

    .containerText {
      width: 80%;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 1.2em;
      line-height: 1.5em;
      text-align: center;
      color: #ebe3cc;
    }
  }
}

@media (min-height: 810px) and (max-height: 950px) {
  .containerQuemSomos {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: #002d4c;
    gap: 2em;

    .Pegadas2 {
      display: none;
    }

    .containerImage {
      width: 250px;
      z-index: 1;
    }

    .containerText {
      width: 80%;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 1.5em;
      line-height: 2em;
      text-align: center;
      color: #ebe3cc;
    }
  }
}
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class AboutUs extends Vue {}
</script>
