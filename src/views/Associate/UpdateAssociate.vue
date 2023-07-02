<template>
    <main>
        <section class="section_register">
            <div class="container_form">
                <div>
                    <article v-if="notificationSave" class="message is-success">
                        <div class="message-header">
                            <h3>Sucesso</h3>
                            <button @click="closeNotification" class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">
                            Alterações salvas com sucesso!
                        </div>
                    </article>

                    <div v-if="selectUpdatePassword === false">
                        <div class="aling_inputs">
                            <div class="field">
                                <label class="label">Primeiro nome</label>
                                <div class="control">
                                    <input @blur="validateInputFirstName" v-model="associate.firstName"
                                        :class="`${inputFirstName}`" type="text" placeholder="Primeiro nome" />
                                    <p v-if="errorMessageFirstName">
                                    <ul>
                                        <li v-for="error in errorMessageFirstName" :key="error">{{ error }}</li>
                                    </ul>
                                    </p>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Sobrenome</label>
                                <div class="control">
                                    <input @blur="validateInputLastName" v-model="associate.lastName"
                                        :class="`${inputLastName}`" type="text" placeholder="Sobrenome">
                                    <p v-if="errorMessageLastName">
                                    <ul>
                                        <li v-for="error in errorMessageLastName" :key="error">{{ error }}</li>
                                    </ul>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="aling_inputs">
                            <div class="field">
                                <label class="label">Contato</label>
                                <div class="control">
                                    <input @blur="validateInputContact" v-model="associate.contact"
                                        :class="`${inputContact}`" type="text" placeholder="Exemplo: 45 9 00000000">
                                    <p v-if="errorMessageContact">
                                    <ul>
                                        <li v-for="error in errorMessageContact" :key="error">{{ error }}</li>
                                    </ul>
                                    </p>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">CPF</label>
                                <div class="control">
                                    <input disabled @blur="validateInputCpf" v-model="associate.cpf" :class="`${inputCpf}`"
                                        type="text" placeholder="Exemplo: 000.000.000-00">
                                    <p v-if="errorMessageCpf">
                                    <ul>
                                        <li v-for="error in errorMessageCpf" :key="error">{{ error }}</li>
                                    </ul>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input disabled @blur="validateInputEmail" v-model="associate.user.login"
                                    :class="`${inputEmail}`" type="text" placeholder="Exemplo: exemplo@gmail.com">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                                <p v-if="errorMessageEmail">
                                <ul>
                                    <li v-for="error in errorMessageEmail" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
                        </div>

                        <div class="aling_inputs">
                            <div class="field">
                                <label class="label">Cep</label>
                                <div class="control">
                                    <input v-model="associate.address.cep" @blur="validateInputCep" :class="`${inputCep}`"
                                        type="number" placeholder="Exemplo: 01001-000">
                                    <p v-if="errorMessageCep">
                                    <ul>
                                        <li v-for="error in errorMessageCep" :key="error">{{ error }}</li>
                                    </ul>
                                    </p>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Bairro</label>
                                <div class="control">
                                    <input disabled v-model="associate.address.neighborhood" class="input" type="text"
                                        placeholder="Bairro">
                                </div>
                            </div>
                        </div>

                        <div class="aling_inputs">
                            <div class="field">
                                <label class="label">Rua</label>
                                <div class="control">
                                    <input disabled v-model="associate.address.road" class="input" type="text"
                                        placeholder="Rua">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Número</label>
                                <div class="control">
                                    <input v-model="associate.address.houseNumber" @blur="validateInputNumber"
                                        :class="`${inputNumber}`" type="number" placeholder="Número">
                                    <p v-if="errorMessageNumber">
                                    <ul>
                                        <li v-for="error in errorMessageNumber" :key="error">{{ error }}</li>
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
                                    <input @blur="validateInputPassword" v-model="associate.user.newPassword"
                                        :class="`${inputPassword}`" type="password" placeholder="Nova senha" />
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
                                    <input @blur="validateConfirmPassword" v-model="associate.user.confirmPassword"
                                        :class="`${inputConfirmPassword}`" type="password" placeholder="Confirme a senha">
                                    <p v-if="errorMessageConfirmPassword">
                                    <ul>
                                        <li v-for="error in errorMessageConfirmPassword" :key="error">{{ error }}</li>
                                    </ul>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container_buttons">
                <div class="aling_buttons">
                    <div class="field is-grouped">
                        <div class="control">
                            <button id="button-back-previous-pag" v-if="selectUpdatePassword === true"
                                @click="backUpdatePassword" class="button is-link is-info">Página anterior</button>
                        </div>

                        <div class="control">
                            <button id="cadastrar" v-if="selectUpdatePassword === true" @click="onClickUpdatePassword()"
                                class="button is-success is-focused">Salvar</button>
                        </div>

                        <div class="control">
                            <button id="button-back" v-if="selectUpdatePassword === false" @click="onClickBack"
                                class="button is-link is-info">Voltar</button>
                        </div>

                        <div class="control">
                            <button id="button-update-password" v-if="selectUpdatePassword === false"
                                @click="clickUpdatePassword" class="button is-link is-danger">Alterar Senha</button>
                        </div>

                        <div class="control">
                            <button id="cadastrar" v-if="selectUpdatePassword === false" @click="onClickUpdate()"
                                class="button is-success is-focused">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
  
