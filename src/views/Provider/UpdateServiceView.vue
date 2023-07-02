<template>
    <section class="section_form">
        <main>
            <div class="column is-7">
                <div class="control">
                    <h1 id="title_h1" class="title">Editar Serviço</h1>
                </div>
                <div class="columns" v-if="notificacao.ativo">
                    <div class="column is-12">
                        <div :class="notificacao.classe" v-if="isVisible">
                            <button @click="onClickFecharNotificacao" class="delete"></button>
                            {{ notificacao.mensagem }}
                        </div>
                    </div>
                </div>
                <div class="field">
                    <label id="label" class="label">Nome do serviço</label>
                    <div class="control has-icons-left">
                        <input v-model="task.name" @blur="validateInputName" :class="`${inputName}`" class="input"
                            type="input" placeholder="Ex: Ração">
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
                    <label id="label" class="label">Custo</label>
                    <div class="control has-icons-left">
                        <input v-model="task.cost" @blur="validateInputCost" :class="`${inputCost}`" class="input"
                            type="input" placeholder="Ex: 100.00">
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
                    <label id="label" class="label">Valor mensal</label>
                    <div class="control has-icons-left">
                        <input v-model="task.monthlyAmount" @blur="validadeInputMonthlyAmount"
                            :class="`${inputMonthlyAmount}`" class="input" type="input" placeholder="Ex: 10">
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
                    <label id="label" class="label">Descrição</label>
                    <div class="control has-icons-left">
                        <textarea v-model="task.description" @blur="validateInputDescription" :class="`${inputDescription}`"
                            class="input" placeholder="Descrição"></textarea>
                        <span class="icon is-small is-left">
                            <i class="fa fa-list"></i>
                        </span>
                        <p v-if="errorMessageDescription">
                        <ul>
                            <li v-for="error in errorMessageDescription" :key="error">{{ error }}</li>
                        </ul>
                        </p>
                    </div>
                </div>

                <div class="field">
                    <div class="container_buttons">
                        <div class="control">
                            <button @click="onClickBack()" class="button is-link is-light" id="back_button">Voltar</button>
                        </div>
                        <div class="control">
                            <button @click="onClickUpdate()" class="button is-primary" id="update_button">Atualizar</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </section>
</template>

<script lang="ts" scoped>
import { TaskClient } from '@/client/Task.client';
import { Task } from '@/model/Task';
import { Component, Vue } from 'vue-property-decorator'
import { Message } from '@/model/Message'
import { Provider } from '@/model/Provider'

interface taskInterface {
    id: number
    active: boolean
    register: Date
    name: string
    cost: number
    monthlyAmount: number
    description: string
    provider: {
        id: number
    }
}

@Component
export default class EditServiceView extends Vue {
    isVisible = false;

    private taskClient: TaskClient = new TaskClient()

    public task: Task = new Task()
    public taskList: Task[] = []
    public provider: Provider = new Provider()

    public inputName: string = 'input'
    public inputCost: string = 'input'
    public inputMonthlyAmount: string = 'input'
    public inputDescription: string = 'input'

    public errorMessageName: string[] = []
    public errorMessageCost: string[] = []
    public errorMessageMonthlyAmount: string[] = []
    public errorMessageDescription: string[] = []

    public notificacao: Message = new Message();

    public notificationSave: boolean = false;

    public mounted(): void {
        this.getTask()
    }

    private getTask(): void {
        var id = Number(this.$route.params.id)
        this.taskClient.findById(id).then(
            success => {
                this.task = success
            },
            error => console.log(error)
        )
    }

    public onClickUpdate(): void {
        const getTask: taskInterface = {
            id: this.task?.id,
            active: this.task?.active,
            register: this.task?.register,
            name: this.task?.name,
            cost: this.task?.cost,
            monthlyAmount: this.task?.monthlyAmount,
            description: this.task?.description,
            provider: {
                id: this.task?.provider.id,
            }
        }
        this.validateFormProvider()
        if (this.allInputsValids() === true) {
            this.taskClient.update(getTask).then(
                success => {
                    console.log('Serviço atualizado com sucesso!')
                    this.task = new Task()
                    this.showComponent();
                    this.notificacao = this.notificacao.new(
                        true,
                        "notification is-primary",
                        "Serviço atualizado com sucesso!"
                    );
                },
                error => {
                    console.log(error)
                }
            )
        }
    }

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

    public validateInputDescription() {
        if (!this.task.description) {
            this.errorMessageDescription = ['O campo "Descrição" é obrigatório!']
            this.inputDescription = 'input is-danger'
        }
        else if (this.task.description.length > 100) {
            this.errorMessageDescription = ['O campo "Descrição" deve ter no máximo 100 caracteres!']
            this.inputDescription = 'input is-danger'
        }
        else if (this.task.description.length < 5) {
            this.errorMessageDescription = ['O campo "Descrição" deve ter no mínimo 5 caracteres!']
            this.inputDescription = 'input is-danger'
        } else {
            this.errorMessageDescription = []
            this.inputDescription = 'input is-success'
        }
    }

    public allInputsValids(): boolean {
        if (this.inputName !== 'input is-danger' && this.inputCost !== 'input is-danger'
            && this.inputMonthlyAmount !== 'input is-danger' && this.inputDescription !== 'input is-danger') {
            return true
        } else {
            return false
        }
    }

    public validateFormProvider() {
        this.validateInputName()
        this.validateInputCost()
        this.validadeInputMonthlyAmount()
        this.validateInputDescription()
    }

    public onClickFecharNotificacao(): void {
        this.notificacao = new Message();
    }

    public showComponent(): void {
        this.isVisible = true;

        setTimeout(() => {
            this.isVisible = false;
        }, 4000);
    }

    public onClickBack() {
        this.$router.go(-1);
    }
}
</script>

<style lang="scss" scoped>
@import "~bulma/bulma.sass";
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.section_form {
    min-height: 100vh;
    background-color: #EBE3CC;
    font-family: Poppins;

    #update_button {
        background-color: #48C88F;
        color: #002D4C;
    }

    #back_button {
        background-color: #FBBD08;
        color: #002D4C;
    }

    #title_h1 {
        color: #002D4C;
    }

    #label {
        color: #002D4C;
    }

    main {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        .title {
            padding: 20px 0px 20px 0px;
        }

        textarea {
            resize: none;
            min-width: 300px;
            min-height: 150px;
            max-width: auto;
            max-height: auto;
        }

        .container_buttons {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 30px 0px;
            gap: 0px 30px;

            button {
                width: 100px;
                font-family: Poppins;
                font-weight: 300;
            }
        }
    }
}
</style>