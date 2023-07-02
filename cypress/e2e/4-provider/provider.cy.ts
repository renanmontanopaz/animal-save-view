describe('Provider View', () => {
    beforeEach(() => {
        cy.viewport('macbook-15');
        cy.visit('http://localhost:3000/login');
        cy.get('input[type="email"]').type('provider@provider.com');
        cy.get('input[type="password"]').type('provider');
        cy.get('#button-login').click();
        cy.url().should('include', '/fornecedor/2');
        cy.setCookie('providerLoggedIn', 'true');
    });

    context('Quando acessar a página de fornecedor', () => {

        it('Deve exibir a tela do fornecedor corretamente', () => {
            cy.get('tr > :nth-child(4)').should('exist')
            cy.get('img').should('exist')
            cy.get('.nav_container > :nth-child(1)').should('exist')
            cy.get('.nav_container > :nth-child(2)').should('exist')
            cy.get('#title_h1').should('exist')
            cy.get('tr > :nth-child(1)').should('exist')
            cy.get('tr > :nth-child(2)').should('exist')
            cy.get('tr > :nth-child(3)').should('exist')
        });

        it('Deve abrir a tela atualizarFornecedor ao clicar no botão "Meus dados"', () => {
            cy.get('.nav_container > :nth-child(1)').click();
            cy.url().should('include', '/atualizarFornecedor')
        });

        it('Deve voltar para a landing page ao clicar na logo do sistema', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('img').click()

            cy.url().should('include', 'http://localhost:3000/');
            cy.url().should('not.include', '/fornecedor');

        });

    })
})