<script lang="ts" scoped>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import { cpf } from 'cpf-cnpj-validator';

import { Associate } from '@/model/Associate';
import { Message } from '@/model/Message';

import { AssociateClient } from '@/client/Associate.client';
import router from '@/router';
import { UserClient } from '@/client/User.client';

@Component
export default class Register extends Vue {
    private userClient: UserClient = new UserClient();
    private associateClient: AssociateClient = new AssociateClient()

    public associateAtributesList: Associate[] = [];

    public associate: Associate = new Associate();

    public notificacao: Message = new Message();

    public notificationSave: boolean = false;
    public selectUpdatePassword: boolean = false;

    //ASSOCIATE
    public inputFirstName: string = 'input';
    public inputLastName: string = 'input';
    public inputContact: string = 'input';
    public inputCpf: string = 'input';
    public inputEmail: string = 'input';
    public inputCep: string = 'input';
    public inputNumber: string = 'input';
    public inputPassword: string = 'input';
    public inputConfirmPassword: string = 'input';

    //ASSOCIATE
    public errorMessageFirstName: string[] = [];
    public errorMessageLastName: string[] = [];
    public errorMessageContact: string[] = [];
    public errorMessageCpf: string[] = [];
    public errorMessageEmail: string[] = [];
    public errorMessageCep: string[] = [];
    public errorMessageNumber: string[] = [];
    public errorMessagePassword: string[] = [];
    public errorMessageConfirmPassword: string[] = [];
    public updateData: Associate = new Associate();

    public mounted(): void {
        this.getAssociateByUser();
        this.fillAssociate();
    }

    public getAssociateByUser(): void {
        var id = Number(this.$route.params.id)
        this.userClient.findAssociateByIdUser(id).then(
            success => {
                this.associate = success;
            },
            error => console.log(error)
        )
    }

    public fillAssociate(): void {
        this.updateData = {
            id: this.associate?.id,
            register: this.associate.register,
            firstName: this.associate?.firstName,
            lastName: this.associate?.lastName,
            contact: this.associate?.contact,
            cpf: this.associate?.cpf,
            address: {
                id: this.associate?.address?.id,
                cep: this.associate?.address?.cep,
                neighborhood: this.associate?.address?.neighborhood,
                road: this.associate?.address?.road,
                houseNumber: this.associate?.address?.houseNumber,
                active: this.associate?.address?.active,
                register: this.associate?.address?.register,
                update: this.associate?.address?.update
            },
            user: {
                id: this.associate?.user?.id,
                login: this.associate?.user?.login,
                password: this.associate?.user?.password,
                newPassword: this.associate?.user?.newPassword,
                confirmPassword: this.associate?.user?.confirmPassword,
                admin: this.associate?.user?.admin,
                approved: this.associate?.user?.approved,
                pending: this.associate?.user?.pending,
                rejected: this.associate?.user?.rejected,
                caregiver: this.associate?.user?.caregiver,
                provider: this.associate?.user?.provider,
                associate: this.associate?.user?.associate,
                occurrences: this.associate?.user?.occurrences
            },
            active: this.associate?.active,
            update: this.associate.update
        };
        console.log(this.updateData);
    }

    public onClickUpdate(): void {
        this.validateFormAssociate();
        this.fillAssociate();
        if (this.allIputsValidsAssociate() === true) {
            this.associateClient.update(this.updateData).then(
                success => {
                    console.log('Associado editado com sucesso!!!');
                    this.notificationSave = true;
                },
                error => {
                    console.log(error);
                }
            )
        }
    }

    public allIputsValidsNewPassword(): boolean {
        if (this.inputPassword !== 'input is-danger' && this.inputConfirmPassword !== 'input is-danger') {
            return true;
        } else {
            return false;
        }
    }

