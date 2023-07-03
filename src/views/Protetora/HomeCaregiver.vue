<template>
  <main>
    <header>
      <div id="container-title" class="panel is-primary">
        <router-link to="/" id="logo" class="message_image">
          <img src="../../assets/Logo.png" alt="Logo do animal-save" />
        </router-link>
        <div id="dropdown" class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> Minha conta </a>
          <div class="navbar-dropdown">
            <a class="navbar-item"> Meus dados </a>
            <a id="sair" class="navbar-item"> Sair </a>
          </div>
        </div>
      </div>

      <div id="content">
        <p class="panel-tabs">
          <a
            v-for="(tab, index) in tabs"
            :key="index"
            :class="{ 'is-active': tab.isActive }"
            @click="activateTab(tab)"
          >
            <span>{{ tab.label }}</span>
          </a>
        </p>
      </div>
    </header>
    <section class="container-content">
      <component :is="activeTabComponent" />
    </section>
  </main>
</template>

<script lang="ts" scoped>
import { Vue, Component } from "vue-property-decorator";
import ListOcurrence from "@/views/Protetora/ListOcurrences.vue";
import ListAnimal from "@/views/Protetora/ListAnimals.vue";
import RegisterAnimal from "@/views/Protetora/RegisterAnimals.vue";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
  component: any;
}

@Component
export default class HomeCaregiver extends Vue {
  tabs: Tab[] = [
    {
      label: "Ocorrências",
      icon: "fas fa-image",
      isActive: true,
      component: ListOcurrence,
    },

    {
      label: "Meus animais",
      icon: "fas fa-image",
      isActive: false,
      component: ListAnimal,
    },

    {
      label: "Cadastrar Animal",
      icon: "fas fa-image",
      isActive: false,
      component: RegisterAnimal,
    },
  ];
  activateTab(tab: Tab): void {
    this.tabs.forEach((t: Tab) => {
      t.isActive = t === tab;
    });
  }

  get activeTab() {
    return this.tabs.find((tab) => tab.isActive) || null;
  }

  get activeTabComponent() {
    return this.activeTab ? this.activeTab.component : null;
  }
}
</script>

<style scoped>
main {
  background-color: #ebe3cc;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

#container-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

#logo {
  background-color: #ebe3cc;
  border: none;
  transition: transform 0.2s;
  cursor: pointer;
}

#dropdown {
  font-weight: 600;
  font-size: 20px;
  color: black;
}

.navbar-item {
  font-size: 16px;
}

#sair {
  color: red;
}

#title {
  font-size: 24px;
  background-color: #fbbd08;
  display: flex;
  justify-content: center;
}

#content {
  width: 100%;
}

.panel-tabs {
  display: flex;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 10%;
}

span {
  color: black;
}

.panel-tabs a.is-active span {
  color: #fbbd08;
}

.panel.is-primary {
  border-bottom-color: hsl(171deg, 100%, 41%);
}

.container-content {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
