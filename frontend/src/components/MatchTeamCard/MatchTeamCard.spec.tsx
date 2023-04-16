import { MatchTeamCard } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;

const { mountComponent } = componentMounter(MatchTeamCard, { amount: 0, color: 'red' }, theme);

describe('MatchTeamCard', () => {
  beforeEach(() => mountComponent());

  it('component should be rendered', () => {
    cy.get('[data-testid=MatchTeamCard]').should('exist');
  });

  it('display is none when amount lt 1', () => {
    cy.get('[data-testid=MatchTeamCard]').should('have.css', 'display', 'none');
  });
  it('display is none when amount gt 0', () => {
    mountComponent({ amount: 1, color: 'red' });
    cy.get('[data-testid=MatchTeamCard]').should('have.css', 'display', 'flex');
  });
  it('test style card', () => {
    cy.get('[data-testid=MatchTeamCard]')
      .should('have.css', 'height', '16px')
      .and('have.css', 'width', '12px')
      .and('have.css', 'border-radius', '2px')
      .and('have.css', 'margin-inline', '1px');
  });

  it('test style color card', () => {
    cy.get('[data-testid=MatchTeamCard]')
      .should('have.css', 'height', '16px')
      .and('have.css', 'background-color', 'rgb(255, 0, 0)');
  });
});
