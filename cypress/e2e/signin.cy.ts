describe('Sign in to dashboard', () => {
  it('Should login using the credentials created at sig up', () => {
    cy.visit('/sign-in')
    cy.url().should('contain', '/sign-in')

    cy.get('#username').click().type('testCaseUser')
    cy.get('#password').click().type('testCaseUserCrazyGoodPassword')
    cy.get('.space-y-4 > .inline-flex').click()

    cy.url().should('contain', '/boxes')
  })
})
