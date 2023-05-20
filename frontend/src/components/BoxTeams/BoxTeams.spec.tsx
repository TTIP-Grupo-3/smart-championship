import { BoxTeams } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter } from '../../test/utils';

const theme = fakeTheme;
const cards = { yellow: [], red: [] };
const teams = {
  id: 1,
  local: { name: 'team-1', goals: 0, cards: cards, logo: null },
  visiting: { name: 'team-2', goals: 2, cards: cards, logo: null },
};

const { mountComponent } = componentMounter(BoxTeams, teams, theme);

describe('BoxTeams', () => {
  beforeEach(() => mountComponent());

  it('components should be rendered', () => {
    cy.get('[data-testid=BoxTeams]').should('exist');
    cy.get('[data-testid=BoxTeams-grid-teams]').should('exist');
    cy.get('[data-testid=Match]').should('exist');
  });

  it('justifyContent and align should be center in container grid', () => {
    cy.get('[data-testid=BoxTeams]')
      .should('have.css', 'justify-content', 'center')
      .and('have.css', 'align-items', 'center');
  });

  it('padding and margin should be 0 in container grid', () => {
    cy.get('[data-testid=BoxTeams]').should('have.css', 'padding', '0px').and('have.css', 'margin', '0px');
  });

  it('display should be flex in container grid', () => {
    cy.get('[data-testid=BoxTeams]').should('have.css', 'display', 'flex');
  });
  it('height should be 180px in container grid', () => {
    cy.get('[data-testid=BoxTeams]').should('have.css', 'height', '180px');
  });
  it('width should be 100% in container grid', () => {
    const bodyMargin = 16;
    cy.get('[data-testid=BoxTeams]').should(
      'have.css',
      'width',
      `${(window.innerWidth - bodyMargin).toString()}px`,
    );
  });

  it('grid-teams check flex styles', () => {
    cy.get('[data-testid=BoxTeams-grid-teams]')
      .should('have.css', 'flex-grow', '1')
      .and('have.css', 'flex-direction', 'column')
      .and('have.css', 'display', 'flex');
  });

  it('justifyContent and align should be center in grid-teams', () => {
    cy.get('[data-testid=BoxTeams-grid-teams]')
      .should('have.css', 'justify-content', 'center')
      .and('have.css', 'align-items', 'center');
  });

  it('min-width should be 239px in grid-teams', () => {
    cy.get('[data-testid=BoxTeams-grid-teams]').should('have.css', 'min-width', '239px');
  });

  it('border-radius should be 4px in grid-teams', () => {
    cy.get('[data-testid=BoxTeams-grid-teams]').should('have.css', 'border-radius', '4px');
  });
});
