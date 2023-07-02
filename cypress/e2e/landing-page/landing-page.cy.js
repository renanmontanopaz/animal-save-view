describe('Landing Page', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.visit('http://localhost:3000/');
  });

  it('Deve exibir o Header corretamente', () => {
    cy.get('.navbar').should('exist');
    cy.get('.navbar-item > img').should('exist');
    cy.get('[href="/register-occurences"]').should('exist');
    cy.get('[href="/register"] > button').should('exist');
    cy.get('[href="/login"] > button').should('exist');
  });

  it('Deve navegar corretamente', () => {
    cy.get('a[href="/register-occurences"]').click();
    cy.url().should('include', '/register-occurences');
    cy.get('.butt').click();
    cy.get('[href="/register"] > button').click();
    cy.url().should('include', '/register');
    cy.get('#voltar').click();
    cy.get('[href="/login"] > button').click();
    cy.url().should('include', '/login');
    cy.get('#button-voltar').click();
  });

});