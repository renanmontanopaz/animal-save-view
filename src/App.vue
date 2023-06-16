<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="./assets/Logo.png" width="150">
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample columns is-5" class="navbar-menu">
        <div class="navbar-start">
          <router-link to='/'>
            Home
          </router-link>
          <router-link to='/quem-somos'>
            Quem Somos
          </router-link>
          <router-link to='/provider'>
            Parceiros
          </router-link>
          <router-link to='/contact'>
            Contato
          </router-link>
        </div>
        <div class="navbar-end" id="divTres">
          <div class="navbar-item" id="divDois">
            <div class="buttons">
              <a class="button is-primary" href="/register">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light" href="/login">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma.sass";

/*
  #EBE3CC - Branco quase rosa
  #002D4C - Azul escuro cor da logo
  #FBBD08 - Amarelo queimado
*/

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 25px 30px;
  background-color: #EBE3CC !important;

  h1 {
    font-size: 26px;
    font-weight: 800;
    color: black;
  }

  .navbar-start {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    gap: 20px;
    font-size: 18px;
  }

  a {
    font-weight: bold;
    color: #002D4C;

    &.router-link-exact-active {
      color: #FBBD08;
    }
  }
}
</style>
<script setup lang="ts">
</script>