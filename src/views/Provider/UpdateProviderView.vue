<template>
    <section class="section_form">
        <main class="main_form">
            <div class="control">
                <h1 id="title_h1" class="title">Editar perfil</h1>
            </div>

            <div class="columns" v-if="notificacao.ativo">
                <div class="column is-12">
                    <div :class="notificacao.classe" v-if="isVisible">
                        <button @click="onClickFecharNotificacao" class="delete"></button>
                        {{ notificacao.mensagem }}
                    </div>
                </div>
            </div>

            <div v-if="selectUpdatePassword === false">
                <div class="align_inputs">
                    <div class="field">
                        <label id="label" class="label">Nome fantasia</label>
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
                        <label id="label" class="label">Nome empresarial</label>
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
                        <label id="label" class="label">Contato</label>
                        <div class="control">
                            <input v-model="provider.contact" @blur="validateInputContactProvider"
                                :class="`${inputContactProvider}`" class="input" type="text"
                                placeholder="Ex: (45) 9 0000-0000">
                            <p v-if="errorMessageContactProvider">
                            <ul>
                                <li v-for="error in errorMessageContactProvider" :key="error">{{ error }}</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                    <div class="field">
                        <label id="label" class="label">CNPJ</label>
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
                    <div class="field" id="email_field">
                        <label id="label" class="label">Email</label>
                        <div class="control has-icons-left">
                            <input v-model="provider.user.login" @blur="validateInputEmailProvider"
                                :class="`${inputEmailProvider}`" class="input" type="text"
                                placeholder="Ex: exemplo@gmail.com">
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
                </div>

                <div class="align_inputs">
                    <div class="field">
                        <label id="label" class="label">CEP</label>
                        <div class="control">
                            <input v-model="provider.address.cep" @blur="validateInputCepProvider"
                                :class="`${inputCepProvider}`" class="input" type="number" placeholder="Ex: 01001-000">
                            <p v-if="errorMessageCepProvider">
                            <ul>
                                <li v-for="error in errorMessageCepProvider" :key="error">{{ error }}</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                    <div class="field">
                        <label id="label" class="label">Bairro</label>
                        <div class="control">
                            <input v-model="provider.address.neighborhood" class="input" type="text" placeholder="Bairro"
                                disabled>
                        </div>
                    </div>
                </div>

                <div class="align_inputs">
                    <div class="field">
                        <label id="label" class="label">Rua</label>
                        <div class="control">
                            <input v-model="provider.address.road" class="input" type="input" placeholder="Rua" disabled>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Número</label>
                        <div class="control">
                            <input v-model="provider.address.houseNumber" @blur="validateInputNumberProvider"
                                :class="`${inputNumberProvider}`" class="input" type="number" placeholder="Número">
                            <p v-if="errorMessageNumberProvider">
                            <ul>
                                <li v-for="error in errorMessageNumberProvider" :key="error">{{ error }}</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div v-if="selectUpdatePassword === true">
                <div class="aling_inputs">
                    <div class="field">
                        <label class="label">Nova senha</label>
                        <div class="control">
                            <input @blur="validateInputPasswordProvider" v-model="provider.user.newPassword"
                                :class="`${inputPasswordProvider}`" type="password" placeholder="Nova senha" />
                            <p v-if="errorMessagePassword">
                            <ul>
                                <li v-for="error in errorMessagePassword" :key="error">{{ error }}</li>
                            </ul>
                            </p>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Confirme a senha</label>
                        <div class="control">
                            <input @blur="validateConfirmPasswordProvider" v-model="provider.user.confirmPassword"
                                :class="`${inputConfirmPasswordProvider}`" type="password" placeholder="Confirme a senha">
                            <p v-if="errorMessageConfirmPassword">
                            <ul>
                                <li v-for="error in errorMessageConfirmPassword" :key="error">{{ error }}</li>
                            </ul>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container_buttons">
                <div class="align_buttons">
                    <div class="field is-grouped">
                        <button v-if="selectUpdatePassword === true" @click="backUpdatePassword()"
                            class="button is-link is-info" id="previous_button">Página anterior</button>

                        <button v-if="selectUpdatePassword === true" @click="onClickUpdatePassword()"
                            class="button is-success" id="save_button">Salvar</button>

                        <button v-if="selectUpdatePassword === false" @click="clickUpdatePassword()"
                            class="button is-link is-danger" id="password_button">Alterar Senha</button>

                        <button v-if="selectUpdatePassword === false" @click="onClickBack()" class="button is-link is-light"
                            id="back_button">Voltar</button>

                        <button v-if="selectUpdatePassword === false" @click="onClickUpdate()" class="button is-success"
                            id="save_button">Salvar</button>
                    </div>
                </div>
            </div>
        </main>
    </section>
