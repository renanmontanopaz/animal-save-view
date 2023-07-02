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

    context('Quando acessar a página de atualizar Fornecedor', () => {

        it('Deve reenderizar a página atualizarFornecedor corretamente"', () => {
            cy.visit('http://localhost:3000/fornecedor/atualizarFornecedor/2');
            cy.get(':nth-child(1) > :nth-child(2) > .control > .input').should('exist')
            cy.get('.main_form').should('exist')
            cy.get('#title_h1').should('exist')
            cy.get(':nth-child(1) > :nth-child(1) > #label').should('exist')
            cy.get(':nth-child(1) > :nth-child(2) > #label').should('exist')
            cy.get(':nth-child(2) > :nth-child(1) > #label').should('exist')
            cy.get(':nth-child(2) > :nth-child(2) > #label').should('exist')
            cy.get('#email_field > #label').should('exist')
            cy.get(':nth-child(4) > :nth-child(1) > #label').should('exist')
            cy.get(':nth-child(4) > :nth-child(2) > #label').should('exist')
            cy.get(':nth-child(5) > :nth-child(1) > #label').should('exist')
            cy.get(':nth-child(5) > :nth-child(2) > .label').should('exist')

            cy.get(':nth-child(1) > :nth-child(1) > .control > .input').should('exist')
            cy.get(':nth-child(1) > :nth-child(2) > .control > .input').should('exist')
            cy.get(':nth-child(2) > :nth-child(1) > .control > .input').should('exist')
            cy.get(':nth-child(2) > :nth-child(2) > .control > .input').should('exist')
            cy.get('#email_field > .control > .input').should('exist')
            cy.get(':nth-child(4) > :nth-child(1) > .control > .input').should('exist')
            cy.get(':nth-child(4) > :nth-child(2) > .control > .input').should('exist', 'be.disabled')
            cy.get(':nth-child(5) > :nth-child(1) > .control > .input').should('exist', 'be.disabled')
            cy.get(':nth-child(5) > :nth-child(2) > .control > .input').should('exist')

            cy.get('#back_button').should('exist')
            cy.get('#password_button').should('exist')
            cy.get('#save_button').should('exist')

        });

        it('Não deve atualizar as informações do fornecedor dando informações erradas no input"', () => {
            cy.visit('http://localhost:3000/fornecedor/atualizarFornecedor/2');

            cy.get(':nth-child(1) > :nth-child(1) > .control > .input').clear().type('Abc').should('have.value', 'Abc')
            cy.get(':nth-child(1) > :nth-child(2) > .control > .input').clear().type('Ab').should('have.value', 'Ab')
            cy.get(':nth-child(2) > :nth-child(1) > .control > .input').clear().type('123').should('have.value', '123')
            cy.get(':nth-child(2) > :nth-child(2) > .control > .input').clear().type('1212132').should('have.value', '1212132')
            cy.get('#email_field > .control > .input').clear().type('abcde@fghi.com').should('have.value', 'abcde@fghi.com')
            cy.get(':nth-child(4) > :nth-child(1) > .control > .input').clear().type('12345678').should('have.value', '12345678')
            cy.get(':nth-child(4) > :nth-child(2) > .control > .input').should('be.disabled')
            cy.get(':nth-child(5) > :nth-child(1) > .control > .input').should('be.disabled')
            cy.get(':nth-child(5) > :nth-child(2) > .control > .input').clear().type('1234567890').should('have.value', '1234567890')

            cy.get('#save_button').click()

        });

        it('Deve atualizar o input de nome fantasia, nome empresarial, e exibir a mensagem de sucesso"', () => {
            cy.visit('http://localhost:3000/fornecedor/atualizarFornecedor/2');

            cy.get(':nth-child(1) > :nth-child(1) > .control > .input').clear().type('Provider').should('have.value', 'Provider')
            cy.get(':nth-child(1) > :nth-child(2) > .control > .input').clear().type('Provider business').should('have.value', 'Provider business')

            cy.get('#save_button').click()

            cy.get('.notification').should('be.visible')

        });

        it('Deve renderizar a tela de alterar senha ao clicar no botão "Alterar Senha"', () => {
            cy.visit('http://localhost:3000/fornecedor/atualizarFornecedor/2');

            cy.get('#password_button').click()

            cy.get('.section_form').should('exist')
            cy.get('.main_form').should('exist')
            cy.get('#title_h1').should('exist')

            cy.get(':nth-child(1) > .label').should('exist')
            cy.get(':nth-child(1) > .control > .input').should('exist')
            cy.get(':nth-child(2) > .label').should('exist')
            cy.get(':nth-child(2) > .control > .input').should('exist')
            cy.get('#previous_button').should('exist')
            cy.get('#save_button').should('exist')

        });

        it('Deve alterar a senha de "provider" para "Provider" e depois voltar a senha padrão', () => {
            cy.visit('http://localhost:3000/fornecedor/atualizarFornecedor/2');

            cy.get('#password_button').click()
            cy.get(':nth-child(1) > .control > .input').type('Provider')
            cy.get(':nth-child(2) > .control > .input').type('Provider')

            cy.get('#save_button').click()

            cy.get(':nth-child(1) > .control > .input').clear().type('provider')
            cy.get(':nth-child(2) > .control > .input').clear().type('provider')

            cy.get('#save_button').click()

        });

        it('Não deve alterar a senha sendo senhas diferentes e verifica se a mensagem de erro aparece', () => {
            cy.visit('http://localhost:3000/fornecedor/atualizarFornecedor/2');

            cy.get('#password_button').click()
            cy.get(':nth-child(1) > .control > .input').type('Provider')
            cy.get(':nth-child(2) > .control > .input').type('Providerr')

            cy.get('#save_button').click()

            cy.get('li').should('be.visible')

        });

        it('Deve renderizar o formulário de atualizarFornecedor o clicar em "Página anterior"', () => {
            cy.visit('http://localhost:3000/fornecedor/atualizarFornecedor/2');

            cy.get('#password_button').click()

            cy.get('#previous_button').click()

            cy.url().should('include', '/atualizarFornecedor/2')

            cy.get(':nth-child(1) > :nth-child(2) > .control > .input').should('exist')
            cy.get('.main_form').should('exist')
            cy.get('#title_h1').should('exist')
        });

    })

    context('Quando acessar a página de cadastrar serviço', () => {

        it('Deve renderizar a tela de cadastrarServico ao clicar em "Cadastrar serviço"', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('.nav_container > :nth-child(2)').click()

            cy.get('.section_form').should('exist', 'be.visible')
            cy.get('.main_form').should('exist', 'be.visible')
            cy.get('#title_h1').should('exist', 'be.visible')
            cy.get(':nth-child(2) > #label').should('exist', 'be.visible')
            cy.get(':nth-child(2) > .control > .input').should('exist', 'be.visible')
            cy.get(':nth-child(3) > #label').should('exist', 'be.visible')
            cy.get(':nth-child(3) > .control > .input').should('exist', 'be.visible')
            cy.get(':nth-child(4) > #label').should('exist', 'be.visible')
            cy.get(':nth-child(4) > .control > .input').should('exist', 'be.visible')
            cy.get(':nth-child(5) > #label').should('exist', 'be.visible')
            cy.get(':nth-child(5) > .control > .input').should('exist', 'be.visible')
            cy.get('#back_button').should('exist', 'be.visible')
            cy.get('#register_button').should('exist', 'be.visible')

        });

        it('Deve voltar a tela anterior ao clicar no botão de "voltar" ', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('.nav_container > :nth-child(2)').click()

            cy.get('#back_button').click()

            cy.url().should('include', '/fornecedor/2')
            cy.url().should('not.include', '/cadastrarServico')

        });

        it('Não deve cadastrar um serviço preenchendo os campos incorretamente', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('.nav_container > :nth-child(2)').click()

            cy.get(':nth-child(2) > .control > .input').type('Ab')
            cy.get(':nth-child(3) > .control > .input').type('0')
            cy.get(':nth-child(4) > .control > .input').type('100000')
            cy.get(':nth-child(5) > .control > .input').type('Ab')
            cy.get('#register_button').click()

        });

        it('Deve cadastrar um serviço preenchendo os campos corretamente e exibir a mensagem de sucesso', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('.nav_container > :nth-child(2)').click()

            cy.get(':nth-child(2) > .control > .input').type('Ração')
            cy.get(':nth-child(3) > .control > .input').type('100')
            cy.get(':nth-child(4) > .control > .input').type('20')
            cy.get(':nth-child(5) > .control > .input').type('Sacos de ração para os animais')
            cy.get('#register_button').click()

            cy.get('.notification').should('be.visible')

        });

        it('O serviço cadastrado deve estar sendo mostrado na tela do fornecedor', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('tbody > tr > :nth-child(1)').should('be.visible', 'contain', 'Ração')
            cy.get('tbody > tr > :nth-child(2)').should('be.visible', 'contain', '100')
            cy.get('tbody > tr > :nth-child(3)').should('be.visible', 'contain', '20')

            cy.get('#edit_button').should('be.visible')
            cy.get('#delete_button').should('be.visible')
        });
    })

    context('Quando o fornecedor deletar um serviço', () => {

        it('Deve renderizar a modal ao clicar em deletar serviço', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('#delete_button').click()

            cy.get('.modal-wrapper').should('be.visible',)
            cy.get('.modal-container').should('be.visible')
            cy.get('#title_h1_modal').should('be.visible')
            cy.get('.modal-body').should('be.visible')
            cy.get('#title_h2_modal').should('be.visible')
            cy.get('.modal-footer > #edit_button').should('be.visible')
            cy.get('#delete_button_modal').should('be.visible')

        });

        it('Deve voltar a tela de fornecedor ao clicar em "cancelar" na modal', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('#delete_button').click()

            cy.get('.modal-footer > #edit_button').click()

            cy.get('tr > :nth-child(4)').should('exist')
            cy.get('img').should('exist')
            cy.get('.nav_container > :nth-child(1)').should('exist')
            cy.get('.nav_container > :nth-child(2)').should('exist')
            cy.get('#title_h1').should('exist')
            cy.get('tr > :nth-child(1)').should('exist')
            cy.get('tr > :nth-child(2)').should('exist')
            cy.get('tr > :nth-child(3)').should('exist')

        });

        it('Deve deletar um serviço', () => {
            cy.visit('http://localhost:3000/fornecedor/2');

            cy.get('#delete_button').click()

            cy.wait(5200)

            cy.get('#delete_button_modal').click()

            cy.get('tbody > tr > :nth-child(1)').should('not.exist')
            cy.get('tbody > tr > :nth-child(2)').should('not.exist')
            cy.get('tbody > tr > :nth-child(3)').should('not.exist')

            cy.get('#edit_button').should('not.exist')
            cy.get('#delete_button').should('not.exist')

        });
    })
})
