<template>
  <section class="containerHome">
    <article class="containerText">
      <div class="TextH1">
        <h1 class="TextNA">
          NA
        </h1>
        <div class="container">
          <h1>
            DUVIDA 
            <span style="color: #FBBD08;">AJUDE</span>
          </h1>
          <h1>
            CERTEZA 
            <span style="color: #FBBD08;">ADOTE</span>
          </h1>
        </div>
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

  .containerText {
    width: 50%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;


    .TextH1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 10%;

      .TextNA {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-size: 150px;
        line-height: 225px;
        color: #002D4C;
      }
    }
  }
}
</style>


<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";


@Component
export default class LandingPage extends Vue {

}

</script>