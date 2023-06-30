<template>
  <main>
    <div class="column is-3" style="align-items: center; justify-content: space-around; display: flex; flex-direction: column">
      <div class="box" style="align-items: center; justify-content: space-around; display: flex; flex-direction: column; height: 450px; width: 100%">
        <img src="../assets/Logo.png"/>
      <div class="column is-8">
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input" type="email" placeholder="Email" v-model="login.login" />
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
            <input class="input" type="password" placeholder="Password" v-model="login.password" />
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
      </div>
      <div class="control field column is-8" style="justify-content: space-around; display: flex">

          <router-link to="/"><button class="button is-danger is-outlined">Voltar</button></router-link>
          <button class="button is-link is-outlined" @click="onClickLogin">
            Login
          </button>

      </div>
        <div style="justify-content: flex-start; align-items: flex-start; display: flex; width: 100%">
          <router-link to="/register"> Não é Cadastrado ? </router-link>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>

main {
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100vh;
  background-color:  #002D4C;
}
main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo com opacidade */
  z-index: -1;
}
.box{

}
</style>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { UserClient } from "@/client/User.client";
import { Token } from "@/model/Token";
import { LoginUser } from "@/model/Login";
import { Message } from "@/model/Message";
import jwt_decode from "jwt-decode";
import router from "@/router";

@Component
export default class Login extends Vue {
  private userClient: UserClient = new UserClient();

  public login: LoginUser = new LoginUser();
  public tokenLogin: Token = new Token();
  public notificacao: Message = new Message();

  mounted(): void { }

  isVisible = false;

  public showComponent(): void {
    this.isVisible = true;

    setTimeout(() => {
      this.isVisible = false;
    }, 4000);
  }

  public extractAuthorities(decodedToken: { [key: string]: any }): string[] {
    if (decodedToken.authorities && Array.isArray(decodedToken.authorities)) {
      return decodedToken.authorities;
    }
    return [];
  }

  public onClickLogin(): void {
    this.userClient.login(this.login).then(
      (success) => {
        this.tokenLogin = this.tokenLogin.new(true, `${success}`);
        const tokenString = this.tokenLogin.token.toString();
        const decodedToken: { [key: string]: any } = jwt_decode(tokenString);

        const userAccess: string = decodedToken.access;
        const authorities: string[] = this.extractAuthorities(decodedToken);

        const approved: boolean = decodedToken.approved;

        const id: number = decodedToken.id;

        if (approved == true && authorities.includes("ROLE_ADMIN")) {
          window.location.href = "/administrador";
          console.log('chegou no adm')
        } 
        else if (approved == true && authorities.includes("ROLE_ASSOCIATE")) {
          router.push({ path:`/associado/${id}` })
          window.location.href = `/associado/${id}`;
        } 
        else if (approved == true && authorities.includes("ROLE_PROVIDER")) {
          window.location.href = "/fornecedor";
        } 
        else if (approved == true && authorities.includes("ROLE_CAREGIVER")) {
          window.location.href = "/protetora";
        } 
        else if (approved == false) {
          this.showComponent();
          this.notificacao = this.notificacao.new(
            true,
            "notification is-danger",
            "Usuário com aprovação pendente ou rejeitada!"
          );
        }

        console.log(decodedToken);
        sessionStorage.setItem("token", this.tokenLogin.token);
      },
      (error) => {
        this.showComponent();
        this.notificacao = this.notificacao.new(
          true,
          "notification is-danger",
          "Usuário ou senha incorreto"
        );
      }
    );
  }

  public onClickFecharNotificacao(): void {
    this.notificacao = new Message();
  }
}
</script>
