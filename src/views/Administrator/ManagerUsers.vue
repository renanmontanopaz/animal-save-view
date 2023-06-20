<template>
  <div>
    <p>teste</p>
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

@Component
export default class ManagerUsers extends Vue {
  public notificacao: Message = new Message();
  isVisible = false;
  private adminClient: AdminClient = new AdminClient();
  public userList: Object[] = []
  public associateClient: AssociateClient = new AssociateClient()
  public caregiverClient: CaregiverClient = new CaregiverClient()
  public providerClient: ProviderClient = new ProviderClient()
  public mounted(): void {
    this.ListUsers();
  }
  public ListUsers(): void {
    Promise.all([
      this.associateClient.listAll(),
      this.caregiverClient.listAll(),
      this.providerClient.listAll()
    ]).then(
        ([associateUsers, caregiverUsers, providerUsers]) => {
          this.userList = [...associateUsers, ...caregiverUsers, ...providerUsers];
          console.log(this.userList);
        },
        error => {
          console.log(error)
        }
    )

  }

}
</script>