import { Bracket } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;

const { mountComponent } = componentMounter(Bracket, {}, theme);

describe('Bracket', () => {
  beforeEach(() => mountComponent());

  it('components should be rendered', () => {
    cy.get('[data-testid=Bracket-connection-round]').should('exist');
    cy.get('[data-testid=Bracket-connection-team]').should('exist');
  });

  it('brackets border size should be 2px solid red in teams', () => {
    cy.get('[data-testid=Bracket-connection-team]')
      .should('have.css', 'border-top-width', '2px')
      .and('have.css', 'border-top-style', 'solid')
      .and('have.css', 'border-top-color', 'rgb(255, 255, 255)');
  });
});
