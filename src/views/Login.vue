<template>
  <main>
    <div class="box column is-4" style="justify-content: center; display: flex">
      <div class="column is-10">
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
        <div class="columns" v-if="notificacao.ativo">
          <div class="column is-12">
            <div :class="notificacao.classe" v-if="isVisible">
              <button @click="onClickFecharNotificacao" class="delete"></button>
              {{ notificacao.mensagem }}
            </div>
          </div>
        </div>
        <div class="field">
          <p class="control">
            <button class="button is-success" @click="onClickLogin">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss">
main {
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
<script lang="ts">

import Vue from "vue";
import { Component } from "vue-property-decorator";
import { UserClient } from "@/client/User.client";
import { Token } from "@/model/Token";
import { LoginUser } from "@/model/Login";
import { Message } from "@/model/Message";
import jwt_decode from "jwt-decode"

@Component
export default class Login extends Vue {
  private userClient: UserClient = new UserClient();

  public login: LoginUser = new LoginUser();
  public tokenLogin: Token = new Token();
  public notificacao: Message = new Message();

  mounted(): void {
  }

  isVisible = false;

  public showComponent(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 4000); // Tempo em milissegundos (5 segundos)
  }
  public onClickLogin(): void {
    //console.log(this.login)
    this.userClient.login(this.login).then(
        success => {
          this.tokenLogin = this.tokenLogin.new(true, `${success}`)
          const tokenString = this.tokenLogin.token.toString();
          const decodedToken: { [key: string]: any } = jwt_decode(tokenString);
          const userAccess: string  = decodedToken.access;
          console.log(this.tokenLogin)
          console.log(decodedToken); // Imprime o tipo de acesso do usuário
          localStorage.setItem('token', this.tokenLogin.token)
        },
        error => {
          this.showComponent();
          this.notificacao = this.notificacao.new(
              true, 'notification is-danger', 'Usuário ou senha incorreto'/*+ error.config.data*/
          )
        }

    )
  }

  public onClickFecharNotificacao(): void {
    this.notificacao = new Message()
  }
}

</script>