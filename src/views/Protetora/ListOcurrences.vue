<template>
  <div>
    <h1>Occurrences</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Contact</th>
          <th>Description</th>
          <th>Reference Local</th>
          <th>Situation</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="occurrence in occurrences" :key="occurrence.name">
          <td>{{ occurrence.name }}</td>
          <td>{{ occurrence.contact }}</td>
          <td>{{ occurrence.description }}</td>
          <td>{{ occurrence.referenceLocal }}</td>
          <td>{{ occurrence.situation }}</td>
          <td>{{ occurrence.caregiver && occurrence.caregiver.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { OcurrencesClient } from "@/client/Ocurrences.client";

@Component
export default class List extends Vue {
  occurrences: any[] = [];
  ocurrenceClient: OcurrencesClient = new OcurrencesClient();

  async created() {
    this.occurrences = await this.ocurrenceClient.listAll();
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid black;
}
</style>
