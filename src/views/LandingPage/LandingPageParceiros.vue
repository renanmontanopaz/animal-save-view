<template>
  <section class="containerParceiros">
    <article class="containerDivs">
      <div>
        <img src="../../assets/AdesivoCachorro.svg" class="ImgCachorro" alt="">
      </div>
      <div class="containerImageParceiros">
        <img src="../../assets/Uniamerica.svg" class="containerImg" alt="">
      </div>
    </article>
    <article class="containerDivs">
      <div>
        <img src="../../assets/AdesivoCachorro.svg" class="ImgCachorro" alt="">
      </div>
      <div class="containerImageParceiros">
        <img src="../../assets/Uniamerica.svg" class="containerImg" alt="">
      </div>
    </article>
    <article class="containerDivs">
      <div>
        <img src="../../assets/AdesivoCachorro.svg" class="ImgCachorro" alt="">
      </div>
      <div class="containerImageParceiros">
        <img src="../../assets/Uniamerica.svg" class="containerImg" alt="">
      </div>
    </article>
  </section>
</template>

<style lang="scss">
@import "~bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.containerParceiros {
  width: 100%;
  height: 100vh;
  background-color: #EBE3CC;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 80px;

  .containerDivs {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .containerImageParceiros {
      width: 300px;
      height: 250px;
      background-color: #FBBD08;
      border-radius: 39px;

      display: flex;
      align-items: center;
      justify-content: center;

      .containerImg {
        width: 90%;
      }
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class LandingPageParceiros extends Vue {

}
</script>