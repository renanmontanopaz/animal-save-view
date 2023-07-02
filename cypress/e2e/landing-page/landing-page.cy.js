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
});