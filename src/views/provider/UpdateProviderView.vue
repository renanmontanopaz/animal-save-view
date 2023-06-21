<template>
    <main>
        <section>
            <div class="control">
                <h1 class="title">Editar perfil</h1>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Nome fantasia</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nome fantasia">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Nome empresarial</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nome empresarial">
                    </div>
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Contato</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Ex: (45) 9 0000-0000">
                    </div>
                </div>
                <div class="field">
                    <label class="label">CNPJ</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Ex: 00.000.000/0001-00">
                    </div>
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                        <input class="input" type="text" placeholder="Ex: exemplo@gmail.com">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Senha</label>
                    <div class="control has-icons-left">
                        <input class="input" type="password" placeholder="Mín. 5 dig e Máx. 10 dig">
                        <span class="icon is-small is-left">
                            <i class="fas fa-lock"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Cep</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Ex: 01001-000">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Bairro</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Bairro" disabled>
                    </div>
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Rua</label>
                </div>
                <div class="control">
                    <input class="input" type="number" placeholder="Rua" disabled>
                </div>
                <div class="field">
                    <label class="label">Número</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Número">
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class UpdateProviderView extends Vue {

}
</script>

<style lang="scss" scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .align_inputs {
        display: flex;
        gap: 30px;
    }
}
</style>