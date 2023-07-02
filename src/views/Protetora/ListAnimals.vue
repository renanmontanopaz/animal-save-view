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
          <th>Editar</th>
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
          <td>
            <button @click="openEditModal(animal.id)">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <transition name="modal">
      <div
        v-if="isModalVisible"
        ref="modalMask"
        class="modal-mask column is-full"
      >
        <div class="modal-wrapper column is-full">
          <div class="modal-container column is-6">
            <div class="field columns is-desktop">
              <div class="column">
                <input
                  class="input is-info"
                  type="text"
                  placeholder="Nome"
                  v-model="selectedAnimal.name"
                />

                <input
                  class="input is-info"
                  type="text"
                  placeholder="Raça"
                  v-model="selectedAnimal.breed"
                />

                <select
                  v-model="selectedAnimal.animalType"
                  class="input is-info"
                >
                  <option disabled value="">TIPO</option>
                  <option v-for="type in animalTypes" :key="type" :value="type">
                    {{ type }}
                  </option>
                </select>

                <select
                  v-model="selectedAnimal.animalSize"
                  class="input is-info"
                >
                  <option disabled value="">TAMANHO</option>
                  <option v-for="size in animalSizes" :key="size" :value="size">
                    {{ size }}
                  </option>
                </select>

                <input
                  class="input is-info"
                  type="text"
                  placeholder="Cor"
                  v-model="selectedAnimal.color"
                />
                <div
                  class="column"
                  v-for="(value, key) in selectedAnimal.vaccination"
                  :key="key"
                >
                  <input
                    type="checkbox"
                    v-model="selectedAnimal.vaccination[key]"
                  />{{ key }}
                </div>
              </div>
            </div>
            <div class="columns" v-if="notificacao.ativo">
              <div class="column is-12">
                <div :class="notificacao.classe" v-if="isVisible">
                  <button
                    @click="onClickFecharNotificacao"
                    class="delete"
                  ></button>
                  {{ notificacao.mensagem }}
                </div>
              </div>
            </div>
            <div class="control" style="gap: 10px">
              <button
                class="button is-danger"
                style="margin-left: 10px"
                @click="openModal"
              >
                Fechar
              </button>
              <button
                class="button is-link"
                @click="editAnimal(selectedAnimal)"
                style="margin-right: 10px"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- <Modal v-model="isModalVisible">
      <div slot="body">
        <input v-model="selectedAnimal.name" placeholder="Nome" />
      </div>
      <div slot="actions">
        <button @click="isModalVisible = false">Fechar</button>
        <button @click="editAnimal()">Salvar</button>
      </div>
    </Modal> -->
  </div>
</template>

<script lang="ts" scoped>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Message } from "@/model/Message";
import { UserClient } from "@/client/User.client";
import { AnimalClient } from "@/client/Animal.client";
import { AnimalType } from "../../model/enum/AnimalType";
import { Caregiver } from "../../model/Caregiver";
import { Vaccination } from "../../model/Vaccination";
import { Animal } from "@/model/Animal";
import { AnimalSize } from "../../model/enum/AnimalSize";
import moment from "moment";
import { Address } from "@/model/Address";
import { Occurrences } from "@/model/Occurrences";
import { User } from "@/model/User";

interface animal {
  id: number;
  active: boolean;
  register: string;
  update: string;
  name: string;
  breed: string;
  animalType: AnimalType;
  animalSize: AnimalSize;
  vaccination: {
    id: number;
    // canineParvovirus: boolean;
    // distemper: boolean;
    // canineHepatitis: boolean;
    // rabies: boolean;
  };
  color: string;
  observation: string;
  age: number;
  caregiver: {
    id: number;
  };
}

