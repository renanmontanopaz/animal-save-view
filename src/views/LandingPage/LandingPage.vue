<template>
  <section class="containerHome">
    <article class="containerText">
      <div class="TextH1">
        <h1 class="TextNA">
          NA
        </h1>
        <div class="containerDuvidaCerteza">
          <h1 class="containerDuvidaSpan">
            DUVIDA
            <span style="color: #FBBD08;">AJUDE</span>
          </h1>
          <h1>
            CERTEZA
            <span style="color: #FBBD08;">ADOTE</span>
          </h1>
        </div>
      </div>
      <div class="TextP">
        <p class="Textp">
          Nós da Animal Save somos bons em organização e arrecadação de recursos.
        </p>
        <p class="Textp">
          Nosso objetivo é prestar ajuda qualificada a quem já ajuda os animais.
        </p>
      </div>
      <div class="containerB">
        <button class="butt">Saiba Mais</button>
        <button class="butt">Como Ajudar</button>
      </div>
    </article>
    <article class="containerImage">
      <div class="dogLeao">
        <img src="../../assets/Cao Leão.svg" alt="">
      </div>
    </article>
  </section>
</template>

<style Lang="scss" scoped>
@import "~bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.containerHome {
  width: 100%;
  height: 100vh;
  background-color: #ebe3cc !important;
  display: flex;
  flex-direction: row;

  .containerText {
    width: 75%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    gap: 30px;


    .TextH1 {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left;
      margin-right: 13%;
      width: 60%;

      .TextNA {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 150px;
        line-height: 225px;
        color: #002D4C;
      }

      .containerDuvidaCerteza h1 {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 50px;
        line-height: 75px;
        color: #002D4C;
      }
    }

    .TextP {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: left;

      .Textp {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 45px;
        color: #002D4C;
        width: 70%;
      }
    }

    .containerB {
      display: flex;
      align-items: start;
      justify-content: start;
      width: 70%;
      gap: 50px;
      margin-top: 60px;

      .butt {
        width: 122px;
        height: 52px;
        background: #FBBD08;
        border-radius: 8px;
        border: none;

      }
    }
  }

  /* .dogLeao {
    position: absolute;
    top: 65%;
    width: 15%;
  } */

}
</style>


<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";


@Component
export default class LandingPage extends Vue {

}

</script>