<template>
  <section class="containerHome">
    <article class="containerText">
      <div class="TextH1">
        <h1 class="TextNA">NA</h1>
        <div class="containerDuvidaCerteza">
          <h1 class="containerDuvidaSpan">
            DUVIDA
            <span style="color: #fbbd08">AJUDE</span>
          </h1>
          <h1>
            CERTEZA
            <span style="color: #fbbd08">ADOTE</span>
          </h1>
        </div>
      </div>
      <div class="TextP">
        <p class="Textp">
          Nós da Animal Save somos bons em organização e arrecadação de
          recursos.
        </p>
        <p class="Textp">
          Nosso objetivo é prestar ajuda qualificada a quem já ajuda os animais.
        </p>
      </div>
      <div class="containerB">
        <button class="butt" @click="showModal">Saiba Mais</button>
        <button class="butt">Como Ajudar</button>
      </div>
    </article>
    <article class="containerImage">
      <div class="dogLeao">
        <img src="../../assets/CaoLeão.svg" alt="" />
      </div>
      <div class="Pegada1">
        <img src="../../assets/Pegadas.svg" alt="" />
      </div>
      <div class="Rectangle">
        <img src="../../assets/Rectangle.svg" alt="" />
      </div>
    </article>
    <HowToHelp v-show="isVisible" @close="closeModal" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import HowToHelp from "@/views/LandingPage/HowToHelp.vue";

@Component({
  components: { HowToHelp },
})
export default class Home extends Vue {
  isVisible = false;

  public showModal(): void {
    this.isVisible = true;
  }

  public closeModal(): void {
    this.isVisible = false;
  }
}
</script>
<style Lang="scss" scoped>
@import "~bulma/bulma.sass";
@import url("https://fonts.googleapis.com/css2?family=Concert+One&family=Poppins:ital,wght@0,200;0,400;0,600;1,100&display=swap");

.containerHome {
  width: 100%;
  height: 100vh;
  background-color: #ebe3cc !important;
  display: flex;

  .containerText {
    width: 60%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    gap: 1.5em;

    .TextH1 {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: left;

      .TextNA {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 700;
        font-size: 9.3em;
        line-height: 1.5em;
        color: #002d4c;
      }

      .containerDuvidaCerteza h1 {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 700;
        font-size: 3.1em;
        line-height: 1.2em;
        color: #002d4c;
      }
    }

    .TextP {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      text-align: left;
      gap: 1.5em;

      .Textp {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 700;
        font-size: 1.6em;
        line-height: 1.5em;
        color: #002d4c;
        width: 70%;
      }
    }

    .containerB {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      width: 70%;
      gap: 3.1em;
      margin-top: 4em;

      .butt {
        width: 8em;
        height: 3em;
        background: #fbbd08;
        border-radius: 0.5em;
        border: none;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 1.2em;
        line-height: 1.5em;
        color: #002d4c;
      }
    }
  }

  .dogLeao {
    position: absolute;
    width: 25%;
    top: 39.9%;
    z-index: 1;
  }

  .Rectangle {
    position: absolute;
    width: 27.5%;
    top: 17.2%;
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

@media (max-width: 550px) {
  .containerHome {
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/MulherECachorro.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;

    .containerText {
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      gap: 2em;

      .TextH1 {
        width: 100%;
        height: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        .TextNA {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 5em;
          line-height: 1.5em;
          color: #002d4c;
        }

        .containerDuvidaCerteza h1 {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 1.6em;
          line-height: 1.2em;
          color: #002d4c;
        }
      }

      .TextP {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        gap: 2em;
        width: 75%;
        /* border: 2px solid #EBE3CC; */
        border-radius: 10px;
        padding: 10px;

        .Textp {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 1.4em;
          line-height: 1.3em;
          color: #002d4c;
          width: 100%;
          text-shadow: -1px 0 #ebe3cc, 0 1px #ebe3cc, 1px 0 #ebe3cc,
            0 -1px #ebe3cc;
        }
      }

      .containerB {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;
        gap: 2em;
        margin-top: 4em;

        .butt {
          width: 12em;
          height: 3em;
          background: #fbbd08;
          border-radius: 0.5em;
          border: none;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          font-size: 1em;
          line-height: 1.2em;
          color: #002d4c;
        }
      }
      .butt :hover {
        transform: scale(1.5);
        transition: all 0.2s;
        cursor: pointer;
      }
    }

    .containerImage {
      display: none;

      .dogLeao {
        width: 0;
      }

      .Rectangle {
        width: 0;
      }

      .Pegada1 {
        width: 0;
      }
    }
  }
}

@media (min-height: 810px) and (max-height: 950px) {
  .containerHome {
    width: 100%;
    height: 100vh;
    background-image: url("../../assets/MulherECachorro.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;

    .containerText {
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      gap: 6em;

      .TextH1 {
        width: 100%;
        height: 15vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        .TextNA {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 5em;
          line-height: 1.5em;
          color: #002d4c;
        }

        .containerDuvidaCerteza h1 {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 1.6em;
          line-height: 1.2em;
          color: #002d4c;
        }
      }

      .TextP {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        gap: 2em;
        width: 75%;
        /* border: 2px solid #EBE3CC; */
        border-radius: 10px;
        padding: 10px;

        .Textp {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 700;
          font-size: 1.4em;
          line-height: 1.3em;
          color: #002d4c;
          width: 100%;
          text-shadow: -1px 0 #ebe3cc, 0 1px #ebe3cc, 1px 0 #ebe3cc,
            0 -1px #ebe3cc;
        }
      }

      .containerB {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90%;
        gap: 2em;
        margin-top: 4em;

        .butt {
          width: 12em;
          height: 3em;
          background: #fbbd08;
          border-radius: 0.5em;
          border: none;
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          font-size: 1em;
          line-height: 1.2em;
          color: #002d4c;
        }
      }
    }

    .containerImage {
      display: none;

      .dogLeao {
        width: 0;
      }

      .Rectangle {
        width: 0;
      }

      .Pegada1 {
        width: 0;
      }
    }
  }
}

/*Fazer a responsividade de todas as telas, EM TODOS OS TAMANHOS*/
</style>
