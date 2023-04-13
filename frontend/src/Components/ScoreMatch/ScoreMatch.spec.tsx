import { hexToRgb } from '@mui/material/styles';
import { ScoreMatch } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;

const { mountComponent } = componentMounter(ScoreMatch, { localGoals: 1, visitingGoals: 2 }, theme);

describe('ScoreMatch', () => {
  beforeEach(() => mountComponent());

  it('Components should be rendered', () => {
    cy.get('[data-testid=ScoreMatch]').should('exist');
    cy.get('[data-testid=ScoreMatch-score-result]').should('exist');
  });
  it('ScoreMatch align and justify should be center', () => {
    cy.get('[data-testid=ScoreMatch]')
      .should('have.css', 'justify-content', 'center')
      .and('have.css', 'align-items', 'center');
  });

  it('ScoreMatch display and flex-grow should be flex and 1 respectively', () => {
    cy.get('[data-testid=ScoreMatch]')
      .should('have.css', 'display', 'flex')
      .and('have.css', 'flex-grow', '1');
  });

  it('test typography score-result', () => {
    cy.get('[data-testid=ScoreMatch-score-result]')
      .should('have.css', 'font-family', 'sans-serif')
      .and('have.css', 'font-weight', '600')
      .and('have.css', 'font-style', 'normal')
      .and('have.css', 'font-size', '40px')
      .and('have.css', 'line-height', '60px')
      .and('have.css', 'letter-spacing', '0.24px')
      .and('have.css', 'color', hexToRgb(theme.palette.common.white));
  });
});
