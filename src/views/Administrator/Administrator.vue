<template>
  <main class="content column">
    <div class="panel">
      <p class="panel-heading">Gestão de Acesso</p>
      <p class="panel-tabs">
        <a v-for="(tab, index) in tabs" :key="index" :class="{'is-active':tab.isActive}" @click="activateTab(tab)">
          <span>{{ tab.label }}</span>
        </a>
      </p>
      <UsersPending v-if="tabs[0].isActive"></UsersPending>
      <UsersApproved v-if="tabs[1].isActive"></UsersApproved>
      <UsersRejected v-if="tabs[2].isActive"></UsersRejected>
      <RegisterPublic v-if="tabs[3].isActive"></RegisterPublic>
      <ManagerUsers v-if="tabs[4].isActive"></ManagerUsers>
    </div>
  </main>
</template>


<script lang="ts" scoped>
import { Component, Vue } from 'vue-property-decorator';
import { AdminClient } from "@/client/Admin.client";
import { pendings } from "@/model/Pending";
import { Message } from "@/model/Message";
import RegisterPublic from "@/views/Administrator/RegisterPublic.vue";
import ManagerUsers from "@/views/Administrator/ManagerUsers.vue";
import UsersPending from "@/views/Administrator/UsersPending.vue";
import UsersApproved from "@/views/Administrator/UsersApproved.vue";
import UsersRejected from "@/views/Administrator/UsersRejected.vue";
import { AssociateClient } from '@/client/Associate.client';
import { Associate } from '@/model/Associate';
import { ProviderClient } from '@/client/Provider.client';
import { Provider } from '@/model/Provider';
import { Caregiver } from '@/model/Caregiver';
import { CaregiverClient } from '@/client/Caregiver.client';

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}

@Component({
  components: {
    RegisterPublic,
    ManagerUsers,
    UsersPending,
    UsersApproved,
    UsersRejected
  }
})
export default class Administrator extends Vue {
  public adminClient: AdminClient = new AdminClient();
  public associateClient: AssociateClient = new AssociateClient();
  public providerClient: ProviderClient = new ProviderClient();
  public caregiverClient: CaregiverClient = new CaregiverClient();

  public notificacao: Message = new Message();

  public associate: Associate = new Associate();
  public provider: Provider = new Provider();
  public caregiver: Caregiver = new Caregiver();

  public allPending: pendings[] = [];

  isVisible = false;

  public select: string = '0';

  tabs: Tab[] = [
    { label: 'Usuários Pendentes', icon: 'fas fa-image', isActive: true },
    { label: 'Usuários Aprovados', icon: 'fas fa-image', isActive: false },
    { label: 'Usuários Rejeitados', icon: 'fas fa-image', isActive: false },
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

<style scoped>

.panel.is-primary .panel-tabs a.is-active {
  border-bottom-color: hsl(171deg, 100%, 41%);
}
</style>
