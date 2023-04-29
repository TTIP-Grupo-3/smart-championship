import 'cypress-real-events/support';
import '@cypress/code-coverage/support';
import './commands';
import '../../src/test/i18n';
import 'cypress-real-events/support';

Cypress.on('uncaught:exception', (err) => {
  cy.log(`Uncaught Exception: ${JSON.stringify(err)}`);

  return false;
});

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});
