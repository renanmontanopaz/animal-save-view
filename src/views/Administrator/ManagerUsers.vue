<template>
  <div class="content column">

      <p class="panel-tabs">
        <a v-for="(tab, index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }" @click="activateTab(tab)">
          <span>{{ tab.label }}</span>
        </a>
      </p>
    <div class="panel-block" v-if="tabs[0].isActive" style="display: flex; justify-content: center; flex-direction: column">
      <div class="card column is-6" v-for="item in userCaregiverList">
        <header class="card-header">
          <p class="card-header-title">
            {{item.firstName}}
          </p>
          <button class="card-header-icon" aria-label="more options" @click="openDrop(item.id, item.firstName)">
          <span class="icon">
            <i class="fas fa-angle-down" :id="item.firstName" aria-hidden="true"></i>
          </span>
          </button>
        </header>
        <div class="card-content" v-if="select == item.id" id="conteudo">
          <div class="content" >
            <div class="columns">
              <input class="input is-small column" type="text" placeholder="nome">
              <input class="input is-small column" type="text" placeholder="sobrenome">
            </div>
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Save</a>
          <a href="#" class="card-footer-item">Edit</a>
          <a href="#" class="card-footer-item">Delete</a>
        </footer>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {Message} from "@/model/Message";
import {AdminClient} from "@/client/Admin.client";
import {User} from "@/model/User";
import {AssociateClient} from "@/client/Associate.client";
import {CaregiverClient} from "@/client/Caregiver.client";
import {ProviderClient} from "@/client/Provider.client";
import Modal from "@/views/Modal.vue";
import {Caregiver} from "@/model/Caregiver";
import {Associate} from "@/model/Associate";
import {Provider} from "@/model/Provider";

interface Tab {
  label: string;
  icon: string;
  isActive: boolean;
}
@Component({
  components: {Modal}
})
export default class ManagerUsers extends Vue {
  public notificacao: Message = new Message();
  isVisible = false;
  private adminClient: AdminClient = new AdminClient();
  public userAssociateList: Associate[] = []
  public userCaregiverList: Caregiver[] = []
  public userProviderList: Provider[] = []
  public associateClient: AssociateClient = new AssociateClient()
  public caregiverClient: CaregiverClient = new CaregiverClient()
  public providerClient: ProviderClient = new ProviderClient()
  public mounted(): void {
    this.ListUsersProvider();
    this.ListUsersAssociate();
    this.ListUsersCareriver();
  }

  tabs: Tab[] = [
    { label: 'Protetor(a)', icon: 'fas fa-image', isActive: true },
    { label: 'Associado(a)', icon: 'fas fa-image', isActive: false },
    { label: 'Fornecedor(a)', icon: 'fas fa-image', isActive: false }
  ];
  activeTab: Tab | null = this.tabs.find(tab => tab.isActive) || null;
  activateTab(tab: Tab): void {
    this.tabs.forEach((t: Tab) => {
      t.isActive = (t === tab);
    });
    this.activeTab = tab.isActive ? tab : null;
  }
  public ListUsersAssociate(): void {
    this.associateClient.listAll().then(
        sucess => {
          this.userAssociateList = sucess
        },
        error => {
          console.log(error)
        }
    )
  }
  public ListUsersProvider(): void {
    this.providerClient.listAll().then(
        sucess => {
          this.userProviderList = sucess
        },
        error => {
          console.log(error)
        }
    )
  }
  public ListUsersCareriver(): void {
    this.caregiverClient.listAll().then(
        sucess => {
          this.userCaregiverList = sucess
        },
        error => {
          console.log(error)
        }
    )
  }

  public select: number = 0;

  public openDrop(id:number, icone:string) {
    const icon = document.getElementById(`${icone}`) as HTMLElement;
    const contentDiv = document.getElementById('conteudo') as HTMLElement;
    if(this.select === id){
      this.select = 0;
      icon.classList.remove('fa', 'fa-angle-up');
      icon.classList.add('fas', 'fa-angle-down');
    } else {
      this.select = id;
      icon.classList.remove('fas', 'fa-angle-down');
      icon.classList.add('fa', 'fa-angle-up');
    }
  }
}

</script>
<style scoped>

</style>