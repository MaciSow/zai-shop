describe('Smoke test', () => {
  it('check button', () => {
    cy.visit('/');

    cy.get('[data-testid="newsletter-submit"]').contains('Sent');
  });

  it('check sending', () => {
    //Given
    cy.visit('/');

    //When
    cy.get('[data-testid="newsletter-input"]').type('email@mai.com');
    cy.get('[data-testid="newsletter-submit"]').click();

    //Then
    cy.get('[data-testid="newsletter-success"]');
  });
});
