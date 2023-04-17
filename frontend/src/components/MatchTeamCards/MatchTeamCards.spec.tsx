import { MatchTeamCards } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;
const cards = { yellow: 0, red: 0 };

const { mountComponent } = componentMounter(MatchTeamCards, { cards }, theme);

describe('MatchTeamCards', () => {
  beforeEach(() => mountComponent());

  it('Component should be redered', () => {
    cy.get('[data-testid=MatchTeamCards]').should('exist');
  });
  it('display and flex-direction should be flex and row respectively', () => {
    cy.get('[data-testid=MatchTeamCards]')
      .should('have.css', 'display', 'flex')
      .and('have.css', 'flex-direction', 'row');
  });
});
