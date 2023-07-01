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
            cy.get('.is-active > span').should('exist')
        })
    })

})