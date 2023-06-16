<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="./assets/Logo.png">
        </a>
        <a role="button" class="navbar-burger " aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample columns is-5" class="navbar-menu">
        <div class="navbar-start">
          <router-link to ='/'> 
            Home
          </router-link> 
          <router-link to ='/quem-somos'> 
            Quem Somos
          </router-link>
          <router-link to ='/provider'> 
            Parceiros
          </router-link> 
          <router-link to ='/contact'> 
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
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import "~bulma/bulma.sass";

  nav {
    padding: auto;
    background-color: #EBE3CC !important;
    height: 80px;

    .navbar-item img{
      width: 150px;
      height: 80px !important;
    }

    .navbar-start {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 40px;
      gap: 20px;
      font-size: 17px;
    }

    a {
        font-weight: bold;
        color: #002D4C ;
        &.router-link-exact-active {
        color: #FBBD08 ;
      }
    }
  }
</style>
<script setup lang="ts">
</script>