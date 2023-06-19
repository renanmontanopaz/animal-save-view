<template>
  <footer class="containerFooter">
    <div>
      <img src="../../assets/LogoFooter.svg" alt="">
    </div>
    <div>
      <div>
        <img src="../../assets/" alt="">
      </div>
      <div>

      </div>
      <div>

      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@import "~bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.containerFooter{
  background-color: #EBE3CC;
}

</style>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";

@Component
export default class Footer extends Vue {

}
</script>