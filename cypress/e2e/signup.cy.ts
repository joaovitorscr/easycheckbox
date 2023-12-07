describe('Sign up page and form', () => {
  it('Should be able to access the page and fill the form to create a new account.', () => {
    cy.visit('/sign-up')
    cy.url().should('include', '/sign-up')
    cy.get('.space-y-4 > :nth-child(1)').click().type('testCaseUser')
    cy.get('.space-y-4 > :nth-child(2)').click().type('testCaseUser@gmail.com')
    cy.get('.space-y-4 > :nth-child(3)')
      .click()
      .type('testCaseUserCrazyGoodPassword')
    cy.get('.space-y-4 > :nth-child(4)')
      .click()
      .type('testCaseUserCrazyGoodPassword')
    cy.get('.space-y-4 > .inline-flex').click()

    cy.url().should('include', '/sign-in')
  })
})
