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
                        <input v-model="provider.fantasyName" @blur="validateInputNameFantasy"
                            :class="`${inputNameFantasy}`" class="input" type="text" placeholder="Nome fantasia">
                        <p v-if="errorMessageNameFantasy">
                        <ul>
                            <li v-for="error in errorMessageNameFantasy" :key="error">{{ error }}</li>
                        </ul>
                        </p>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Nome empresarial</label>
                    <div class="control">
                        <input v-model="provider.businessName" @blur="validateInputNameBusiness"
                            :class="`${inputNameBusiness}`" class="input" type="text" placeholder="Nome empresarial">
                        <p v-if="errorMessageNameBusiness">
                        <ul>
                            <li v-for="error in errorMessageNameBusiness" :key="error">{{ error }}</li>
                        </ul>
                        </p>
                    </div>
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Contato</label>
                    <div class="control">
                        <input v-model="provider.contact" @blur="validateInputContactProvider"
                            :class="`${inputContactProvider}`" class="input" type="text" placeholder="Ex: (45) 9 0000-0000">
                        <p v-if="errorMessageContactProvider">
                        <ul>
                            <li v-for="error in errorMessageContactProvider" :key="error">{{ error }}</li>
                        </ul>
                        </p>
                    </div>
                </div>
                <div class="field">
                    <label class="label">CNPJ</label>
                    <div class="control">
                        <input v-model="provider.cnpj" @blur="validateInputCpnjProvider" :class="`${inputCnpjProvider}`"
                            class="input" type="text" placeholder="Ex: 00.000.000/0001-00">
                        <p v-if="errorMessageCnpjProvider">
                        <ul>
                            <li v-for="error in errorMessageCnpjProvider" :key="error">{{ error }}</li>
                        </ul>
                        </p>
                    </div>
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                        <input v-model="provider.user.login" @blur="validateInputEmailProvider"
                            :class="`${inputEmailProvider}`" class="input" type="text" placeholder="Ex: exemplo@gmail.com">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
                        <p v-if="errorMessageEmailProvider">
                        <ul>
                            <li v-for="error in errorMessageEmailProvider" :key="error">{{ error }}</li>
                        </ul>
                        </p>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Senha</label>
                    <div class="control has-icons-left">
                        <input v-model="provider.user.password" class="input" type="password"
                            placeholder="Mín. 5 dig e Máx. 10 dig">
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
                        <input v-model="provider.address.cep" class="input" type="number" placeholder="Ex: 01001-000">
                    </div>
                </div>
                <div class="field">
                    <label class="label">Bairro</label>
                    <div class="control">
                        <input v-model="provider.address.neighborhood" class="input" type="text" placeholder="Bairro"
                            disabled>
                    </div>
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Rua</label>
                    <div class="control">
                        <input v-model="provider.address.road" class="input" type="input" placeholder="Rua" disabled>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Número</label>
                    <div class="control">
                        <input v-model="provider.address.houseNumber" class="input" type="number" placeholder="Número">
                    </div>
                </div>
            </div>

            <div class="container_buttons">
                <div class="aling_buttons">
                    <div class="field is-grouped">
                        <div class="control">
                            <router-link to="/provider"><button
                                    class="button is-link is-light">Voltar</button></router-link>
                        </div>
                        <div class="control">
                            <button @click="onClickUpdate()" class="button is-success is-focused">Atualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { ProviderClient } from '@/client/Provider.client'
import { Provider } from '@/model/Provider'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { cnpj } from 'cpf-cnpj-validator';

@Component
export default class UpdateProviderView extends Vue {

    private providerClient: ProviderClient = new ProviderClient

    public provider: Provider = new Provider()

    public providerList: Provider[] = []

    public inputNameFantasy: string = 'input'
    public inputNameBusiness: string = 'input'
    public inputContactProvider: string = 'input'
    public inputCnpjProvider: string = 'input'
    public inputEmailProvider: string = 'input';

    public errorMessageNameFantasy: string[] = []
    public errorMessageNameBusiness: string[] = []
    public errorMessageContactProvider: string[] = []
    public errorMessageCnpjProvider: string[] = []
    public errorMessageEmailProvider: string[] = [];