    public onClickUpdatePassword(): void {
        this.validateInputPassword();
        this.validateConfirmPassword();
        if (this.allIputsValidsNewPassword() === true) {
            this.userClient.newPassword(this.associate.user.newPassword, this.associate.user.id).then(
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

    public onClickBack() {
        var id = Number(this.$route.params.id)
        router.push({ path: `/associado/${id}` })
    }

    //ASSOCIATE
    public resetInputsAssociate() {
        this.inputFirstName = 'input';
        this.inputLastName = 'input';
        this.inputContact = 'input';
        this.inputCpf = 'input';
        this.inputEmail = 'input';
        this.inputCep = 'input';
        this.inputNumber = 'input';
    }

    //ASSOCIATE
    public validateInputFirstName() {
        if (!this.associate.firstName) {
            this.errorMessageFirstName = ['O campo "Primeiro nome" é obrigatório!'];
            this.inputFirstName = 'input is-danger';
        }
        else if (this.associate.firstName.length > 15) {
            this.errorMessageFirstName = ['O campo "Primeiro nome" deve ter no máximo 10 caracteres!'];
            this.inputFirstName = 'input is-danger';
        }
        else if (this.associate.firstName.length <= 2) {
            this.errorMessageFirstName = ['O campo "Primeiro nome" deve ter no mínimo 3 caracteres!'];
            this.inputFirstName = 'input is-danger';
        } else {
            this.errorMessageFirstName = [];
            this.inputFirstName = 'input is-success';
        }
    }

    //ASSOCIATE
    public validateInputLastName() {
        if (!this.associate.lastName) {
            this.errorMessageLastName = ['O campo "Sobrenome" é obrigatório!'];
            this.inputLastName = 'input is-danger';
        } else if (this.associate.lastName.length > 20) {
            this.errorMessageLastName = ['O campo "Sobrenome" deve ter no máximo 20 caracteres!'];
            this.inputLastName = 'input is-danger';
        } else if (this.associate.lastName.length <= 2) {
            this.errorMessageLastName = ['O campo "Sobrenome" deve ter no mínimo 3 caracteres!'];
            this.inputLastName = 'input is-danger';
        } else {
            this.errorMessageLastName = [];
            this.inputLastName = 'input is-success';
        }
    }

    //ASSOCIATE
    public validatePhoneNumber(phoneNumber: string): boolean {
        const phoneNumberRegex = /^(?:\d{2}\s\d{9}|\d{2}\s\d\s\d{4}-\d{4}|\d{2}\s\d\s\d{8})$/;
        return phoneNumberRegex.test(this.associate.contact);
    };

    //ASSOCIATE
    public validateInputContact() {
        if (this.validatePhoneNumber(this.associate.contact)) {
            this.errorMessageContact = [];
            this.inputContact = 'input is-success';
        } else if (!this.associate.contact) {
            this.errorMessageContact = ['O campo "Contato" é obrigatório!'];
            this.inputContact = 'input is-danger';
        } else {
            this.errorMessageContact = ['Siga o seguinte formato: "45 9 00000000"!'];
            this.inputContact = 'input is-danger';
        }
    }

    //ASSOCIATE
    public validateInputCpf() {
        if (!this.associate.cpf) {
            this.errorMessageCpf = ['O campo "CPF" é obrigatório!'];
            this.inputCpf = 'input is-danger';
        } else if (cpf.isValid(this.associate.cpf)) {
            this.errorMessageCpf = [];
            this.inputCpf = 'input is-success';
        } else {
            this.errorMessageCpf = ['Insira um CPF válido!'];
            this.inputCpf = 'input is-danger';
        }
    }

    //ASSOCIATE/PROVIDER/CAREGIVER
    public isValidEmail(email: string): boolean {
        // Verifique a validade do email usando uma expressão regular ou outra lógica
        return /\S+@\S+\.\S+/.test(email);
    }

    //ASSOCIATE
    public validateInputEmail() {
        if (!this.associate.user.login) {
            this.errorMessageEmail = ['O campo "Email" é obrigatório!'];
            this.inputEmail = 'input is-danger';
        } else if (!this.isValidEmail(this.associate.user.login)) {
            this.errorMessageEmail = ['Insira um email válido!'];
            this.inputEmail = 'input is-danger';
        } else {
            this.errorMessageEmail = [];
            this.inputEmail = 'input is-success';
        }
    }

    //ASSOCIATE
    async fetchAddress(): Promise<void> {
        if (this.associate.address.cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${this.associate.address.cep}/json/`);
                const { logradouro, bairro } = response.data;
                if (logradouro == null || bairro == null) {
                    this.errorMessageCep = ['CEP inválido!'];
                    this.inputCep = 'input is-danger';
                }
                this.associate.address.road = logradouro;
                this.associate.address.neighborhood = bairro;
            } catch (error) {
                this.errorMessageCep = ['CEP inválido!'];
                this.inputCep = 'input is-danger';
                this.clearAddressFields();
            }
        } else {
            this.errorMessageCep = ['CEP inválido!'];
            this.inputCep = 'input is-danger';
            this.clearAddressFields();
        }
    }

    //ASSOCIATE
    private clearAddressFields(): void {
        this.associate.address.road = '';
        this.associate.address.neighborhood = '';
    }

    //ASSOCIATE
    public validateInputCep(): void {
        if (!this.associate.address.cep) {
            this.errorMessageCep = ['O campo "CEP" é obrigatório!'];
            this.inputCep = 'input is-danger';
            this.clearAddressFields();
        } else if (this.associate.address.cep.length !== 8) {
            this.errorMessageCep = ['CEP inválido!'];
            this.inputCep = 'input is-danger';
            this.clearAddressFields();
        } else {
            this.fetchAddress();
            this.errorMessageCep = [];
            this.inputCep = 'input is-success';
        }
    }

    //ASSOCIATE
    public validateInputNumber() {
        if (!this.associate.address.houseNumber) {
            this.errorMessageNumber = ['O campo "Número" é obrigatório!'];
            this.inputNumber = 'input is-danger';
        } else if (this.associate.address.houseNumber > 1000000) {
            this.errorMessageNumber = ['O número inserido é invalido!'];
            this.inputNumber = 'input is-danger';
        } else {
            this.errorMessageNumber = [];
            this.inputNumber = 'input is-success';
        }
    }

    //PASSWORD
    public validateInputPassword() {
        if (!this.associate.user.newPassword) {
            this.errorMessagePassword = ['O campo "Senha" é obrigatório!'];
            this.inputPassword = 'input is-danger';
        } else if (this.associate.user.newPassword.length <= 4) {
            this.errorMessagePassword = ['O campo "Senha" deve ter no mínimo 5 caracteres!'];
            this.inputPassword = 'input is-danger';
        } else if (this.associate.user.newPassword.length >= 11) {
            this.errorMessagePassword = ['O campo "Senha" deve ter no máximo 10 caracteres!'];
            this.inputPassword = 'input is-danger';
        } else {
            this.errorMessagePassword = [];
            this.inputPassword = 'input is-success';
        }
    }

    //CONFIRM PASSWORD
    public validateConfirmPassword() {
        if (!this.associate.user.confirmPassword) {
            this.errorMessageConfirmPassword = ['O campo "Confirmar Senha" é obrigatório!'];
            this.inputConfirmPassword = 'input is-danger';
        } else if (this.associate.user.confirmPassword !== this.associate.user.newPassword) {
            this.errorMessageConfirmPassword = ['As senhas não correspondem!'];
            this.inputConfirmPassword = 'input is-danger';
        } else {
            this.errorMessageConfirmPassword = [];
            this.inputConfirmPassword = 'input is-success';
        }
    }

    //ASSOCIATE
    public validateFormAssociate() {
        this.validateInputFirstName();
        this.validateInputLastName();
        this.validateInputContact();
        this.validateInputCpf();
        this.validateInputEmail();
        this.validateInputCep();
        this.validateInputNumber();

    }

    //ASSOCIATE
    public allIputsValidsAssociate(): boolean {
        if (this.inputFirstName !== 'input is-danger' && this.inputLastName !== 'input is-danger' && this.inputContact !== 'input is-danger' && this.inputCpf !== 'input is-danger' && this.inputEmail !== 'input is-danger' && this.inputCep !== 'input is-danger' && this.inputNumber !== 'input is-danger') {
            return true;
        } else {
            return false;
        }
    }

    public closeNotification() {
        this.notificationSave = false;
    }
}
</script>
  
<style lang="scss" scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    height: 100vh;
    background-color: #002D4C;

    #arrow {
        width: 40px;
        height: 40px;
        color: white;
        cursor: pointer;
        padding: 10px 0;
    }

    .section_register {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        background-color: #EBE3CC;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .container_form {
        width: 700px;
    }

    .aling_inputs {
        display: flex;
        gap: 30px;
    }

    .label {
        color: #002D4C;
    }

    input {
        border: 2px solid;
    }

    .field {
        width: 700px;
    }

    p {
        font-size: 16px;
        color: red;
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

            .button {
                font-family: 'Poppins';
                font-style: normal;
                font-weight: 400;
                font-size: 1.1em;
                width: 200px;
            }

            .button:hover {
                transform: scale(1.05);
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }

            #cadastrar {
                color: white;
                background: #48C88F;
            }

            #button-back {
                color: white;
            }

            #button-back-previous-pag {
                color: white;
            }

            #button-update-password {
                color: white;
                background-color: #F64367;
            }
        }
    }
}

@media(max-width: 710px) {
    .container_form {
        max-width: 500px;
    }

    .field {
        max-width: 500px;
    }

    .aling_buttons {
        max-width: 500px;
    }
}

@media(max-width: 525px) {
    .container_form {
        max-width: 400px;
    }

    .field {
        max-width: 400px;
    }

    .aling_buttons {
        max-width: 400px;
    }
}
</style>
  