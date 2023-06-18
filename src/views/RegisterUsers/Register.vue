<template>
    <main>
        <section class="section_register">
            <div class="container_form">
                <div class="field">
                    <label class="label">Tipo do perfil</label>
                    <div class="control">
                        <div class="select">
                            <select @change="changeProfileType" id="selectProfileType">
                                <option :value="profile.id" v-for="profile in profileTypeSelectList" :key="profile.id">
                                    {{ profile.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <div v-if="select === '1'">
                    <article v-if="notificationSave" class="message is-success">
                        <div class="message-header">
                            <p>Success</p>
                            <button @click="closeNotification" class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">
                            Seu cadastro foi enviado para análise, você poderá acessar o sistema assim que for aprovado.
                            Aguarde uma notificação em seu Email.
                        </div>
                    </article>

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
                                <input @blur="validateInputContact" v-model="associate.contact" :class="`${inputContact}`"
                                    type="text" placeholder="Exemplo: 45 9 0000-0000">
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
                                <input @blur="validateInputCpf" v-model="associate.cpf" :class="`${inputCpf}`" type="text"
                                    placeholder="Exemplo: 000.000.000-00">
                                <p v-if="errorMessageCpf">
                                <ul>
                                    <li v-for="error in errorMessageCpf" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input @blur="validateInputEmail" v-model="associate.user.login" :class="`${inputEmail}`"
                                    type="text" placeholder="Exemplo: exemplo@gmail.com">
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

                        <div class="field">
                            <label class="label">Senha</label>
                            <div class="control has-icons-left">
                                <input @blur="validateInputPassword" v-model="associate.user.password"
                                    :class="`${inputPassword}`" type="password" placeholder="Mín. 5 dig e Máx. 10 dig">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                                <p v-if="errorMessagePassword">
                                <ul>
                                    <li v-for="error in errorMessagePassword" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
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

                <div v-if="select === '2'">
                    <article v-if="notificationSaveProvider" class="message is-success">
                        <div class="message-header">
                            <p>Success</p>
                            <button @click="closeNotificationProvider" class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">
                            Seu cadastro foi enviado para análise, você poderá acessar o sistema assim que for aprovado.
                            Aguarde uma notificação em seu Email.
                        </div>
                    </article>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Nome fantasia</label>
                            <div class="control">
                                <input v-model="provider.fantasyName" @blur="validateInputNameFantasy"
                                    :class="`${inputNameFantasy}`" type="text" placeholder="Nome fantasia">
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
                                    :class="`${inputNameBusiness}`" type="text" placeholder="Nome empresarial">
                                <p v-if="errorMessageNameBusiness">
                                <ul>
                                    <li v-for="error in errorMessageNameBusiness" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Contato</label>
                            <div class="control">
                                <input v-model="provider.contact" @blur="validateInputContactProvider"
                                    :class="`${inputContactProvider}`" type="text" placeholder="Exemplo: (45) 9 0000-0000">
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
                                <input v-model="provider.cnpj" @blur="validateInputCpnjProvider"
                                    :class="`${inputCnpjProvider}`" type="text" placeholder="Exemplo: 00.000.000/0001-00">
                                <p v-if="errorMessageCnpjProvider">
                                <ul>
                                    <li v-for="error in errorMessageCnpjProvider" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input v-model="provider.user.login" @blur="validateInputEmailProvider"
                                    :class="`${inputEmailProvider}`" type="text" placeholder="Exemplo: exemplo@gmail.com">
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
                                <input v-model="provider.user.password" @blur="validateInputPasswordProvider"
                                    :class="`${inputPasswordProvider}`" type="password"
                                    placeholder="Mín. 5 dig e Máx. 10 dig">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                                <p v-if="errorMessagePasswordProvider">
                                <ul>
                                    <li v-for="error in errorMessagePasswordProvider" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Cep</label>
                            <div class="control">
                                <input v-model="provider.address.cep" @blur="validateInputCepProvider"
                                    :class="`${inputCepProvider}`" type="number" placeholder="Exemplo: 01001-000">
                                <p v-if="errorMessageCepProvider">
                                <ul>
                                    <li v-for="error in errorMessageCepProvider" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Bairro</label>
                            <div class="control">
                                <input v-model="provider.address.neighborhood" class="input" disabled type="text"
                                    placeholder="Bairro">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Rua</label>
                            <div class="control">
                                <input v-model="provider.address.road" class="input" disabled type="text" placeholder="Rua">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Número</label>
                            <div class="control">
                                <input v-model="provider.address.houseNumber" @blur="validateInputNumberProvider"
                                    :class="`${inputNumberProvider}`" type="number" placeholder="Número">
                                <p v-if="errorMessageNumberProvider">
                                <ul>
                                    <li v-for="error in errorMessageNumberProvider" :key="error">{{ error }}</li>
                                </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="select === '3'">
                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Primeiro nome</label>
                            <div class="control">
                                <input v-model="caregiver.firstName" class="input" type="text" placeholder="Primeiro nome">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Sobrenome</label>
                            <div class="control">
                                <input v-model="caregiver.lastName" class="input" type="text" placeholder="Sobrenome">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Contato</label>
                            <div class="control">
                                <input v-model="caregiver.contact" class="input" type="text"
                                    placeholder="Exemplo: (45) 9 0000-0000">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Espaço físico disponível</label>
                            <div class="control">
                                <input v-model="caregiver.physicalSpace" class="input" type="text"
                                    placeholder="Tamanho do terreno disponível">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Gastos mensais</label>
                            <div class="control">
                                <input v-model="caregiver.spending" class="input" type="text"
                                    placeholder="Média de gastos ao mês">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Capacidade de animais</label>
                            <div class="control">
                                <input v-model="caregiver.capacityAnimals" class="input" type="text"
                                    placeholder="Capacidade máxima de animais">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input v-model="caregiver.user.login" class="input" type="text"
                                    placeholder="Exemplo: exemplo@gmail.com">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Senha</label>
                            <div class="control has-icons-left">
                                <input v-model="caregiver.user.password" class="input" type="password"
                                    placeholder="Mín. 5 dig e Máx. 10 dig">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Cep</label>
                            <div class="control">
                                <input v-model="caregiver.address.cep" class="input" type="text"
                                    placeholder="Exemplo: 01001-000">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Bairro</label>
                            <div class="control">
                                <input v-model="caregiver.address.neighborhood" class="input" type="text"
                                    placeholder="Bairro">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Rua</label>
                            <div class="control">
                                <input v-model="caregiver.address.road" class="input" type="text" placeholder="Rua">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Número</label>
                            <div class="control">
                                <input v-model="caregiver.address.houseNumber" class="input" type="text"
                                    placeholder="Número">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container_buttons">
                <div class="aling_buttons">
                    <div class="field is-grouped">
                        <div class="control">
                            <router-link to="/"><button class="button is-link is-light">Voltar</button></router-link>
                        </div>

                        <div class="control">
                            <button @click="onClickRegister()" class="button is-success is-focused">Cadastrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
  
<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import axios from 'axios';
import { cnpj, cpf } from 'cpf-cnpj-validator';

import { Associate } from '@/model/Associate';
import { Caregiver } from '@/model/Caregiver';
import { Provider } from '@/model/Provider';
import { ProfileType } from '@/model/ProfileType';
import { Message } from '@/model/Message';

import { AssociateClient } from '@/client/Associate.client';
import { CaregiverClient } from '@/client/Caregiver.client';
import { ProviderClient } from '@/client/Provider.client';

@Component
export default class Register extends Vue {
    private associateClient: AssociateClient = new AssociateClient()
    private caregiverClient: CaregiverClient = new CaregiverClient()
    private providerClient: ProviderClient = new ProviderClient()

    public associateAtributesList: Associate[] = [];
    public caregiverAtributesList: Caregiver[] = [];
    public providerAtributesList: Provider[] = [];

    public associate: Associate = new Associate();
    public caregiver: Caregiver = new Caregiver();
    public provider: Provider = new Provider();
    public notificacao: Message = new Message();

    public select: string = '1';

    public notificationSave: boolean = false;
    public notificationSaveProvider: boolean = false;

    //ASSOCIATE
    public inputFirstName: string = 'input';
    public inputLastName: string = 'input';
    public inputContact: string = 'input';
    public inputCpf: string = 'input';
    public inputEmail: string = 'input';
    public inputPassword: string = 'input';
    public inputCep: string = 'input';
    public inputNumber: string = 'input';

    //ASSOCIATE
    public errorMessageFirstName: string[] = [];
    public errorMessageLastName: string[] = [];
    public errorMessageContact: string[] = [];
    public errorMessageCpf: string[] = [];
    public errorMessageEmail: string[] = [];
    public errorMessagePassword: string[] = [];
    public errorMessageCep: string[] = [];
    public errorMessageNumber: string[] = [];


    //PROVIDER
    public inputNameFantasy: string = 'input';
    public inputNameBusiness: string = 'input';
    public inputContactProvider: string = 'input';
    public inputCnpjProvider: string = 'input';
    public inputEmailProvider: string = 'input';
    public inputPasswordProvider: string = 'input';
    public inputCepProvider: string = 'input';
    public inputNumberProvider: string = 'input';

    //PROVIDER
    public errorMessageNameFantasy: string[] = [];
    public errorMessageNameBusiness: string[] = [];
    public errorMessageContactProvider: string[] = [];
    public errorMessageCnpjProvider: string[] = [];
    public errorMessageEmailProvider: string[] = [];
    public errorMessagePasswordProvider: string[] = [];
    public errorMessageCepProvider: string[] = [];
    public errorMessageNumberProvider: string[] = [];

    public changeProfileType(): void {
        const selectProfileType = (<HTMLSelectElement>document.getElementById('selectProfileType')).value;
        this.select = selectProfileType;
    }

    public profileTypeSelectList: ProfileType[] = [
        { id: 1, name: "Associado(a)" },
        { id: 2, name: "Fornecedor(a)" },
        { id: 3, name: "Protetor(a)" },
    ];

    //ASSOCIATE
    public resetInputsAssociate() {
        this.inputFirstName = 'input';
        this.inputLastName = 'input';
        this.inputContact = 'input';
        this.inputCpf = 'input';
        this.inputEmail = 'input';
        this.inputPassword = 'input';
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
        const phoneNumberRegex = /^\d{2}\s\d\s\d{4}-\d{4}$/;
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
            this.errorMessageContact = ['Siga o seguinte formato: "45 9 0000-0000"!'];
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
    public validateInputPassword() {
        if (!this.associate.user.password) {
            this.errorMessagePassword = ['O campo "Senha" é obrigatório!'];
            this.inputPassword = 'input is-danger';
        } else if (this.associate.user.password.length <= 4) {
            this.errorMessagePassword = ['O campo "Senha" deve ter no mínimo 5 caracteres!'];
            this.inputPassword = 'input is-danger';
        } else if (this.associate.user.password.length >= 11) {
            this.errorMessagePassword = ['O campo "Senha" deve ter no máximo 10 caracteres!'];
            this.inputPassword = 'input is-danger';
        } else {
            this.errorMessagePassword = [];
            this.inputPassword = 'input is-success';
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

    //ASSOCIATE
    public validateFormAssociate() {
        if (this.select === '1') {
            this.validateInputFirstName();
            this.validateInputLastName();
            this.validateInputContact();
            this.validateInputCpf();
            this.validateInputEmail();
            this.validateInputPassword();
            this.validateInputCep();
            this.validateInputNumber();
        }
    }

    //ASSOCIATE
    public allIputsValidsAssociate(): boolean {
        if (this.inputFirstName !== 'input is-danger' && this.inputLastName !== 'input is-danger' && this.inputContact !== 'input is-danger' && this.inputCpf !== 'input is-danger' && this.inputEmail !== 'input is-danger' && this.inputPassword !== 'input is-danger' && this.inputCep !== 'input is-danger' && this.inputNumber !== 'input is-danger') {
            return true;
        } else {
            return false;
        }
    }

    /////////////////PROVIDER////////////////////

    //PROVIDER
    public resetInputsProvider() {
        this.inputNameFantasy = 'input';
        this.inputNameBusiness = 'input';
        this.inputContactProvider = 'input';
        this.inputCnpjProvider = 'input';
        this.inputEmailProvider = 'input';
        this.inputPasswordProvider = 'input';
        this.inputCepProvider = 'input';
        this.inputNumberProvider = 'input';
    }

    //PROVIDER
    public validateInputNameFantasy() {
        if (!this.provider.fantasyName) {
            this.errorMessageNameFantasy = ['O campo "Nome fantasia" é obrigatório!'];
            this.inputNameFantasy = 'input is-danger';
        }
        else if (this.provider.fantasyName.length > 15) {
            this.errorMessageNameFantasy = ['O campo "Nome fantasia" deve ter no máximo 15 caracteres!'];
            this.inputNameFantasy = 'input is-danger';
        }
        else if (this.provider.fantasyName.length < 3) {
            this.errorMessageNameFantasy = ['O campo "Nome fantasia" deve ter no mínimo 3 caracteres!'];
            this.inputNameFantasy = 'input is-danger';
        } else {
            this.errorMessageNameFantasy = [];
            this.inputNameFantasy = 'input is-success';
        }
    }

    //PROVIDER
    public validateInputNameBusiness() {
        if (!this.provider.businessName) {
            this.errorMessageNameBusiness = ['O campo "Nome empresarial" é obrigatório!'];
            this.inputNameBusiness = 'input is-danger';
        }
        else if (this.provider.businessName.length > 20) {
            this.errorMessageNameBusiness = ['O campo "Nome empresarial" deve ter no máximo 20 caracteres!'];
            this.inputNameBusiness = 'input is-danger';
        }
        else if (this.provider.businessName.length < 5) {
            this.errorMessageNameBusiness = ['O campo "Nome empresarial" deve ter no mínimo 5 caracteres!'];
            this.inputNameBusiness = 'input is-danger';
        } else {
            this.errorMessageNameBusiness = [];
            this.inputNameBusiness = 'input is-success';
        }
    }

    //PROVIDER
    public validatePhoneNumberProvider(phoneNumber: string): boolean {
        const phoneNumberRegex = /^\d{2}\s\d\s\d{4}-\d{4}$/;
        return phoneNumberRegex.test(this.provider.contact);
    };

    //PROVIDER
    public validateInputContactProvider() {
        if (this.validatePhoneNumberProvider(this.provider.contact)) {
            this.errorMessageContactProvider = [];
            this.inputContactProvider = 'input is-success';
        } else if (!this.provider.contact) {
            this.errorMessageContactProvider = ['O campo "Contato" é obrigatório!'];
            this.inputContactProvider = 'input is-danger';
        } else {
            this.errorMessageContactProvider = ['Siga o seguinte formato: "45 9 0000-0000"!'];
            this.inputContactProvider = 'input is-danger';
        }
    }

    //PROVIDER
    public validateInputCpnjProvider() {
        if (!this.provider.cnpj) {
            this.errorMessageCnpjProvider = ['O campo "CNPJ" é obrigatório!'];
            this.inputCnpjProvider = 'input is-danger';
        } else if (cnpj.isValid(this.provider.cnpj)) {
            this.errorMessageCnpjProvider = [];
            this.inputCnpjProvider = 'input is-success';
        } else {
            this.errorMessageCnpjProvider = ['Insira um CNPJ válido!'];
            this.inputCnpjProvider = 'input is-danger';
        }
    }

    //PROVIDER
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

    //PROVIDER
    public validateInputPasswordProvider() {
        if (!this.provider.user.password) {
            this.errorMessagePasswordProvider = ['O campo "Senha" é obrigatório!'];
            this.inputPasswordProvider = 'input is-danger';
        } else if (this.provider.user.password.length <= 4) {
            this.errorMessagePasswordProvider = ['O campo "Senha" deve ter no mínimo 5 caracteres!'];
            this.inputPasswordProvider = 'input is-danger';
        } else if (this.provider.user.password.length >= 11) {
            this.errorMessagePasswordProvider = ['O campo "Senha" deve ter no máximo 10 caracteres!'];
            this.inputPasswordProvider = 'input is-danger';
        } else {
            this.errorMessagePasswordProvider = [];
            this.inputPasswordProvider = 'input is-success';
        }
    }

    //PROVIDER
    async fetchAddressProvider(): Promise<void> {
        if (this.provider.address.cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${this.provider.address.cep}/json/`);
                const { logradouro, bairro } = response.data;
                if (logradouro == null || bairro == null) {
                    this.errorMessageCepProvider = ['CEP inválido!'];
                    this.inputCepProvider = 'input is-danger';
                }
                this.provider.address.road = logradouro;
                this.provider.address.neighborhood = bairro;
            } catch (error) {
                this.errorMessageCepProvider = ['CEP inválido!'];
                this.inputCepProvider = 'input is-danger';
                this.clearAddressFieldsProvider();
            }
        } else {
            this.errorMessageCepProvider = ['CEP inválido!'];
            this.inputCepProvider = 'input is-danger';
            this.clearAddressFieldsProvider();
        }
    }

    //PROVIDER
    private clearAddressFieldsProvider(): void {
        this.provider.address.road = '';
        this.provider.address.neighborhood = '';
    }

    //PROVIDER
    public validateInputCepProvider(): void {
        if (!this.provider.address.cep) {
            this.errorMessageCepProvider = ['O campo "CEP" é obrigatório!'];
            this.inputCepProvider = 'input is-danger';
            this.clearAddressFieldsProvider();
        } else if (this.provider.address.cep.length !== 8) {
            this.errorMessageCepProvider = ['CEP inválido!'];
            this.inputCepProvider = 'input is-danger';
            this.clearAddressFieldsProvider();
        } else {
            this.fetchAddressProvider();
            this.errorMessageCepProvider = [];
            this.inputCepProvider = 'input is-success';
        }
    }

    //PROVIDER
    public validateInputNumberProvider() {
        if (!this.provider.address.houseNumber) {
            this.errorMessageNumberProvider = ['O campo "Número" é obrigatório!'];
            this.inputNumberProvider = 'input is-danger';
        } else if (this.provider.address.houseNumber > 1000000) {
            this.errorMessageNumberProvider = ['O número inserido é invalido!'];
            this.inputNumberProvider = 'input is-danger';
        } else {
            this.errorMessageNumberProvider = [];
            this.inputNumberProvider = 'input is-success';
        }
    }

    //PROVIDER
    public validateFormProvider() {
        if (this.select === '2') {
            this.validateInputNameFantasy();
            this.validateInputNameBusiness();
            this.validateInputContactProvider();
            this.validateInputCpnjProvider();
            this.validateInputEmailProvider();
            this.validateInputPasswordProvider();
            this.validateInputCepProvider();
            this.validateInputNumberProvider();
        }
    }

    //PROVIDER
    public allIputsValidsProvider(): boolean {
        if (this.inputNameFantasy !== 'input is-danger' && this.inputNameBusiness !== 'input is-danger' && this.inputContactProvider !== 'input is-danger' && this.inputCnpjProvider !== 'input is-danger' && this.inputEmailProvider !== 'input is-danger' && this.inputPasswordProvider !== 'input is-danger' && this.inputCepProvider !== 'input is-danger' && this.inputNumberProvider !== 'input is-danger') {
            return true;
        } else {
            return false;
        }
    }

    //FUNÇÃO DE REGISTRAR
    public onClickRegister(): void {
        if (this.select === '1') {
            this.validateFormAssociate();
            if (this.allIputsValidsAssociate() === true) {
                this.associateClient.save(this.associate).then(
                    success => {
                        console.log('Associado cadastrado com sucesso!!!');
                        this.resetInputsAssociate();
                        this.notificationSave = true;
                        this.associate = new Associate();
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        } else if (this.select === '2') {
            this.validateFormProvider();
            if (this.select === '2') {
                if (this.allIputsValidsProvider() === true) {
                    this.providerClient.save(this.provider).then(
                    success => {
                        console.log('Fornecedor cadastrado com sucesso!!!');
                        this.resetInputsProvider();
                        this.notificationSaveProvider = true;
                        this.provider = new Provider();
                    },
                    error => {
                        console.log(error);
                    }
                )
                }
            }
        } else if (this.select === '3') {
            this.caregiverClient.save(this.caregiver).then(
                success => {
                    console.log('Protetor cadastrado com sucesso!!!');
                    this.caregiver = new Caregiver();
                },
                error => {
                    console.log(error);
                }
            )
        }
    }
    public closeNotification() {
        this.notificationSave = false;
    }

    public closeNotificationProvider() {
        this.notificationSaveProvider = false;
    }
}
</script>
  
<style lang="scss" scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .section_register {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .container_form {
        width: 700px;
    }

    .aling_inputs {
        display: flex;
        gap: 30px;
    }

    .field {
        width: 700px;
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
                width: 200px;
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
  