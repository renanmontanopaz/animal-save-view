<template>
  <div class="container">
    <div class="title">Cadastrar Animal</div>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Tipo</label>
        <v-select v-model="animalMock.type" :options="animalTypes"></v-select>
      </div>

      <div class="field">
        <label class="label">Tamanho</label>
        <v-select v-model="animalMock.size" :options="animalSizes"></v-select>
      </div>

      <div class="field">
        <label class="label">Nome</label>
        <input class="input" type="text" v-model="animalMock.name" />
      </div>

      <div class="field">
        <label class="label">Raça</label>
        <input class="input" type="text" v-model="animalMock.breed" />
      </div>

      <div class="field">
        <label class="label">Idade</label>
        <input class="input" type="number" v-model="animalMock.age" />
      </div>

      <div class="field">
        <label class="label">Vacinas Tomadas</label>
        <v-select
          v-model="animalMock.selectedVaccines"
          :options="animalMock.vaccines"
          multiple
        ></v-select>
      </div>

      <div class="field">
        <label class="label">Cor</label>
        <input class="input" type="text" v-model="animalMock.color" />
      </div>

      <div class="field">
        <label class="label">Observação</label>
        <input class="input" type="text" v-model="animalMock.observation" />
      </div>

      <div class="field">
        <label class="label">ID da Cuidadora Responsável</label>
        <input class="input" type="text" v-model="animalMock.caregiver.id" />
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
import { Caregiver } from "@/model/Caregiver";
import { Address } from "@/model/Address";
import { Occurrences } from "@/model/Occurrences";
import { User } from "@/model/User";
import { Aprove } from "@/model/enum/Aprove";
import { Animal } from "@/model/Animal";
import { Vaccination } from "@/model/Vaccination";

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
  public animalMock = {
    type: AnimalType.CACHORRO,
    size: AnimalSize.MEDIO,
    name: "",
    breed: "",
    age: "",
    color: "",
    vaccines: ["Raiva", "Parvovirose Canina", "Cinomose", "Hepatite Canina"],
    selectedVaccines: [],
    observation: "",
    caregiver: {
      id: "",
    },
  };

  public onSubmit() {
    console.log(this.animalMock);
  }

  // forceNumbersOnly(event: Event) {
  //   // Substitui qualquer caractere não numérico por uma string vazia
  //   this.animalMock.age = (event.target as HTMLInputElement).value.replace(
  //     /\D/g,
  //     ""
  //   );
}
// fromMock(mock: any): Animal {

//       const animalForm: Partial<Animal> = {}

//       animalForm.name = mock.name;
//       animalForm.breed = mock.breed;
//       animalForm.animalType = mock.type;
//       animalForm.animalSize = mock.size;
//       animalForm.color = mock.color;
//       animalForm.age = Number(mock.age);
//       animalForm.observation = mock.observation;

//       animalForm.vaccination = new Vaccination();
//       this.vaccination.vaccines = mock.vaccines;
//       this.vaccination.selectedVaccines = mock.selectedVaccines;

//       this.caregiver = new Caregiver();
//       // preencher com os dados do mock
//       this.caregiver.firstName = mock.caregiver.firstName;
//       this.caregiver.lastName = mock.caregiver.lastName;
//       this.caregiver.contact = mock.caregiver.contact;
//       // etc...

//       return this;
//   }
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
.title {
  align-self: center;
  font-size: xx-large;
  font-weight: bold;
}
</style>
