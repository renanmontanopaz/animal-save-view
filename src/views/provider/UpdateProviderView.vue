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
                        <input class="input" type="number" placeholder="Ex: (45) 9 0000-0000">
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label">CNPJ</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Ex: 00.000.000/0001-00">
                </div>
            </div>

            <div class="align_inputs">
                <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                        <input class="input" type="text" placeholder="Ex: exemplo@gmail.com">
                        <span class="icon is-small is-left">
                            <i class="fas fa-user"></i>
                        </span>
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