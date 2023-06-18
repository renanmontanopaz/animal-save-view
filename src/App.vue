<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
       <router-link to="/">
        <a class="navbar-item">
          <img src="./assets/Logo.png">
        </a>
       </router-link>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="true" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample columns is-5" class="navbar-menu">
        <div class="navbar-end">
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
              <router-link to="/register">
                <button>
                Registrar
              </button>
              </router-link>
              <router-link to="/login">
                <button>
                Entrar
              </button>
              </router-link>
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
@import url('https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap');

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
  padding: 15px 20px;
  background-color: #EBE3CC !important;

  .navbar-item {
    padding-left: 40px;

    img {
      max-height: 3em;
      width: 200px;
    }
  }

  h1 {
    font-size: 26px;
    font-weight: 800;
    color: black;
  }

  .navbar-end {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    gap: 70px;
    font-family: 'Poppins', sans-serif;
    font-style: normal;
    font-weight: 200;
    font-size: 18px;
    line-height: 33px;
  }

  a {
    font-weight: bold;
    color: #002D4C;

    &.router-link-exact-active {
      color: #FBBD08;
    }
  }

  .navbar-end {
    .navbar-item {
      .buttons {
        gap: 30px;
      }
    }

    button {
      background: #EBE3CC !important;
      border-radius: 15px;
      border: 3px solid #002D4C;
      width: 132px;
      height: 42px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 33px;
      color: #002D4C;
      cursor: pointer;

    }
  }
}
</style>
<script setup lang="ts">


</script>