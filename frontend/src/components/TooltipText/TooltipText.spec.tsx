import { createTheme, hexToRgb } from '@mui/material';
import { TooltipText } from '.';
import { componentMounter } from '../../test/utils';

const theme = createTheme({});

const { mountComponent } = componentMounter(TooltipText, { text: 'TooltipRef' }, theme);

describe('TooltipRef', () => {
  beforeEach(() => {
    cy.get('body').invoke('css', 'background-color', theme.palette.common.black);
    mountComponent();
  });

  it('renders with custom style', () => {
    cy.get('[data-testid=TooltipText]').should('have.css', 'max-width', '100px');
  });

  it('should show tooltip mouseover if overflowed', () => {
    mountComponent({
      text: 'TooltipText----------------------------------------------------------------',
    });
    cy.get('[data-testid=TooltipText]').trigger('mouseover');
    cy.get('.MuiTooltip-tooltip').should('exist');
  });

  it("shouldn't show tooltip on mouseover if not overflowed", () => {
    mountComponent({
      text: 'TooltipText',
    });
    cy.get('[data-testid=TooltipText]').trigger('mouseover');
    cy.get('.MuiTooltip-tooltip').should('not.exist');
  });
  it('test typography', () => {
    cy.get('[data-testid=tooltipText-typography]')
      .should('have.css', 'text-overflow', 'ellipsis')
      .and('have.css', 'overflow', 'hidden')
      .and('have.css', 'max-width', '100px')
      .and('have.css', 'flex-grow', '1')
      .and('have.css', 'color', hexToRgb(theme.palette.common.white))
      .and('have.css', 'font-weight', '600')
      .and('have.css', 'font-family', 'sans-serif')
      .and('have.css', 'letter-spacing', '0.18px');
  });
});
