/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="Cypress"/>
import { RouteHandler } from 'cypress/types/net-stubbing';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const apiMock = (pathname: string, response: RouteHandler | undefined): Cypress.Chainable<null> => {
  const base = process.env.REACT_APP_API_SERVER_URL ? process.env.REACT_APP_API_SERVER_URL : '';
  const url = new URL(pathname, base);
  return cy.intercept(url.href, response);
};

Cypress.Commands.add('apiMock', apiMock);

declare global {
  namespace Cypress {
    interface Chainable {
      apiMock: typeof apiMock;
    }
  }
}
