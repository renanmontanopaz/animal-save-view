<template>
    <section>
        <main>
            <header class="header">
                <section class="section_container">
                    <article class="article_container">
                        <img src="../../assets/Logo.png" alt="Logo do animal-save" />
                    </article>
                    <nav class="nav_container">
                        <button class="button is-primary" @click="onClickEditProfile()">
                            <h1>Meus dados</h1>
                        </button>
                        <button class="button is-primary" @click="onClickRegisterService()">
                            Cadastrar serviço
                        </button>
                    </nav>
                </section>
            </header>
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
                        <tr v-for="item in taskList">
                            <th class="serviceField"> {{ item.name }}</th>

                            <th>
                                <div class="align_buttons">
                                    <button @click="onClickEdit(item.id)"
                                        class="button is-warning is-focused">Editar</button>
                                    <button @click="onClickDelete()" class="button is-danger is-focused">Apagar</button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </section>
</template>

<script lang="ts">
import { TaskClient } from '@/client/Task.client';
import { Provider } from '@/model/Provider';
import { Task } from '@/model/Task';
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ProviderView extends Vue {

    private taskClient: TaskClient = new TaskClient
    public taskList: Task[] = []
    public task: Task = new Task()

    public provider: Provider = new Provider()

    public mounted(): void {
        this.listarTasks()
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

    public onClickEditProfile() {
        var id = Number(this.$route.params.id)
        router.push({ path: `/fornecedor/atualizarFornecedor/${id}` })
    }

    public onClickRegisterService() {
        var id = String(this.$route.params.id)
        sessionStorage.setItem('idProvider', id)
        router.push({ path: `/fornecedor/cadastrarServico/${id}` })
    }

    public onClickEdit(id: number) {
        var id = Number(this.$route.params.id)
        router.push({ path: `/fornecedor/atualizarServico/${id}` })
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    width: 100%;
    height: 93px;

    display: flex;
    align-items: center;
    justify-content: center;

    .section_container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 310px;
    }

    .article_container {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav_container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 66px;

        h1 {
            text-decoration: none;
        }
    }
}

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

    .align_buttons {
        display: flex;
        gap: 10px;
    }

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
}
</style>