<template>
    <main>
        <header>
            <div id="container-title" class="panel is-primary">
                <img id="logo" src="../../assets/Logo.png">
                <div id="dropdown" class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        Minha conta
                    </a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            Meus dados
                        </a>
                        <a id="sair" class="navbar-item">
                            Sair
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <section class="container-content">
            <section class="container-stamp">
                <div class="card-silver">
                    <div class="card-content">
                        <div class="content-stamp">
                            <div class="stamp-header">
                                <h1>Silver</h1>
                            </div>
                            <div class="content-button-price">
                                <button class="button-silver-price">R$ 9,90</button>
                            </div>
                            <div class="stamp-text">
                                <p>• Lorem, ipsum dolor sit amet</p>
                                <p>• Perspiciatis ipsa ipsum suscipit</p>
                            </div>
                            <div class="content-button-sign">
                                <button class="button-sign">Assinar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-gold">
                    <div class="card-content">
                        <div class="content-stamp">
                            GOLD
                        </div>
                    </div>
                </div>
                <div class="card-diamond">
                    <div class="card-content">
                        <div class="content-stamp">
                            DIAMOND
                        </div>
                    </div>
                </div>
            </section>
        </section>
    </main>
</template>
 
<script lang="ts" scoped>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

interface Tab {
    label: string;
    icon: string;
    isActive: boolean;
}

@Component
export default class HomeAssociate extends Vue {


}
</script>
   
<style scoped>
main {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
}

#container-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}

#logo {
    width: 250px;
}

#dropdown {
    font-weight: 600;
    font-size: 20px;
    color: black;
}

.navbar-item {
    font-size: 16px;
}

#sair {
    color: red;
}

#title {
    font-size: 24px;
    background-color: hsl(147, 100%, 41%);
    ;
}

#content {
    width: 100%;
}

.panel-tabs {
    display: flex;
    font-size: 24px;
    font-weight: 500;
}

span {
    color: black;
}

.panel-tabs a.is-active span {
    color: hsl(113, 100%, 41%);
}

.container-content {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container-stamp {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 40px;
}

.card-silver,
.card-gold,
.card-diamond {
    height: 400px;
    width: 300px;
    border-radius: 5px;
}

.card-content {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 20px;
}

.stamp-header {
    display: flex;
    align-items: center;
    justify-content: center;
}

h1 {
    font-size: 32px;
    font-weight: 600;
    color: rgb(92, 92, 92);
}

.content-button-price {
    padding-top: 20px;
    padding-bottom: 30px;
}

.button-silver-price {
    display: flex;
    align-items: center;
    padding: 0 30px;
    width: 300px;
    height: 80px;
    border-radius: 70px 0 0 70px;
    margin-left: -55px;
    border: 4px solid #c9c8c8;

    font-size: 36px;
    font-weight: 600;
    color: rgb(92, 92, 92);
    background: linear-gradient(to right, rgb(255, 255, 255), transparent);
}

.stamp-text {
    display: flex;
    align-items: start;
    flex-direction: column;
    gap: 10px;

    font-size: 16px;
    color: rgb(92, 92, 92);
}

.content-button-sign {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 65px;
}

.button-sign {
    width: 150px;
    height: 50px;
    border-radius: 30px;
    border: none;
    cursor: pointer;

    font-size: 24px;
    font-weight: 600;
    color: rgb(92, 92, 92);
}

.button-sign:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card-silver {
    background-color: #c9c8c8;
}

.card-gold {
    background-color: gold;
}

.card-diamond {
    background-color: darkturquoise;
}
</style>