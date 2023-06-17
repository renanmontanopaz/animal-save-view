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

                    <article v-if="notificationSave === true" class="message is-success">
                        <div class="message-header">
                            <p>Success</p>
                            <button class="delete" aria-label="delete"></button>
                        </div>
                        <div class="message-body">
                            Seu cadastro foi enviado para análise, você poderá acessar o sistema assim que for aprovado.
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
                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Nome fantasia</label>
                            <div class="control">
                                <input v-model="provider.fantasyName" class="input" type="text" placeholder="Nome fantasia">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Nome empresarial</label>
                            <div class="control">
                                <input v-model="provider.businessName" class="input" type="text"
                                    placeholder="Nome empresarial">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Contato</label>
                            <div class="control">
                                <input v-model="provider.contact" class="input" type="text"
                                    placeholder="Exemplo: (45) 9 0000-0000">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">CNPJ</label>
                            <div class="control">
                                <input v-model="provider.cnpj" class="input" type="text"
                                    placeholder="Exemplo: 00.000.000/0001-00">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input v-model="provider.user.login" class="input" type="text"
                                    placeholder="Exemplo: exemplo@gmail.com">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                </span>
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

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Cep</label>
                            <div class="control">
                                <input v-model="provider.address.cep" class="input" type="text"
                                    placeholder="Exemplo: 01001-000">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Bairro</label>
                            <div class="control">
                                <input v-model="provider.address.neighborhood" class="input" type="text"
                                    placeholder="Bairro">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Rua</label>
                            <div class="control">
                                <input v-model="provider.address.road" class="input" type="text" placeholder="Rua">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Número</label>
                            <div class="control">
                                <input v-model="provider.address.houseNumber" class="input" type="text"
                                    placeholder="Número">
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
import { cpf } from 'cpf-cnpj-validator';

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

    public inputFirstName: string = 'input';
    public inputLastName: string = 'input';
    public inputContact: string = 'input';
    public inputCpf: string = 'input';
    public inputEmail: string = 'input';
    public inputPassword: string = 'input';
    public inputCep: string = 'input';
    public inputNumber: string = 'input';

    public errorMessageFirstName: string[] = [];
    public errorMessageLastName: string[] = [];
    public errorMessageContact: string[] = [];
    public errorMessageCpf: string[] = [];
    public errorMessageEmail: string[] = [];
    public errorMessagePassword: string[] = [];
    public errorMessageCep: string[] = [];
    public errorMessageNumber: string[] = [];

    public validatePhoneNumber(phoneNumber: string): boolean {
        const phoneNumberRegex = /^\d{2}\s\d\s\d{4}-\d{4}$/;
        return phoneNumberRegex.test(this.associate.contact);
    };

    public resetInputs() {
        this.inputFirstName = 'input';
        this.inputLastName = 'input';
        this.inputContact = 'input';
        this.inputCpf = 'input';
        this.inputEmail = 'input';
        this.inputPassword = 'input';
        this.inputCep = 'input';
        this.inputNumber = 'input';
    }

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

    private clearAddressFields(): void {
        this.associate.address.road = '';
        this.associate.address.neighborhood = '';
    }

    public validateInputFirstName() {
        if (this.select === '1') {
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
    }

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

    public validateInputCep(): void {
        if (!this.associate.address.cep) {
            this.errorMessageCep = ['O campo "CEP" é obrigatório!'];
            this.inputCep = 'input is-danger';
        } else if (this.associate.address.cep.length !== 8) {
            this.errorMessageCep = ['CEP inválido!'];
            this.inputCep = 'input is-danger';
        } else {
            this.fetchAddress();
            this.errorMessageCep = [];
            this.inputCep = 'input is-success';
        }
    }

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

    public isValidEmail(email: string): boolean {
        // Verifique a validade do email usando uma expressão regular ou outra lógica
        return /\S+@\S+\.\S+/.test(email);
    }

    public onClickRegister(): void {
        this.validateFormAssociate();
        if (this.select === '1') {
            if (this.inputFirstName !== 'input is-danger' && this.inputLastName !== 'input is-danger' && this.inputContact !== 'input is-danger' && this.inputCpf !== 'input is-danger' && this.inputEmail !== 'input is-danger' && this.inputPassword !== 'input is-danger' && this.inputCep !== 'input is-danger' && this.inputNumber !== 'input is-danger') {
                this.associateClient.save(this.associate).then(
                    success => {
                        console.log('Associado cadastrado com sucesso!!!');
                        this.resetInputs();
                        this.notificationSave = true;
                        this.associate = new Associate();
                    },
                    error => {
                        console.log(error);
                    }
                )
            }
        } else if (this.select === '2') {
            this.providerClient.save(this.provider).then(
                success => {
                    console.log('Fornecedor cadastrado com sucesso!!!');
                    this.provider = new Provider();
                },
                error => {
                    console.log(error);
                }
            )
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

    public changeProfileType(): void {
        const selectProfileType = (<HTMLSelectElement>document.getElementById('selectProfileType')).value;
        this.select = selectProfileType;
    }

    public profileTypeSelectList: ProfileType[] = [
        { id: 1, name: "Associado(a)" },
        { id: 2, name: "Fornecedor(a)" },
        { id: 3, name: "Protetor(a)" },
    ];
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
}</style>
  