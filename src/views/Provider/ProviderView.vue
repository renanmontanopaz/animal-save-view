<template>
    <section class="section_form">
        <main>
            <header class="header">
                <section class="section_container">
                    <article class="article_container">
                        <router-link to="/" id="logo" class="message_image">
                            <img src="../../assets/Logo.png" alt="Logo do animal-save" />
                            <div class="message">Voltar para a tela inicial</div>
                        </router-link>
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
                <h1 id="title_h1" class="title">Lista de Serviços</h1>

                <table class="table" id="table">
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
                                    <button @click="onClickEdit(item.id)" class="button is-warning"
                                        id="edit_button">Editar</button>
                                    <button @click="onClickDelete(item.id)" class="button is-danger"
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
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.section_form {
    font-family: Poppins;
    min-height: 100vh;
    background-color: #EBE3CC;
    font-family: Poppins;

    #logo {
        background-color: #EBE3CC;
        border: none;
        transition: transform 0.2s;
        cursor: pointer;
    }

    #logo:hover {
        transform: scale(1.1);
    }

    #edit_button {
        background-color: #FBBD08;
        color: #002D4C;
    }

    #delete_button {
        background-color: #F64367;
        color: #002D4C;
    }

    #title_h1 {
        color: #002D4C;
    }

    #nav_h1 {
        color: #002D4C;
        cursor: pointer;
        transition: transform 0.2s;
    }

    #nav_h1:hover {
        transform: scale(1.1);
    }

    table,
    th,
    tr {
        border: 1.6px solid #003C6B;
    }

    .message {
        font-family: Poppins;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #002D4C;
        color: #EBE3CC;
        padding: 5px;
        border-radius: 4px;
        opacity: 0;
        transition: opacity 0.2s;
        white-space: nowrap;
        z-index: 1;
    }

    .message_image {
        position: relative;
        display: inline-block;
    }

    .message_image:hover .message {
        opacity: 1;
    }



    tr,
    th {
        background-color: #EBE3CC;
        color: #002D4C;
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

        button {
            font-family: Poppins;
            font-weight: 300;
            transition: transform 0.3s ease;
        }

        button:hover {
            transform: scale(1.1);
            filter: brightness(1.1);
        }
    }
}
</style>