@Component
export default class Register extends Vue {
  public animalTypes = Object.values(AnimalType).filter((value) =>
    isNaN(Number(value))
  );
  public animalSizes = Object.values(AnimalSize).filter((value) =>
    isNaN(Number(value))
  );
  private userClient: UserClient = new UserClient();
  public caregiver: Caregiver = new Caregiver();
  selectedAnimal: any = null;
  isModalVisible = false;
  animals: any[] = [];
  // public animalMock: animal = new animal
  animalClient: AnimalClient = new AnimalClient();
  public animalFound: Animal = new Animal();
  public animalList: Animal[] = [];
  public notificacao: Message = new Message();
  public animalTest: Animal = new Animal();
  isVisible = false;
  private caregiverLogado: Caregiver = new Caregiver();

  async created() {
    const allAnimals = await this.animalClient.listAll();
    const userId = Number(this.$route.params.id);

    const caregiver = await this.userClient.findCaregiverByIdUser(userId);
    this.caregiverLogado = caregiver;

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

  openEditModal(animal: number) {
    this.isModalVisible = true;
    console.log(this.selectedAnimal);

    this.selectedAnimal = this.animals.find((item) => item.id === animal);
    console.log(this.selectedAnimal);
  }

  public editAnimal(data: Animal): void {
    console.log("DADOS DO ANIMAL ESCOLHIDO");
    console.log(data);
    let dateAsString = moment().format("DD/MM/YYYY HH:mm:ss");
    const animalData: animal = {
      id: data.id,
      active: data.active,
      register: moment().format("DD/MM/YYYY HH:mm:ss"),
      update: moment().format("DD/MM/YYYY HH:mm:ss"),
      name: data.name,
      breed: data.breed,
      animalType: data.animalType,
      animalSize: data.animalSize,
      vaccination: {
        id: data.vaccination.id,
        // canineParvovirus: data.vaccination.canineParvovirus,
        // distemper: data.vaccination.distemper,
        // canineHepatitis: data.vaccination.canineHepatitis,
        // rabies: data.vaccination.rabies,
      },
      color: data.color,
      observation: data.observation,
      age: data.age,
      caregiver: {
        id: this.caregiverLogado.id,
      },
    };

    const animalMock: animal = {
      id: 1,
      active: true,
      register: moment().format("DD/MM/YYYY HH:mm:ss"),
      update: moment().format("DD/MM/YYYY HH:mm:ss"),
      name: "Bino",
      breed: "vira-lata",
      animalType: AnimalType.CACHORRO,
      animalSize: AnimalSize.MEDIO,
      color: "preto",
      age: 3,
      observation: "Funcionou !",
      caregiver: {
        id: 1,
      },
      vaccination: {
        id: 1,
      },
    };
    console.log("animalData:");
    console.log(animalData);
    console.log("animalFound");
    console.log(this.animalFound);

    // this.animalClient.update(animalData).then(
    this.animalClient.update(animalMock).then(
      (success) => {
        console.log(success);
        this.showComponent();
        this.notificacao = this.notificacao.new(
          true,
          "notification is-primary",
          "Animal editado com sucesso"
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  parseDate(dateString: string): Date {
    let parts = dateString.split(/[/ :]/);
    return new Date(
      Number(parts[2]),
      Number(parts[1]) - 1,
      Number(parts[0]),
      Number(parts[3]),
      Number(parts[4]),
      Number(parts[5])
    );
  }

  // try {
  //   await this.animalClient.update(this.selectedAnimal);
  //   this.$toasted.success("Animal atualizado com sucesso");
  //   this.isModalVisible = false;
  // } catch (e) {
  //   this.$toasted.error("Erro ao atualizar o animal");
  // }

  public showComponent(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 4000);
  }
  public onClickFecharNotificacao(): void {
    this.notificacao = new Message();
  }

  public openModal() {
    if (this.isModalVisible) {
      this.isModalVisible = false;
      console.log(this.isModalVisible);
    } else {
      this.isModalVisible = true;
      console.log(this.isModalVisible);
    }
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
  padding: 10px !important;
  border: 1px solid black;
  text-align: center !important;
  vertical-align: middle !important;
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container input {
  margin-bottom: 5px;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.field {
  flex-direction: row;
  display: flex;
}
</style>
