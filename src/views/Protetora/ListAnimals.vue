<template>
  <div class="containerFlex">
    <div class="title">Animais</div>
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Raça</th>
          <th>Tipo</th>
          <th>Tamanho</th>
          <th>Cor</th>
          <th>Vacinas Tomadas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="animal in animals" :key="animal.name">
          <td v-html="formatText(animal.name, 20)"></td>
          <td v-html="formatText(animal.breed, 20)"></td>
          <td v-html="formatText(animal.animalType, 20)"></td>
          <td v-html="formatText(animal.animalSize, 20)"></td>
          <td v-html="formatText(animal.color, 20)"></td>
          <td
            v-html="formatText(takenVaccinations(animal.vaccination), 20)"
          ></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" scoped>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import axios from "axios";
import { cpf } from "cpf-cnpj-validator";

import { Associate } from "@/model/Associate";
import { Message } from "@/model/Message";

import { AssociateClient } from "@/client/Associate.client";
import router from "@/router";
import { UserClient } from "@/client/User.client";
import { AnimalClient } from "@/client/Animal.client";
import { AnimalType } from "../../model/enum/AnimalType";
import { Caregiver } from "../../model/Caregiver";
import { Vaccination } from "../../model/Vaccination";

@Component
export default class Register extends Vue {
  private userClient: UserClient = new UserClient();
  public caregiver: Caregiver = new Caregiver();

  animals: any[] = [];
  animalClient: AnimalClient = new AnimalClient();

  async created() {
    const allAnimals = await this.animalClient.listAll();

    const userId = Number(this.$route.params.id);

    const caregiver = await this.userClient.findCaregiverByIdUser(userId);

    if (caregiver) {
      const caregiverId = caregiver.id;

      this.animals = allAnimals.filter(
        (animal) => animal.caregiver?.id === caregiverId
      );
    }
  }

  takenVaccinations(vaccination: { [key: string]: boolean }) {
    const allowedKeys = [
      "rabies",
      "canineParvovirus",
      "distemper",
      "canineHepatitis",
    ];
    const translationMap: Record<string, string> = {
      rabies: "Raiva",
      canineParvovirus: "Parvovirose canina",
      distemper: "Cinomose",
      canineHepatitis: "Hepatite canina",
    };
    return Object.entries(vaccination)
      .filter(([key, value]) => allowedKeys.includes(key) && value)
      .map(([key, value]) => translationMap[key])
      .join(", ");
  }

  formatText(text: string, maxLength: number): string {
    const words = text.split(" ");
    let lineLength = 0;
    let formattedText = "";

    for (let word of words) {
      if (lineLength + word.length > maxLength) {
        formattedText += "<br />";
        lineLength = 0;
      }
      formattedText += word + " ";
      lineLength += word.length + 1;
    }

    return formattedText;
  }
}
</script>

<style lang="scss">
html,
body {
  background-color: #ebe3cc;
  color: #002d4c;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid black;
  text-align: center !important;
  vertical-align: middle;
}
.title {
  align-self: center;
  font-size: xx-large;
  font-weight: bold;
}

.containerFlex {
  display: flex;
  flex-direction: column;
  margin: 5%;
  align-self: flex-start;
}
</style>
