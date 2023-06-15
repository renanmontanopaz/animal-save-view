<template>
  <div class="container">
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Type</label>
        <v-select v-model="animal.type" :options="animalTypes"></v-select>
      </div>

      <div class="field">
        <label class="label">Name</label>
        <input class="input" type="text" v-model="animal.name">
      </div>

      <div class="field">
        <label class="label">Breed</label>
        <input class="input" type="text" v-model="animal.breed">
      </div>

      <div class="field">
        <label class="label">Vaccines Taken</label>
        <v-select v-model="animal.selectedVaccines" :options="animal.vaccines" multiple></v-select>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <input class="input" type="password" v-model="animal.password">
      </div>

      <button class="button is-primary" type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import vSelect from 'vue-select';
import { AnimalType } from '@/model/enum/AnimalType';

interface Animal {
  type: AnimalType;
  name: string;
  breed: string;
  vaccines: string[];
  selectedVaccines: string[];
  email: string;
  password: string;
}

@Component({
  components: {
    vSelect,
  }
})
export default class Register extends Vue {
  public animalTypes = Object.values(AnimalType);
  public animal: Animal = {
    type: AnimalType.CACHORRO,  // Default type
    name: '',
    breed: '',
    vaccines: ['Raiva', 'Parvovirose Canina', 'Cinomose', 'Hepatite Canina'],
    selectedVaccines: [],
    email: '',
    password: '',
  }

  public onSubmit() {
    // Here, you should send the animal data to your server.
    console.log(this.animal);
  }
}
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";
</style>
