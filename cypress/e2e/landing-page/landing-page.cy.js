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

  it('Deve exibir a tela Home corretamente', () => {
    cy.get('.containerHome').should('exist');
    cy.get('.containerHome > .containerText').should('exist');
    cy.get('.TextNA').should('have.text', 'NA');
    cy.get('.TextNA').should('exist');
    cy.get('.containerDuvidaSpan').should('have.text', ' DUVIDA AJUDE');
    cy.get('.containerDuvidaSpan').should('exist');
    cy.get('.containerDuvidaCerteza > :nth-child(2)').should('have.text', ' CERTEZA ADOTE');
    cy.get('.containerDuvidaCerteza > :nth-child(2)').should('exist');
    cy.get('.TextP > :nth-child(1)').should('have.text', ' Nós da Animal Save somos bons em organização e arrecadação de recursos. ');
    cy.get('.TextP > :nth-child(1)').should('exist');
    cy.get('.TextP > :nth-child(2)').should('have.text', ' Nosso objetivo é prestar ajuda qualificada a quem já ajuda os animais. ');
    cy.get('.TextP > :nth-child(2)').should('exist');
    cy.get('.containerB').should('exist');
    cy.get('.containerB > :nth-child(1)').should('exist');
    cy.get('.containerB > :nth-child(2)').should('exist');
    cy.get('.Rectangle > img').should('exist');
    cy.get('.Pegada1 > img').should('exist');
    cy.get('.dogLeao > img').should('exist');
  });

  it('Deve exibir a tela About Us corretamente', () => {
    cy.get('.containerQuemSomos').should('exist');
    cy.get('.Pegadas2 > img').should('exist');
    cy.get('.containerImage > img').should('exist');
    cy.get('.containerText > p').should('exist');
    cy.get('.containerText > p').should('have.text', 'Juntos pela felicidade dos animais! Seja parte da nossa equipe, lutando por um mundo onde nenhum animal seja deixado para trás.');
  });

  it('Deve exibir a tela Partners corretamente', () => {
    cy.get('.containerParceiros').should('exist');
    cy.get('.containerParceiros > :nth-child(1)').should('exist');
    cy.get(':nth-child(1) > :nth-child(1) > .ImgCachorro').should('exist');
    cy.get(':nth-child(1) > .containerImageParceiros').should('exist');
    cy.get(':nth-child(1) > .containerImageParceiros > .containerImg').should('exist');
    cy.get(':nth-child(2) > :nth-child(1) > .ImgCachorro').should('exist');
    cy.get(':nth-child(2) > .containerImageParceiros').should('exist');
    cy.get(':nth-child(2) > .containerImageParceiros > .containerImg').should('exist');
    cy.get(':nth-child(3) > :nth-child(1) > .ImgCachorro').should('exist');
    cy.get(':nth-child(3) > .containerImageParceiros').should('exist');
    cy.get(':nth-child(3) > .containerImageParceiros > .containerImg').should('exist');
  });

});