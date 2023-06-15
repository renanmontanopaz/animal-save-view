<template>
  <div class="container">
    <div class="title">Cadastrar Animal</div>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Tipo</label>
        <v-select v-model="animal.type" :options="animalTypes"></v-select>
      </div>

      <div class="field">
        <label class="label">Tamanho</label>
        <v-select v-model="animal.size" :options="animalSizes"></v-select>
      </div>

      <div class="field">
        <label class="label">Nome</label>
        <input class="input" type="text" v-model="animal.name" />
      </div>

      <div class="field">
        <label class="label">Raça</label>
        <input class="input" type="text" v-model="animal.breed" />
      </div>

      <div class="field">
        <label class="label">Idade</label>
        <input
          class="input"
          type="text"
          v-model="animal.age"
          @input="forceNumbersOnly"
        />
      </div>

      <div class="field">
        <label class="label">Vacinas Tomadas</label>
        <v-select
          v-model="animal.selectedVaccines"
          :options="animal.vaccines"
          multiple
        ></v-select>
      </div>

      <div class="field">
        <label class="label">Cor</label>
        <input class="input" type="text" v-model="animal.color" />
      </div>

      <div class="field">
        <label class="label">Observação</label>
        <input class="input" type="text" v-model="animal.observation" />
      </div>

      <button class="button is-primary" type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import vSelect from "vue-select";
import { AnimalType } from "@/model/enum/AnimalType";
import { AnimalSize } from "@/model/enum/AnimalSize";

interface Animal {
  type: AnimalType;
  size: AnimalSize;
  name: string;
  breed: string;
  age: string;
  color: string;
  vaccines: string[];
  selectedVaccines: string[];
  observation: string;
}

@Component({
  components: {
    vSelect,
  },
})
export default class Register extends Vue {
  public animalTypes = Object.values(AnimalType).filter((value) =>
    isNaN(Number(value))
  );
  public animalSizes = Object.values(AnimalSize).filter((value) =>
    isNaN(Number(value))
  );
  public animal: Animal = {
    type: AnimalType.CACHORRO,
    size: AnimalSize.MEDIO,
    name: "",
    breed: "",
    age: "",
    color: "",
    vaccines: ["Raiva", "Parvovirose Canina", "Cinomose", "Hepatite Canina"],
    selectedVaccines: [],
    observation: "",
  };

  public onSubmit() {
    console.log(this.animal);
  }

  forceNumbersOnly(event: Event) {
    // Substitui qualquer caractere não numérico por uma string vazia
    this.animal.age = (event.target as HTMLInputElement).value.replace(
      /\D/g,
      ""
    );
  }
}
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
.title {
  align-self: center;
  font-size: xx-large;
  font-weight: bold;
}
</style>
