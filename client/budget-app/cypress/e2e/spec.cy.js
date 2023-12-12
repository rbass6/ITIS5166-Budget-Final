describe('Register and Login', () => {
  beforeEach(() => {
    // Start applitools test
    cy.eyesOpen({
        appName: 'budget-app',
        testName: Cypress.currentTest.title,
    })
  })
  it('Registers a new user then navigates to dashboard page', () => {
    // Navigate to login page
    cy.visit('http://localhost:3001/login')

    // Take a snapshot of login page for visual testing
    cy.eyesCheckWindow({
      tag: "Login page",
      fully: true
    });

    // Fill out registration form and submit
    cy.get('.login-button-group .btn-secondary').click()
    cy.get('#registerEmail').type(`test${Math.floor(Math.random() * 1000000)}@test`)
    cy.get('#registerUsername').type('testuser')
    cy.get('#registerPassword1').type('testpassword')
    cy.get('#registerPassword2').type('testpassword')
    cy.get('.register-button-group .btn-primary').click()

    // Verify dashboard was navigated to and loads properly
    cy.url().should('include', '/dashboard')
    cy.get('.dashboard-container h1').contains("Dashboard")

    // Take a snapshot of dashboard page for visual testing
    cy.eyesCheckWindow({
      tag: "Dashboard page",
      fully: true
    });
  })
  // End applitools test
  afterEach(() => {
    cy.eyesClose()
  })
})