</template>

<script lang="ts" scoped>
import { ProviderClient } from '@/client/Provider.client'
import { Provider } from '@/model/Provider'
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { cnpj } from 'cpf-cnpj-validator'
import axios from 'axios'
import { Message } from '@/model/Message'
import { UserClient } from '@/client/User.client';

@Component
export default class UpdateProviderView extends Vue {

    isVisible = false;

    private userClient: UserClient = new UserClient();

    private providerClient: ProviderClient = new ProviderClient

    public provider: Provider = new Provider()

    public selectUpdatePassword: boolean = false;

    public inputNameFantasy: string = 'input'
    public inputNameBusiness: string = 'input'
    public inputContactProvider: string = 'input'
    public inputCnpjProvider: string = 'input'
    public inputEmailProvider: string = 'input'
    public inputPasswordProvider: string = 'input'
    public inputConfirmPasswordProvider: string = 'input';
    public inputCepProvider: string = 'input'
    public inputNumberProvider: string = 'input'

    public errorMessageNameFantasy: string[] = []
    public errorMessageNameBusiness: string[] = []
    public errorMessageContactProvider: string[] = []
    public errorMessageCnpjProvider: string[] = []
    public errorMessageEmailProvider: string[] = []
    public errorMessagePasswordProvider: string[] = []
    public errorMessageCepProvider: string[] = []
    public errorMessageNumberProvider: string[] = []
    public errorMessagePassword: string[] = [];
    public errorMessageConfirmPassword: string[] = [];
    public updateData: Provider = new Provider()

    public notificacao: Message = new Message();

    public notificationSave: boolean = false;

    public mounted(): void {
        this.getProviderByUser()
        this.fillProvider()
    }

    public getProviderByUser(): void {
        var id = Number(this.$route.params.id)
        this.userClient.findProviderByIdUser(id).then(
            success => {
                this.provider = success;
            },
            error => console.log(error)
        )
    }

    public fillProvider(): void {
        this.updateData = {
            id: this.provider?.id,
            register: this.provider?.register,
            fantasyName: this.provider?.fantasyName,
            businessName: this.provider?.businessName,
            cnpj: this.provider?.cnpj,
            contact: this.provider?.contact,
            tasks: this.provider?.tasks,
            address: {
                id: this.provider?.address?.id,
                active: this.provider?.address?.active,
                register: this.provider?.address?.register,
                update: this.provider?.address?.update,
                cep: this.provider?.address?.cep,
                neighborhood: this.provider?.address?.neighborhood,
                road: this.provider?.address?.road,
                houseNumber: this.provider?.address?.houseNumber,
            },
            user: {
                id: this.provider?.user?.id,
                login: this.provider?.user?.login,
                password: this.provider?.user?.password,
                newPassword: this.provider?.user?.newPassword,
                confirmPassword: this.provider?.user?.confirmPassword,
                admin: this.provider?.user?.admin,
                approved: this.provider?.user?.approved,
                pending: this.provider?.user?.pending,
                rejected: this.provider?.user?.rejected,
                caregiver: this.provider?.user?.caregiver,
                provider: this.provider?.user?.provider,
                associate: this.provider?.user?.associate,
                occurrences: this.provider?.user?.occurrences
            },
            active: this.provider?.active,
            update: this.provider.update
        };
    }

    public onClickUpdate(): void {
        this.validateFormProvider()
        this.fillProvider()
        if (this.allInputsValidsProvider() === true) {
            this.providerClient.update(this.updateData).then(
                success => {
                    console.log('Fornecedor atualizado com sucesso!')
                    this.notificationSave = true;
                    this.showComponent();
                    this.notificacao = this.notificacao.new(
                        true,
                        "notification is-primary",
                        "Perfil atualizado com sucesso!"
                    );
                },
                error => {
                    console.log(error)
                }
            )
        }
    }

