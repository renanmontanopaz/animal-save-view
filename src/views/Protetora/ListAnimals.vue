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
        </tr>
      </thead>
      <tbody>
        <tr v-for="animal in animals" :key="animal.name">
          <td>{{ animal.name }}</td>
          <td>{{ animal.breed }}</td>
          <td>{{ animal.animalType }}</td>
          <td>{{ animal.animalSize }}</td>
          <td>{{ animal.color }}</td>
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
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid black;
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
