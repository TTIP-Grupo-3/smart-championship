import 'cypress-real-events/support'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@cypress/code-coverage/support'
import './commands'
import '../../src/test/i18n'

Cypress.on('uncaught:exception', (err) => {
  cy.log(`Uncaught Exception: ${JSON.stringify(err)}`)

  return false
})

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
})
