<template>
  <div class="container">
    <h1>Register</h1>
    <form @submit.prevent="onSubmit">
      <div class="field">
        <label class="label">Name</label>
        <select v-model="animal.selectedNames" multiple>
          <option v-for="name in animal.names" :key="name" :value="name">
            {{ name }}
          </option>
        </select>
      </div>

      <div class="field">
        <label class="label">Teste</label>
        <input class="input" type="email" v-model="animal.email">
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

interface Animal {
  names: string[];
  selectedNames: string[];
  email: string;
  password: string;
}

@Component
export default class Register extends Vue {
  public animal: Animal = {
    names: ['Name1', 'Name2', 'Name3'], 
    selectedNames: [], 
    email: '',
    password: '',
  }

  public onSubmit() {
    // Here, you should send the animal data to your server.
    console.log(this.animal);
  }
}
</script>
