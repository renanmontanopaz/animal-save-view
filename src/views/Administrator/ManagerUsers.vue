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

@Component
export default class ManagerUsers extends Vue {
  public notificacao: Message = new Message();
  isVisible = false;
  private adminClient: AdminClient = new AdminClient();
  public userList: User[] = []

  public mounted(): void {
    this.ListUsers();
  }
  public ListUsers(): void {
    this.adminClient.listUsers().then(
        success => {
          this.userList = success
          console.log(this.userList)
        },
        error => {
          console.log(error)
        }
    )
  }

}
</script>