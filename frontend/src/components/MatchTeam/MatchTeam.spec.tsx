import { MatchTeam } from '.';
import { fakeTheme } from '../../test/fake_theme';
import { componentMounter, percentaje } from '../../test/utils';
import smartLogoLocal from '../../default_match_icon_local.svg';

const theme = fakeTheme;
const cards = { yellow: 0, red: 0 };
const team = {
  name: 'team-1',
  goals: 0,
  cards: cards,
};
const { mountComponent } = componentMounter(MatchTeam, { team, logo: smartLogoLocal }, theme);

describe('MatchTeam', () => {
  beforeEach(() => {
    cy.get('body').invoke('css', 'background-color', theme.palette.common.black);
    cy.get('body').invoke('css', 'margin', '0px');
    mountComponent();
  });

  it('component should be rendered', () => {
    cy.get('[data-testid=MatchTeam]').should('exist');
  });
  it('align-items and justify-content should be center', () => {
    cy.get('[data-testid=MatchTeam]')
      .should('have.css', 'justify-content', 'center')
      .and('have.css', 'align-items', 'center');
  });

  it('test flex styles', () => {
    cy.get('[data-testid=MatchTeam]')
      .should('have.css', 'display', 'flex')
      .and('have.css', 'flex-direction', 'column');
  });
  it('padding-left and right should be 4%', () => {
    cy.get('[data-testid=MatchTeam]')
      .should('have.css', 'padding-left', percentaje(4, 'Width'))
      .and('have.css', 'padding-right', percentaje(4, 'Width'));
  });

  it('pdding-bottom should be 2%', () => {
    cy.get('[data-testid=MatchTeam]').should('have.css', 'padding-bottom', percentaje(2, 'Height'));
  });
});
