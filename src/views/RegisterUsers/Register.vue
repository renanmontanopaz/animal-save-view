<template>
    <main>
        <div class="field">
            <label class="label">Tipo do perfil</label>
            <div class="control">
                <div class="select">
                    <select @change="changeProfileType" id="selectProfileType">
                        <option :value="item.id" v-for="item in profileTypeSelectList" :key="item.id">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
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

@Component
export default class Register extends Vue {
    public associateAtributesList: Associate[] = [];
    public caregiverAtributesList: Caregiver[] = [];
    public providerAtributesList: Provider[] = [];

    public changeProfileType(): void {
        const selectProfileType = (<HTMLSelectElement>document.getElementById('selectProfileType')).value;
        console.log(selectProfileType);
    }

    public profileTypeSelectList: ProfileType[] = [
        { id: 1, name: "Associado(a)" },
        { id: 2, name: "Fornecedor(a)" },
        { id: 3, name: "Caregiver(a)" },
    ] as ProfileType[];
}
</script>
  

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;
}
</style>