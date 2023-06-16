<template>
  <main class="column is-full">
    <article class="panel is-primary">
      <p class="panel-heading">Gestão de Acesso</p>
      <p class="panel-tabs">
        <a v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }" @click="activateTab(tab)">
          <span>{{ tab.label }}</span>
        </a>
      </p>
      <div class="panel-block" v-if="activeTab">
        <!-- Conteúdo do container -->
        <p>Aqui está o conteúdo da {{ activeTab.label }}</p>
      </div>
    </article>
  </main>
</template>

<style>
a{
  display: flex;
}
.panel.is-primary .panel-tabs a.is-active {
  border-bottom-color: hsl(171deg, 100%, 41%);
}
</style>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import {Occurrences} from "@/model/Occurrences";
import {User} from "@/model/User";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}

@Component
export default class Administrator extends Vue {
  private occurrencesList: Occurrences[] = []
  private usersList: User[] = []

  tabs: Tab[] = [
    { label: 'Usuários Pendentes', icon: 'fas fa-image', isActive: true },
    { label: 'Cadastros Pendentes', icon: 'fas fa-image', isActive: false },
    { label: 'Registro Público', icon: 'fas fa-image', isActive: false },
    { label: 'Gerenciar Usuários', icon: 'fas fa-image', isActive: false }
  ];
  activeTab: Tab | null = this.tabs.find(tab => tab.isActive) || null;
  activateTab(tab: Tab): void {
    this.tabs.forEach((t: Tab) => {
      t.isActive = (t === tab);
    });
    this.activeTab = tab.isActive ? tab : null;
  }


}

</script>