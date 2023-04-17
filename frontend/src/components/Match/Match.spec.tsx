import { lighten } from '@mui/material';
import { Match } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;
const cards = { yellow: 0, red: 0 };
const teams = {
  local: { name: 'team-1', goals: 0, cards: cards },
  visiting: { name: 'team-2', goals: 2, cards: cards },
};
const { mountComponent } = componentMounter(Match, teams, theme);

describe('Match', () => {
  beforeEach(() => mountComponent());

  it('component should be rendered', () => {
    cy.get('[data-testid=Match]').should('exist');
  });

  it('border-radius should be 10px', () => {
    cy.get('[data-testid=Match]').should('have.css', 'border-radius', '10px');
  });
  it('padding should be 16px', () => {
    cy.get('[data-testid=Match]').should('have.css', 'padding', '16px');
  });
  it('align-items and justify-content should be center', () => {
    cy.get('[data-testid=Match]')
      .should('have.css', 'justify-content', 'center')
      .and('have.css', 'align-items', 'center');
  });

  it('test flex containter', () => {
    cy.get('[data-testid=Match]')
      .should('have.css', 'display', 'flex')
      .and('have.css', 'flex-direction', 'row')
      .and('have.css', 'flex-wrap', 'nowrap');
  });

  it('box shadows should be shadows[8]', () => {
    cy.get('[data-testid=Match]').should(
      'have.css',
      'box-shadow',
      'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px',
    );
  });
  it('background-color should be #2823c34 with lighten 0.09', () => {
    cy.get('[data-testid=Match]').should('have.css', 'background-color', lighten('#282c34', 0.09));
  });

  it('test props local and visiting with result 0 - 2', () => {
    cy.get('[data-testid=ScoreMatch-score-result]').contains('0 - 2');
  });
});