    public allIputsValidsNewPassword(): boolean {
        if (this.inputPasswordProvider !== 'input is-danger' && this.inputConfirmPasswordProvider !== 'input is-danger') {
            return true;
        } else {
            return false;
        }
    }

    public onClickUpdatePassword(): void {
        this.validateInputPasswordProvider();
        this.validateConfirmPasswordProvider();
        if (this.allIputsValidsNewPassword() === true) {
            this.userClient.newPassword(this.provider.user.newPassword, this.provider.user.id).then(
                success => {
                    console.log('Senha editada com sucesso!!!');
                    this.notificationSave = true;
                },
                error => {
                    console.log(error);
                }
            )
        }
    }

    public clickUpdatePassword() {
        this.selectUpdatePassword = true;
    }

    public backUpdatePassword() {
        this.selectUpdatePassword = false;
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
            this.errorMessageNameBusiness = []
            this.inputNameBusiness = 'input is-success'
        }
    }

    public validatePhoneNumberProvider(phoneNumber: string): boolean {
        const phoneNumberRegex = /^(?:\d{2}\s\d{9}|\d{2}\s\d\s\d{4}-\d{4}|\d{2}\s\d\s\d{8})$/;
        return phoneNumberRegex.test(this.provider.contact);
    }

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
            this.errorMessageCnpjProvider = []
            this.inputCnpjProvider = 'input is-success'
        } else {
            this.errorMessageCnpjProvider = ['Insira um CNPJ válido!']
            this.inputCnpjProvider = 'input is-danger'
        }
    }

    public isValidEmail(email: string): boolean {
        return /\S+@\S+\.\S+/.test(email)
    }

    public validateInputEmailProvider() {
        if (!this.provider.user.login) {
            this.errorMessageEmailProvider = ['O campo "Email" é obrigatório!']
            this.inputEmailProvider = 'input is-danger'
        } else if (!this.isValidEmail(this.provider.user.login)) {
            this.errorMessageEmailProvider = ['Insira um email válido!']
            this.inputEmailProvider = 'input is-danger'
        } else {
            this.errorMessageEmailProvider = []
            this.inputEmailProvider = 'input is-success'
        }
    }

    public validateInputPasswordProvider() {
        if (!this.provider.user.newPassword) {
            this.errorMessagePassword = ['O campo "Senha" é obrigatório!'];
            this.inputPasswordProvider = 'input is-danger';
        } else if (this.provider.user.newPassword.length <= 4) {
            this.errorMessagePassword = ['O campo "Senha" deve ter no mínimo 5 caracteres!'];
            this.inputPasswordProvider = 'input is-danger';
        } else if (this.provider.user.newPassword.length >= 11) {
            this.errorMessagePassword = ['O campo "Senha" deve ter no máximo 10 caracteres!'];
            this.inputPasswordProvider = 'input is-danger';
        } else {
            this.errorMessagePassword = [];
            this.inputPasswordProvider = 'input is-success';
        }
    }

    public validateConfirmPasswordProvider() {
        if (!this.provider.user.confirmPassword) {
            this.errorMessageConfirmPassword = ['O campo "Confirmar Senha" é obrigatório!'];
            this.inputConfirmPasswordProvider = 'input is-danger';
        } else if (this.provider.user.confirmPassword !== this.provider.user.newPassword) {
            this.errorMessageConfirmPassword = ['As senhas não correspondem!'];
            this.inputConfirmPasswordProvider = 'input is-danger';
        } else {
            this.errorMessageConfirmPassword = [];
            this.inputConfirmPasswordProvider = 'input is-success';
        }
    }

    async fetchAddressProvider(): Promise<void> {
        if (this.provider.address.cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${this.provider.address.cep}/json/`)
                const { logradouro, bairro } = response.data
                if (logradouro == null || bairro == null) {
                    this.errorMessageCepProvider = ['CEP inválido!']
                    this.inputCepProvider = 'input is-danger'
                }
                this.provider.address.road = logradouro
                this.provider.address.neighborhood = bairro
            } catch (error) {
                this.errorMessageCepProvider = ['CEP inválido!']
                this.inputCepProvider = 'input is-danger'
                this.clearAddressFieldsProvider()
            }
        } else {
            this.errorMessageCepProvider = ['CEP inválido!']
            this.inputCepProvider = 'input is-danger'
            this.clearAddressFieldsProvider()
        }
    }

    private clearAddressFieldsProvider(): void {
        this.provider.address.road = ''
        this.provider.address.neighborhood = ''
    }

    public validateInputCepProvider(): void {
        if (!this.provider.address.cep) {
            this.errorMessageCepProvider = ['O campo "CEP" é obrigatório!']
            this.inputCepProvider = 'input is-danger'
            this.clearAddressFieldsProvider()
        } else if (this.provider.address.cep.length !== 8) {
            this.errorMessageCepProvider = ['CEP inválido!']
            this.inputCepProvider = 'input is-danger'
            this.clearAddressFieldsProvider()
        } else {
            this.fetchAddressProvider()
            this.errorMessageCepProvider = []
            this.inputCepProvider = 'input is-success'
        }
    }

    public validateInputNumberProvider() {
        if (!this.provider.address.houseNumber) {
            this.errorMessageNumberProvider = ['O campo "Número" é obrigatório!']
            this.inputNumberProvider = 'input is-danger'
        } else if (this.provider.address.houseNumber > 1000000) {
            this.errorMessageNumberProvider = ['O número inserido é invalido!']
            this.inputNumberProvider = 'input is-danger'
        } else {
            this.errorMessageNumberProvider = []
            this.inputNumberProvider = 'input is-success'
        }
    }

    public allInputsValidsProvider(): boolean {
        if (this.inputNameFantasy !== 'input is-danger' && this.inputNameBusiness !== 'input is-danger'
            && this.inputContactProvider !== 'input is-danger' && this.inputCnpjProvider !== 'input is-danger'
            && this.inputEmailProvider !== 'input is-danger' && this.inputPasswordProvider !== 'input is-danger'
            && this.inputCepProvider !== 'input is-danger' && this.inputNumberProvider !== 'input is-danger') {
            return true
        } else {
            return false
        }
    }

    public validateFormProvider() {
        this.validateInputNameFantasy()
        this.validateInputNameBusiness()
        this.validateInputContactProvider()
        this.validateInputCpnjProvider()
        this.validateInputEmailProvider()
        this.validateInputCepProvider()
        this.validateInputNumberProvider()
    }

    public onClickFecharNotificacao(): void {
        this.notificacao = new Message();
    }

    public showComponent(): void {
        this.isVisible = true;

        setTimeout(() => {
            this.isVisible = false;
        }, 4000);
    }

    public onClickBack() {
        this.$router.go(-1);
    }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.section_form {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #002D4C;
    font-family: Poppins;

    #title_h1 {
        color: #002D4C;
    }

    #label {
        color: #002D4C;
    }

    #previous_button {
        background-color: #002D4C;
        color: #FFFFFF;
    }

    #password_button {
        background-color: #F64367;
        color: #002D4C;
    }

    #back_button {
        background-color: #FBBD08;
        color: #002D4C;
    }

    #save_button {
        background-color: #48C88F;
        color: #002D4C;
    }

    #email_field {
        width: 630px;
        margin-bottom: 10px;
    }

    textarea,
    input {
        border: 1px solid #EBE3CC;
        transition: border-color 0.3s ease;
    }

    textarea:hover,
    input:hover {
        border: 2px solid #002D4C;
    }

    button {
        font-family: Poppins;
        font-weight: 300;
        transition: transform 0.3s ease;
    }

    button:hover {
        filter: brightness(1.1);
        transform: scale(1.1);
    }

    .main_form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 50%;
        background-color: #EBE3CC;
        border-radius: 20px;

        .title {
            padding: 20px 0px 20px 0px;
        }

        .align_inputs {
            display: flex;
            gap: 30px;
        }

        .container_buttons {
            display: flex;
            justify-content: center;
            padding: 30px 0px;
            align-items: center;

            .align_buttons {
                display: flex;
                justify-content: center;
                align-items: center;
                max-width: 405px;
                gap: 25px;
            }

            .button {
                width: 200px;
            }
        }

        .field {
            width: 300px;
        }
    }
}
</style>