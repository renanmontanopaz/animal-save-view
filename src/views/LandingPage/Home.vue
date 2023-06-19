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
        <img src="../../assets/CaoLeão.svg" alt="">
      </div>
      <div class="Pegada1">
        <img src="../../assets/Pegadas.svg" alt="">
      </div>
      <div class="Rectangle">
        <img src="../../assets/Rectangle.svg" alt="">
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
  background-color: #EBE3CC !important;
  display: flex;
  flex-direction: row;

  .containerText {
    width: 60%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 20px;
    margin-top: 5%;


    .TextH1 {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left;
      width: 70%;
      margin-right: 11%;

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
      gap: 25px;

      .Textp {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 35px;
        color: #002D4C;
        width: 70%;
      }
    }

    .containerB {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: 70%;
      gap: 50px;
      margin-top: 60px;

      .butt {
        width: 162px;
        height: 62px;
        background: #FBBD08;
        border-radius: 8px;
        border: none;
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 33px;
        color: #002D4C;
      }
    }
  }

  .dogLeao {
    position: absolute;
    width: 25%;
    top: 40%;
    z-index: 1;
  }

  .Rectangle {
    position: absolute;
    width: 27.5%;
    top: 16.1%;
    right: 0%;
  }

  .Pegada1 {
    position: absolute;
    width: 23.5%;
    top: 19.5%;
    left: 77%;
    z-index: 1;
  }

}
</style>


<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {

}

</script>