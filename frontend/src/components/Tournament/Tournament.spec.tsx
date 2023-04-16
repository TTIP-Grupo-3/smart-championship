import { Tournament } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;
const round = 0;
const cards = { yellow: 2, red: 3 };
const match = {
  id: 1,
  local: { name: 'team1', goals: 2, cards: cards },
  visiting: { name: 'team2', goals: 2, cards: cards },
};
const dataSet: any = { matches: [match, match], next: { matches: [match], next: null } };
const { mountComponent } = componentMounter(Tournament, { dataSet, round }, theme);

describe('Tournament', () => {
  beforeEach(() => mountComponent());

  it('component should be rendered', () => {
    cy.get('[data-testid=Tournament-round]').should('exist');
  });
  it('tournament round test display and flex', () => {
    cy.get('[data-testid=tournament-round]')
      .should('have.css', 'display', 'flex')
      .and('have.css', 'flex-direction', 'column')
      .and('have.css', 'flex-grow', '1');
  });
});
