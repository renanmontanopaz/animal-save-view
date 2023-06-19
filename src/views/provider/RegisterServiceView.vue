<template>
    <main>
        <section>
            <div class="control">
                <h1 class="title">Cadastro de Produto</h1>
            </div>
            <div class="field">
                <label class="label">Nome do serviço</label>
                <p class="control has-icons-left">
                    <input class="input" type="input" placeholder="Ex: Ração">
                    <span class="icon is-small is-left">
                        <i class="fa fa-bag-shopping"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Custo</label>
                <p class="control has-icons-left">
                    <input class="input" type="number" placeholder="Ex: 100.00">
                    <span class="icon is-small is-left">
                        <i class="fa fa-money-bill"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Quantidade que será doada por mês</label>
                <p class="control has-icons-left">
                    <input class="input" type="number" placeholder="Ex:10">
                    <span class="icon is-small is-left">
                        <i class="fa fa-chart-line"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <label class="label">Descrição</label>
                <p class="control has-icons-left">
                    <textarea class="input" placeholder="Descrição"></textarea>
                    <span class="icon is-small is-left">
                        <i class="fa fa-list"></i>
                    </span>
                </p>
            </div>

            <div class="field">
                <button class="button is-success is-focused" type="submit">Cadastrar</button>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
</script>

<style></style>