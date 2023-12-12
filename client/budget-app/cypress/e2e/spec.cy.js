describe('Register and Login', () => {
  it('Registers a new user then navigates to dashboard page', () => {
    cy.visit('http://localhost:3001/login')
    cy.get('.login-button-group .btn-secondary').click()
    cy.get('#registerEmail').type(`test${Math.floor(Math.random() * 1000000)}@test`)
    cy.get('#registerUsername').type('testuser')
    cy.get('#registerPassword1').type('testpassword')
    cy.get('#registerPassword2').type('testpassword')
    cy.get('.register-button-group .btn-primary').click()
    cy.url().should('include', '/dashboard')
    cy.get('.dashboard-container h1').contains("Dashboard")
  })
})