    private id = Number(this.$route.params.id)

    public mounted(): void {
        this.getProvider()
    }

    private getProvider(): void {
        this.providerClient.findById(this.id).then(
            success => {
                this.provider = success
            },
            error => console.log(error)
        )
    }

    public onClickUpdate(): void {
        this.providerClient.save(this.provider).then(
            success => {
                console.log('Provedor atualizado com sucesso!')
                this.provider = new Provider()
            },
            error => {
                console.log(error)
            }
        )
    }

    public validateInputNameFantasy() {
        if (!this.provider.fantasyName) {
            this.errorMessageNameFantasy = ['O campo "Nome fantasia" é obrigatório!']
            this.inputNameFantasy = 'input is-danger'
        }
        else if (this.provider.fantasyName.length > 15) {
            this.errorMessageNameFantasy = ['O campo "Nome fantasia" deve ter no máximo 15 caracteres!']
            this.inputNameFantasy = 'input is-danger'
        }
        else if (this.provider.fantasyName.length < 3) {
            this.errorMessageNameFantasy = ['O campo "Nome fantasia" deve ter no mínimo 3 caracteres!']
            this.inputNameFantasy = 'input is-danger'
        } else {
            this.errorMessageNameFantasy = []
            this.inputNameFantasy = 'input is-success'
        }
    }

    public validateInputNameBusiness() {
        if (!this.provider.businessName) {
            this.errorMessageNameBusiness = ['O campo "Nome empresarial" é obrigatório!']
            this.inputNameBusiness = 'input is-danger'
        }
        else if (this.provider.businessName.length > 20) {
            this.errorMessageNameBusiness = ['O campo "Nome empresarial" deve ter no máximo 20 caracteres!']
            this.inputNameBusiness = 'input is-danger'
        }
        else if (this.provider.businessName.length < 5) {
            this.errorMessageNameBusiness = ['O campo "Nome empresarial" deve ter no mínimo 5 caracteres!']
            this.inputNameBusiness = 'input is-danger'
        } else {
            this.errorMessageNameBusiness = [];
            this.inputNameBusiness = 'input is-success'
        }
    }

    public validatePhoneNumberProvider(phoneNumber: string): boolean {
        const phoneNumberRegex = /^\d{2}\s\d\s\d{4}-\d{4}$/
        return phoneNumberRegex.test(this.provider.contact)
    };

    public validateInputContactProvider() {
        if (this.validatePhoneNumberProvider(this.provider.contact)) {
            this.errorMessageContactProvider = []
            this.inputContactProvider = 'input is-success'
        } else if (!this.provider.contact) {
            this.errorMessageContactProvider = ['O campo "Contato" é obrigatório!']
            this.inputContactProvider = 'input is-danger'
        } else {
            this.errorMessageContactProvider = ['Siga o seguinte formato: "45 9 0000-0000"!']
            this.inputContactProvider = 'input is-danger'
        }
    }

    public validateInputCpnjProvider() {
        if (!this.provider.cnpj) {
            this.errorMessageCnpjProvider = ['O campo "CNPJ" é obrigatório!']
            this.inputCnpjProvider = 'input is-danger'
        } else if (cnpj.isValid(this.provider.cnpj)) {
            this.errorMessageCnpjProvider = [];
            this.inputCnpjProvider = 'input is-success'
        } else {
            this.errorMessageCnpjProvider = ['Insira um CNPJ válido!']
            this.inputCnpjProvider = 'input is-danger'
        }
    }

    public isValidEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email);
    }

    public validateInputEmailProvider() {
        if (!this.provider.user.login) {
            this.errorMessageEmailProvider = ['O campo "Email" é obrigatório!'];
            this.inputEmailProvider = 'input is-danger';
        } else if (!this.isValidEmail(this.provider.user.login)) {
            this.errorMessageEmailProvider = ['Insira um email válido!'];
            this.inputEmailProvider = 'input is-danger';
        } else {
            this.errorMessageEmailProvider = [];
            this.inputEmailProvider = 'input is-success';
        }
    }
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

    .container_buttons {
        display: flex;
        justify-content: center;
        padding: 30px 0px;

        .aling_buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 405px;
        }
    }
}
</style>