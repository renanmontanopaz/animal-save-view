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
                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Nome</label>
                            <div class="control">
                                <input v-model="associate.firstName" class="input" type="text" placeholder="Primeiro nome">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Sobrenome</label>
                            <div class="control">
                                <input v-model="associate.lastName" class="input" type="text" placeholder="Sobrenome">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Contato</label>
                            <div class="control">
                                <input v-model="associate.contact" class="input" type="text"
                                    placeholder="Exemplo: (45) 9 0000-0000">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">CPF</label>
                            <div class="control">
                                <input v-model="associate.cpf" class="input" type="text"
                                    placeholder="Exemplo: 000.000.000-00">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input v-model="associate.user.login" class="input" type="text"
                                    placeholder="Exemplo: exemplo@gmail.com">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Senha</label>
                            <div class="control">
                                <input v-model="associate.user.password" class="input" type="password"
                                    placeholder="Mínimo 5 dig e máximo de 8 dig">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Cep</label>
                            <div class="control">
                                <input v-model="associate.address.cep" class="input" type="text"
                                    placeholder="Exemplo: 01001-000">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Bairro</label>
                            <div class="control">
                                <input v-model="associate.address.neighborhood" class="input" type="text"
                                    placeholder="Bairro">
                            </div>
                        </div>
                    </div>

                    <div class="aling_inputs">
                        <div class="field">
                            <label class="label">Rua</label>
                            <div class="control">
                                <input v-model="associate.address.road" class="input" type="text" placeholder="Rua">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Número</label>
                            <div class="control">
                                <input v-model="associate.address.houseNumber" class="input" type="text"
                                    placeholder="Número">
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
                            <div class="control">
                                <input v-model="provider.user.login" class="input" type="text"
                                    placeholder="Exemplo: exemplo@gmail.com">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Senha</label>
                            <div class="control">
                                <input v-model="provider.user.password" class="input" type="password"
                                    placeholder="Mínimo 5 dig e máximo de 8 dig">
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
                            <label class="label">Nome</label>
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
                            <div class="control">
                                <input v-model="caregiver.user.login" class="input" type="text"
                                    placeholder="Exemplo: exemplo@gmail.com">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Senha</label>
                            <div class="control">
                                <input v-model="caregiver.user.password" class="input" type="password"
                                    placeholder="Mínimo 5 dig e máximo de 8 dig">
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
import { Associate } from '@/model/Associate';
import { Caregiver } from '@/model/Caregiver';
import { Provider } from '@/model/Provider';
import { Component } from 'vue-property-decorator';
import { ProfileType } from '@/model/ProfileType';
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

    public select: string = '1';

    public onClickRegister(): void {

        if (this.select === '1') {
            this.associateClient.save(this.associate).then(
                success => {
                    console.log('Associado cadastrado com sucesso!!!')
                    this.associate = new Associate()
                },
                error => {
                    console.log(error)
                }
            )
        } else if (this.select === '2') {
            this.providerClient.save(this.provider).then(
                success => {
                    console.log('Fornecedor cadastrado com sucesso!!!')
                    this.provider = new Provider()
                },
                error => {
                    console.log(error)
                }
            )
        }

        else if (this.select === '3') {
            this.caregiverClient.save(this.caregiver).then(
                success => {
                    console.log('Protetor cadastrado com sucesso!!!')
                    this.caregiver = new Caregiver()
                },
                error => {
                    console.log(error)
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

    private listAssociate(): void {
        this.associateClient.listAll().then(
            success => {
                this.associateAtributesList = success
            },
            error => {
                console.log(error)
            }
        )
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
  