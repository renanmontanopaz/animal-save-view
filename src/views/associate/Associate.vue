<template>
  <main class="column is-full">
    <div class="tabs is-boxed is-centered">
      <ul>
        <li v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }" @click="activateTab(tab)">
          <a>
            <span>{{ tab.label }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="container" v-if="activeTab">
      <!-- Conteúdo do container -->
      <p>Conteúdo da guia {{ activeTab.label }}</p>
    </div>
  </main>
</template>

<style>
@media screen and (max-width: 768px) {
  li:not(.is-active) > a > .icon {
    visibility: hidden;
    position:  absolute;
  }

  .tabs{

    font-size: 0.9rem;
  }

}
main{
  display: flex;
  flex-direction: column;
}

</style>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

interface Tab {
  label: string;
  isActive: boolean;
}

@Component
export default class MyComponent extends Vue {
  tabs: Tab[] = [
    { label: 'Minha Conta', isActive: true }
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