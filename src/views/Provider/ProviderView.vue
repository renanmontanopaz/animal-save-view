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
                            <th>Custo</th>
                            <th>Quantidade mensal</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in taskList">
                            <th class="serviceField"> {{ item.name }}</th>
                            <th class="serviceField"> {{ item.cost }}</th>
                            <th class="serviceField"> {{ item.monthlyAmount }}</th>

                            <th>
                                <div class="align_buttons">
                                    <button @click="onClickEdit(item.id)" class="button is-warning"
                                        id="edit_button">Editar</button>
                                    <button @click="onClickShowModal()" class="button is-danger"
                                        id="delete_button">Apagar</button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
                <div v-if="showModal === true" v-for="item in taskList">
                    <transition name="modal">
                        <div class="modal-mask">
                            <div class="modal-wrapper">
                                <div class="modal-container">

                                    <div class="modal-header">
                                        <slot class="modal_title" name="header">
                                            <h1 class="title" id="title_h1_modal">Atenção!</h1>
                                        </slot>
                                    </div>

                                    <div class="modal-body">
                                        <slot class="modal_body" name="body">
                                            <h2 class="title center-text" id="title_h2_modal">
                                                Excluir esse serviço é uma ação sem volta, tem certeza que deseja deletar?
                                            </h2>
                                        </slot>
                                    </div>

                                    <div class="modal-footer">
                                        <slot name="footer">
                                            <button @blur="onCancelModal()" class="button is-link"
                                                @click="showModal = false" id="edit_button">
                                                Cancelar
                                            </button>
                                            <button :disabled="isButtonDisabled" class="button is-danger"
                                                @click="onClickDelete(item.id)" id="delete_button_modal">
                                                {{ isButtonDisabled ? remainingTime : 'Deletar' }}
                                            </button>
                                        </slot>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
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

    public showModal: boolean = false
    public isButtonDisabled: boolean = false
    remainingTime: number = 0
    timer: ReturnType<typeof setInterval> | null = null;
    cancelTimer: boolean = false;

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
                this.showModal = false
                console.log(success);
                this.task = new Task()
                this.getProviderByUser()
            },
            error => {
                console.log(error)
            }
        )
    }

    public onClickShowModal(): void {
        this.showModal = true
        this.isButtonDisabled = true;
        this.remainingTime = 4;
        this.startTimer()

        setTimeout(() => {
            this.isButtonDisabled = false;
        }, 4000);
    }

    startTimer(): void {
        this.cancelTimer = false;
        this.timer = setInterval(() => {
            if (this.cancelTimer) {
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = null;
                this.remainingTime = 0;
                return;
            }

            this.remainingTime--;

            if (this.remainingTime === 0) {
                this.isButtonDisabled = false;
                if (this.timer) {
                    clearInterval(this.timer);
                }
                this.timer = null;
            }
        }, 1000);
    }

    onCancelModal(): void {
        this.showModal = false
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.remainingTime = 0;
        this.isButtonDisabled = false;
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
        color: #FFFFFF;
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


    .modal-mask {
        color: #002D4C;
        font-family: Poppins;

        .modal-container {
            border: 5px solid #002D4C;
            display: flex;
            flex-direction: column;
            width: 500px;
            height: 400px;
            border-radius: 20px;
            background-color: #EBE3CC;
            animation: borderAnimation 1s 2;

            @keyframes borderAnimation {
                0% {
                    border-color: #002D4C;
                }

                50% {
                    border-color: #F64367;
                }

                100% {
                    border-color: #002D4C;
                }
            }

            #title_h1_modal {
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: #002D4C;
                font-size: 24px;
                font-weight: 600;
                margin: 0;
                padding: 20px;
                animation: titleAnimation 1s 2;
            }

            @keyframes titleAnimation {
                0% {
                    font-size: 24px;
                    color: #002D4C;
                }

                50% {
                    font-size: 28px;
                    color: #F64367;
                }

                100% {
                    font-size: 24px;
                    color: #002D4C;
                }
            }

            #title_h2_modal {
                display: flex;
                font-size: 20px;
                align-items: center;
                justify-content: center;
                color: #002D4C;
                font-weight: 300;
            }

            #delete_button_modal {
                width: 120px;
                background-color: #F64367;
                color: #FFFFFF;
            }

            .modal-body {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 60px;
            }

            .center-text {
                text-align: center;
            }

            .modal-footer {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 50px;
            }
        }
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