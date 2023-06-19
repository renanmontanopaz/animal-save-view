<template>
    <main>
        <section>
            <div class="collumns is-fullwidth">
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
                            <th class="serviceField">Serviço</th>

                            <th class="buttonsField">
                                <button class="button is-warning is-focused">Editar</button>
                                <button class="button is-danger is-focused">Apagar</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </main>
</template>

<script lang="ts"></script>

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