<template>
    <main>
        <section>
            <div class="control">
                <h1 class="title">Cadastro de Produto</h1>
            </div>
            <div class="field">
                <label class="label">Nome do serviço</label>
                <p class="control has-icons-left">
                    <input v-model="task.name" class="input" type="input" placeholder="Ex: Ração">
                    <span class="icon is-small is-left">
                        <i class="fa fa-bag-shopping"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Custo</label>
                <p class="control has-icons-left">
                    <input v-model="task.cost" class="input" type="number" placeholder="Ex: 100.00">
                    <span class="icon is-small is-left">
                        <i class="fa fa-money-bill"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Quantidade que será doada por mês</label>
                <p class="control has-icons-left">
                    <input v-model="task.monthlyAmount" class="input" type="number" placeholder="Ex:10">
                    <span class="icon is-small is-left">
                        <i class="fa fa-chart-line"></i>
                    </span>
                </p>
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