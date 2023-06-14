<template>
    <main>
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
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input v-model="associate.firstName" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Sobrenome</label>
                <div class="control">
                    <input v-model="associate.lastName" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Contato</label>
                <div class="control">
                    <input v-model="associate.contact" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="associate.user.login" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                    <input v-model="associate.user.password" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Cep</label>
                <div class="control">
                    <input v-model="associate.address.cep" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Bairro</label>
                <div class="control">
                    <input v-model="associate.address.neighborhood" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Rua</label>
                <div class="control">
                    <input v-model="associate.address.road" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Número</label>
                <div class="control">
                    <input v-model="associate.address.houseNumber" class="input" type="text" placeholder="Text input">
                </div>
            </div>
        </div>

        <div v-if="select === '2'">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input v-model="provider.firstName" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Sobrenome</label>
                <div class="control">
                    <input v-model="provider.lastName" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Contato</label>
                <div class="control">
                    <input v-model="provider.contact" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="provider.user.login" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                    <input v-model="provider.user.password" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Cep</label>
                <div class="control">
                    <input v-model="provider.address.cep" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Bairro</label>
                <div class="control">
                    <input v-model="provider.address.neighborhood" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Rua</label>
                <div class="control">
                    <input v-model="provider.address.road" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Número</label>
                <div class="control">
                    <input v-model="provider.address.houseNumber" class="input" type="text" placeholder="Text input">
                </div>
            </div>
        </div>

        <div v-if="select === '3'">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input v-model="caregiver.firstName" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Sobrenome</label>
                <div class="control">
                    <input v-model="caregiver.lastName" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Contato</label>
                <div class="control">
                    <input v-model="caregiver.contact" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Espaço físico disponivel</label>
                <div class="control">
                    <input v-model="caregiver.physicalSpace" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Gastos mensais</label>
                <div class="control">
                    <input v-model="caregiver.spending" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Capacidade de animais</label>
                <div class="control">
                    <input v-model="caregiver.capacityAnimals" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                    <input v-model="caregiver.user.login" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Senha</label>
                <div class="control">
                    <input v-model="caregiver.user.password" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Cep</label>
                <div class="control">
                    <input v-model="caregiver.address.cep" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Bairro</label>
                <div class="control">
                    <input v-model="caregiver.address.neighborhood" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Rua</label>
                <div class="control">
                    <input v-model="caregiver.address.road" class="input" type="text" placeholder="Text input">
                </div>
            </div>

            <div class="field">
                <label class="label">Número</label>
                <div class="control">
                    <input v-model="caregiver.address.houseNumber" class="input" type="text" placeholder="Text input">
                </div>
            </div>
        </div>

        <div class="field is-grouped">
            <div class="control">
                <router-link to="/"><button class="button is-link is-light">Voltar</button></router-link>
            </div>
            <div class="control">
                <button @click="onClickRegister()" class="button is-success is-focused">Salvar</button>
            </div>
        </div>

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
                    console.log('Associado cadastrado com sucesso!!!')
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
                    console.log('Associado cadastrado com sucesso!!!')
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
    flex-direction: column;
}
</style>
  