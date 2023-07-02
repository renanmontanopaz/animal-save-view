import axios from "axios";

describe('Administrator Page', () => {

    context('Quando acessar a página de login', () => {


        it('Deve fazer login como administrador', () => {
            cy.viewport("macbook-15")
            cy.visit('http://localhost:3000/login')
            cy.get(':nth-child(1) > .control > .input').type('admin@admin.com')
            cy.get(':nth-child(2) > .control > .input').type('admin')
            cy.get('#button-login').click()
            cy.wait(1000)
        })
    })

    context('Quando acessar a página inicial do administrador',() => {

        beforeEach(() => {
            cy.viewport("macbook-15")
            cy.visit('http://localhost:3000/login')
            cy.get(':nth-child(1) > .control > .input').type('admin@admin.com')
            cy.get(':nth-child(2) > .control > .input').type('admin')
            cy.get('#button-login').click()
            cy.wait(1000)
        })
        it('Deve estar na aba de "Usuários pendentes" ao carregar a página', () => {
            cy.get('.is-active > span').should('exist')
        })
        /*it('Deve aparecer o container "Nenhum usuário pendente!" caso não existe usuários pendentes', () =>{
            cy.get('#notOccurrence').should('exist')
        })*/
        it('Deve aparecer Modal com detalhes do usuário ao clicar em detalhar', () => {
            cy.get('#button-detalhar').click()
        })
    })
})