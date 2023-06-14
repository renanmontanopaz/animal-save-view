<template>
  <main>
    <div class="column is-5">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="email" placeholder="Email" v-model="login.login">
          <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
          <span class="icon is-small is-right">
          <i class="fas fa-check"></i>
        </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="login.password">
          <span class="icon is-small is-left">
          <i class="fas fa-lock"></i>
        </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" type="submit" @click="onClickLogin()">
            Login
          </button>
        </p>
      </div>
    </div>
  </main>
</template>
<style lang="scss">

main{
  align-items: center;
  justify-content: center;
  display: flex;
}
.field{

}

.container{

}

</style>
<script lang="ts">

import Vue from "vue";
import {Component} from "vue-property-decorator";
import {UserClient} from "@/client/User.client";
import {Token} from "@/model/Token";
import {LoginUser} from "@/model/Login";

@Component
export default class Login extends Vue{
  private userClient: UserClient = new UserClient();
  public login: LoginUser = new LoginUser();
  public token: Token = new Token();

  public mounted(): void {}
  private onClickLogin(): void {
    console.log(this.login)
    this.userClient.login(this.login).then(
        success => {
          this.token = success
        }
    )
  }
}
</script>