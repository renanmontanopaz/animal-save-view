describe('Landing Page', () => {
  beforeEach(() => {
      cy.viewport('macbook-15');
      cy.visit('http://localhost:3000/');
  });

  it('Deve exibir o Header corretamente', () => {
    cy.get('.navbar').should('exist');
    
      
  });
});