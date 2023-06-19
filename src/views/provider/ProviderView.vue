<template>
    <div class="columns is-fullwidth">
        <h1 class="title">Lista de Serviços</h1>

        <table class="table is-bordered">
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th class="serviceField"> servico</th>

                    <th>
                        <button class="button is-warning is-focused">Editar</button>
                        <button class="button is-danger is-focused">Apagar</button>
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { TaskClient } from '@/client/Task.client';
import { Task } from '@/model/Task';
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ProviderView extends Vue {

    private taskClient: TaskClient = new TaskClient
    public taskList: Task[] = []
    public task: Task = new Task();

    public mounted(): void {
        this.listarTasks()
        this.onClickDelete()
    }

    private listarTasks(): void {
        this.taskClient.listAll().then(
            success => {
                console.log('Listagem de serviços concluída');
            },
            error => console.log(error)
        )
    }

    public onClickDelete(): void {
        this.taskClient.disable(this.task.id).then(
            success => {
                console.log('Serviço deletado com sucesso!')
                this.task = new Task()
            },
            error => {
                console.log(error)
            }
        )
    }

    public onClickEdit(id: number) {
        router.push({ path: `/update/${id}` })
    }

}
</script>

<style lang="scss" scoped>
.columns {
    h1 {
        font-size: 36px;
        color: black;
    }

    table {
        width: 70%;
    }

    .serviceField {
        width: 79%;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
}
</style>