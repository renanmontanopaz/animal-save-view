<template>
  <footer class="containerFooter">
    <div>
      <img src="../../assets/LogoFooter.svg" alt="">
    </div>
    <span class="retaCentral"></span>
    <div class="containerLeft">
      <div>
        <img src="../../assets/Telefone.svg" alt="">
        <h2>(45) 98413-5559</h2>
      </div>
      <div>
        <img src="../../assets/Email.svg" alt="">
        <h2>valesca.imagistica@gmail.com</h2>
      </div>
      <div>
        <img src="../../assets/Facebook.svg" alt="">
        <img src="../../assets/Instagram.svg" alt="">
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "~bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.containerFooter{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  background-color: #EBE3CC;

  .retaCentral{
    width: 2px;
    height: 100px;
    background-color: #002D4C;
  }

  .containerLeft{
    display: flex;
    align-items: center;
    justify-content: end;
    flex-direction: column;
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