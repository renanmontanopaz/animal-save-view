<template>
  <footer class="containerFooter">
    <div>
      <img src="../../assets/LogoFooter.svg" class="Logo" alt="">
    </div>
    <span class="retaCentral"></span>
    <div class="containerLeft">
      <div class="telefone">
        <img src="../../assets/Telefone.svg" class="celular" alt="">
        <h2>(45) 98413-5559</h2>
      </div>
      <div class="email">
        <img src="../../assets/Email.svg" class="email" alt="">
        <h2>valesca.imagistica@gmail.com</h2>
      </div>
      <div class="icones">
        <img src="../../assets/Facebook.svg" alt="">
        <img src="../../assets/Instagram.svg" alt="">
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "~bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.containerFooter {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  background-color: #EBE3CC;

  .retaCentral {
    width: 2px;
    height: 130px;
    background-color: #002D4C;
  }

  .containerLeft {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;

    .telefone {
      font-family: 'Poppins' n sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 28px;
      line-height: 34px;
      color: #002D4C;
      gap: 10px;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
    }

    .email {
      font-family: 'Poppins' n sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 28px;
      line-height: 34px;
      color: #002D4C;
      gap: 10px;

      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: row;
    }

    .icones {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 30px;
    }

  }
}

@media (max-width:500px) {

  .containerFooter {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: #EBE3CC;

    .Logo{
      display: none;
    }

    .retaCentral {
      display: none;
    }

    .containerLeft {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 0.5em;

      .telefone {
        font-family: 'Poppins' n sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 1.3em;
        line-height: 1em;
        color: #002D4C;
        gap: 0.6em;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;

        .celular{
          width: 1.3em;
        }
      }

      .email {
        font-family: 'Poppins' n sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 1.3em;
        line-height: 1em;
        color: #002D4C;
        gap: 0.6em;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
      }

      .icones {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2em;

        .icones img{
          width: 1em;
        }
      }

    }
  }

}
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {

}
</script>