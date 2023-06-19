<template>
    <section>
        <main>
            <div class="control">
                <h1 class="title">Editar Serviço</h1>
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
                    <input v-model="task.cost" class="input" type="input" placeholder="Ex: 100.00">
                    <span class="icon is-small is-left">
                        <i class="fa fa-money-bill"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Quantidade que será doada por mês</label>
                <p class="control has-icons-left">
                    <input v-model="task.monthlyAmount" class="input" type="input" placeholder="Ex: 10">
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

            <div class="field is-grouped">
                <div class="control">
                    <router-link to="/provider"><button class="button is-link is-light">Voltar</button></router-link>
                </div>
                <div class="control">
                    <button @click="onClickUpdate()" class="button is-primary is-focused">Atualizar</button>
                </div>
            </div>
        </main>
    </section>
</template>

<script lang="ts">
import { TaskClient } from '@/client/Task.client';
import { Task } from '@/model/Task';
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class EditServiceView extends Vue {

    private taskClient: TaskClient = new TaskClient()

    public task: Task = new Task()

    public taskList: Task[] = []

    private id = Number(this.$route.params.id);

    public mounted(): void {
        this.getTask()
    }

    private getTask(): void {
        this.taskClient.findById(this.id).then(
            success => {
                this.task = success
            },
            error => console.log(error)
        )
    }

    public onClickUpdate(): void {
        this.taskClient.save(this.task).then(
            success => {
                console.log('Serviço atualizado com sucesso!')
                this.task = new Task()
            },
            error => {
                console.log(error)
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