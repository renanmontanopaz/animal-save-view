<template>
    <section class="section_form">
        <main>
            <header class="header">
                <section class="section_container">
                    <article class="article_container">
                        <img src="../../assets/Logo.png" alt="Logo do animal-save" />
                    </article>
                    <nav class="nav_container">
                        <h1 class="label" id="nav_h1" @click="onClickEditProfile()">
                            Meus dados
                        </h1>
                        <h1 class="label" id="nav_h1" @click="onClickRegisterService()">
                            Cadastrar serviço
                        </h1>
                    </nav>
                </section>
            </header>
            <div class="columns is-fullwidth">
                <h1 class="title">Lista de Serviços</h1>

                <table class="table is-bordered is-striped">
                    <thead>
                        <tr>
                            <th>Serviço</th>
                            <th>Quantidade mensal</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in taskList">
                            <th class="serviceField"> {{ item.name }}</th>
                            <th class="serviceField"> {{ item.monthlyAmount }}</th>

                            <th>
                                <div class="align_buttons">
                                    <button @click="onClickEdit(item.id)" class="button is-warning is-focused"
                                        id="edit_button">Editar</button>
                                    <button @click="onClickDelete(item.id)" class="button is-danger is-focused"
                                        id="delete_button">Apagar</button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </section>
</template>

<script lang="ts" scoped>
import { TaskClient } from '@/client/Task.client';
import { Provider } from '@/model/Provider';
import { Task } from '@/model/Task';
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator'
import { UserClient } from '@/client/User.client';

@Component
export default class ProviderView extends Vue {

    private taskClient: TaskClient = new TaskClient()
    public taskList: Task[] = []
    public task: Task = new Task()

    public provider: Provider = new Provider()
    private userClient: UserClient = new UserClient()

    public mounted(): void {
        this.getProviderByUser()
    }


    public getProviderByUser(): void {
        var idTask = Number(this.$route.params.id)
        this.userClient.findProviderByIdUser(idTask).then(
            success => {
                this.provider = success;
                console.log(success);
                this.taskClient.findTasksActives().then(
                    success => {
                        this.taskList = success
                        console.log(success)
                        console.log(this.task)
                    },
                    error => {
                        console.log(error)
                    }
                )
            },
            error => console.log(error)
        )
    }

    public onClickDelete(id: number): void {
        this.taskClient.disable(id).then(
            success => {
                console.log(success);
                this.task = new Task()
                this.getProviderByUser()
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
        router.push({ path: `/fornecedor/atualizarServico/${id}` })
    }
}
</script>

<style lang="scss" scoped>
.section_form {
    min-height: 100vh;
    background-color: #EBE3CC;

    #edit_button {
        background-color: #FBBD08;
        color: black;
    }

    #delete_button {
        background-color: #F64367;
        color: black;
    }

    #nav_h1 {
        color: #002D4C;
        cursor: pointer;
    }
}

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
        background-color: #EBE3CC;
    }

    .is-bordered {
        border: 1px solid black;
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