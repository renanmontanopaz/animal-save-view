<template>
    <main>
        <section>
            <div class="control">
                <h1 class="title">Editar perfil</h1>
            </div>
            <div class="align_inputs">
                <div class="field">
                    <label class="label">Nome fantasia</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Nome fantasia">
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label">Nome empresarial</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Nome empresarial">
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Contato</label>
                    <div class="control">
                        <input class="input" type="number" placeholder="Exemplo: (45) 9 0000-0000">
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts"></script>

<style lang="scss" scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .align_inputs {
        display: flex;
        gap: 30px;
    }
}
</style>