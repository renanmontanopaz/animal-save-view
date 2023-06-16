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
        <!-- Conteúdo do container --><button class="button is-primary" @click="onClickRequisicao">cliquei</button>
        <p>{{allPending}}</p>
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
import {AdminClient} from "@/client/Admin.client";
import {Associate} from "@/model/Associate";
import {Caregiver} from "@/model/Caregiver";
import {Provider} from "@/model/Provider";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
  requisicao: string;
}

@Component
export default class Administrator extends Vue {
  private occurrencesList: Occurrences[] = []
  private usersList: User[] = []
  private allPending: Object = [
    Associate,
    Caregiver,
    Provider,
]
  private adminClient: AdminClient = new AdminClient();
  tabs: Tab[] = [
    { label: 'Usuários Pendentes', icon: 'fas fa-image', isActive: true,requisicao: "onClickRequisicao()" },
    { label: 'Cadastros Pendentes', icon: 'fas fa-image', isActive: false,requisicao: "" },
    { label: 'Registro Público', icon: 'fas fa-image', isActive: false,requisicao: "" },
    { label: 'Gerenciar Usuários', icon: 'fas fa-image', isActive: false,requisicao: "" }
  ];
  activeTab: Tab | null = this.tabs.find(tab => tab.isActive) || null;
  activateTab(tab: Tab): void {
    this.tabs.forEach((t: Tab) => {
      t.isActive = (t === tab);
    });
    this.activeTab = tab.isActive ? tab : null;
  }

  public onClickRequisicao(): void {
    this.adminClient.findAllPending().then(
        success => {
          this.allPending = success
          console.log(this.allPending)
        },
        error => {
          console.log(error)
        }
    )
  }
}

</script>