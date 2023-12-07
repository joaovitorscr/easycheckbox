describe('New List', () => {
  it('Should create a new list', () => {
    cy.visit('/sign-in')
    cy.get('#username').click().type('testCaseUser')
    cy.get('#password').click().type('testCaseUserCrazyGoodPassword')
    cy.get('.space-y-4 > .inline-flex').click()
    cy.url().should('contain', '/boxes')

    cy.get('#listName').click().type('newTestList{enter}')
    cy.contains('newTestList').click()
  })

  it('Create a checkbox', () => {
    cy.visit('/sign-in')
    cy.get('#username').click().type('testCaseUser')
    cy.get('#password').click().type('testCaseUserCrazyGoodPassword')
    cy.get('.space-y-4 > .inline-flex').click()
    cy.url().should('contain', '/boxes')

    cy.get('#listName').click().type('newTestList{enter}')
    cy.contains('newTestList').click()

    cy.get('#contentForm').click().type('content{enter}')
  })

  it('Should be able to delete the list', () => {
    cy.visit('/sign-in')
    cy.get('#username').click().type('testCaseUser')
    cy.get('#password').click().type('testCaseUserCrazyGoodPassword')
    cy.get('.space-y-4 > .inline-flex').click()
    cy.url().should('contain', '/boxes')

    cy.get('.grid > :nth-child(2) > .inline-flex').click()
    cy.get('.grid > :nth-child(1) > .inline-flex').click()
  })
})
