<template>
    <main>
        <section>
            <div class="control">
                <h1 class="title">Cadastro de Produto</h1>
            </div>
            <div class="field">
                <label class="label">Nome do serviço</label>
                <div class="control has-icons-left">
                    <input v-model="task.name" @blur="validateInputName" :class="`${inputName}`" class="input" type="text"
                        placeholder="Ex: Ração">
                    <span class="icon is-small is-left">
                        <i class="fa fa-bag-shopping"></i>
                    </span>
                    <p v-if="errorMessageName">
                    <ul>
                        <li v-for="error in errorMessageName" :key="error">{{ error }}</li>
                    </ul>
                    </p>
                </div>
            </div>

            <div class="field">
                <label class="label">Custo</label>
                <div class="control has-icons-left">
                    <input v-model="task.cost" @blur="validateInputCost" :class="`${inputCost}`" class="input" type="number"
                        placeholder="Ex: 100.00">
                    <span class="icon is-small is-left">
                        <i class="fa fa-money-bill"></i>
                    </span>
                    <p v-if="errorMessageCost">
                    <ul>
                        <li v-for="error in errorMessageCost" :key="error">{{ error }}</li>
                    </ul>
                    </p>
                </div>
            </div>

            <div class="field">
                <label class="label">Valor mensal</label>
                <div class="control has-icons-left">
                    <input v-model="task.monthlyAmount" @blur="validadeInputMonthlyAmount" :class="`${inputMonthlyAmount}`"
                        class="input" type="number" placeholder="Ex:10">
                    <span class="icon is-small is-left">
                        <i class="fa fa-chart-line"></i>
                    </span>
                    <p v-if="errorMessageMonthlyAmount">
                    <ul>
                        <li v-for="error in errorMessageMonthlyAmount" :key="error">{{ error }}</li>
                    </ul>
                    </p>
                </div>
            </div>

            <div class="field">
                <label class="label">Descrição</label>
                <p class="control has-icons-left">
                    <textarea v-model="task.description" class="input" placeholder="Descrição"></textarea>
                    <span class="icon is-small is-left">
                        <i class="fa fa-list"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <button @click="onClickRegister()" class="button is-success is-focused" type="submit">Cadastrar</button>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { TaskClient } from "@/client/Task.client";
import { Task } from "@/model/Task";
import Vue from "vue";
import Component from 'vue-class-component';

@Component
export default class RegisterServiceView extends Vue {
    public task: Task = new Task()

    private taskClient: TaskClient = new TaskClient()

    public inputName: string = 'input'
    public inputCost: string = 'input'
    public inputMonthlyAmount: string = 'input'

    public errorMessageName: string[] = []
    public errorMessageCost: string[] = []
    public errorMessageMonthlyAmount: string[] = []

    public validateInputName() {
        if (!this.task.name) {
            this.errorMessageName = ['O campo "Nome" é obrigatório!']
            this.inputName = 'input is-danger'
        }
        else if (this.task.name.length > 25) {
            this.errorMessageName = ['O campo "Nome" deve ter no máximo 25 caracteres!']
            this.inputName = 'input is-danger'
        }
        else if (this.task.name.length < 3) {
            this.errorMessageName = ['O campo "Nome" deve ter no mínimo 3 caracteres!']
            this.inputName = 'input is-danger'
        } else {
            this.errorMessageName = []
            this.inputName = 'input is-success'
        }
    }

    public validateInputCost() {
        if (!this.task.cost) {
            this.errorMessageCost = ['O campo "Custo" é obrigatório!']
            this.inputCost = 'input is-danger'
        } else if (this.task.cost > 10000) {
            this.errorMessageCost = ['O campo "Custo" tem um limite máximo de 10.000!']
            this.inputCost = 'input is-danger'
        } else {
            this.errorMessageCost = []
            this.inputCost = 'input is-success'
        }
    }

    public validadeInputMonthlyAmount() {
        if (!this.task.monthlyAmount) {
            this.errorMessageMonthlyAmount = ['O campo "Valor mensal" é obrigatório!']
            this.inputMonthlyAmount = 'input is-danger'
        } else if (this.task.monthlyAmount > 10000) {
            this.errorMessageMonthlyAmount = ['O campo "Valor mensal" tem um limite de 10.000!']
            this.inputMonthlyAmount = 'input is-danger'
        } else {
            this.errorMessageMonthlyAmount = []
            this.inputMonthlyAmount = 'input is-success'
        }
    }

    public onClickRegister(): void {

        this.taskClient.save(this.task).then(
            success => {
                console.log('Produto cadastrado com sucesso!')
                this.task = new Task()
            },
            error => {
                console.log(error);
            }
        )
    }
}
</script>

<style lang="scss" scoped>
@import "~bulma/bulma.sass";

textarea {
    resize: none;
    min-width: 300px;
    min-height: 150px;
    max-width: auto;
    max-height: auto;
}
</style>