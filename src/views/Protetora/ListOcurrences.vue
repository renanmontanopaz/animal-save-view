<template>
  <div class="containerFlex">
    <div class="title">Occorrências</div>
    <div class="scrollable">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Descrição</th>
            <th>Local de Referência</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="occurrence in occurrences" :key="occurrence.name">
            <td>{{ occurrence.name }}</td>
            <td>{{ occurrence.contact }}</td>
            <td v-html="occurrence.description"></td>
            <td>{{ occurrence.referenceLocal }}</td>
            <td>{{ occurrence.situation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { OcurrencesClient } from "@/client/Ocurrences.client";

interface Occurrence {
  name: string;
  contact: string;
  description: string;
  referenceLocal: string;
  situation: string;
}

@Component
export default class List extends Vue {
  occurrences: Occurrence[] = [];
  ocurrenceClient: OcurrencesClient = new OcurrencesClient();

  async created() {
    this.occurrences = await this.ocurrenceClient.listAll();
    this.occurrences = this.occurrences.map((occurrence) => ({
      ...occurrence,
      description: this.formatText(occurrence.description, 35),
    }));
  }

  formatText(text: string, maxLength: number): string {
    let formattedText = "";
    let lineLength = 0;

    text.split(" ").forEach((word) => {
      if (lineLength + word.length > maxLength) {
        formattedText += "<br />";
        lineLength = 0;
      }
      formattedText += word + " ";
      lineLength += word.length + 1;
    });

    return formattedText;
  }
}
</script>

<style scoped>
table {
  width: 100%;
  font-family: "Poppins";
  font-style: normal;
  border-collapse: collapse;
}

th,
td {
  padding: 10px !important;
  border: 3px solid #afa588;
  text-align: center !important;
  vertical-align: middle !important;
  color: #002d4c !important;
}
.title {
  align-self: center;
  font-size: xx-large;
  font-weight: bold;
}

.scrollable {
  overflow-y: auto;
  width: 100%;
  max-height: 640px;
}
.containerFlex {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 5%;
  margin-top: -3%;
  align-self: flex-start;
}
</style>
