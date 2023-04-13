/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-undef */
import { ComponentProps, ReactNode } from 'react';
import { Suite, Test } from 'mocha';
import { componentMounter } from '../../test/utils';
import CenteredSpacer from '.';
import { fakeTheme } from '../../test/fake_theme';

const { floor } = Math;

const theme = fakeTheme;

const firstChild = (
  <div
    data-testid="child"
    style={{ width: '10px', height: '10px', backgroundColor: 'red' }}
    data-cy="first"
  />
);
const secondChild = (
  <div
    data-testid="child"
    style={{ width: '20px', height: '10px', backgroundColor: 'red' }}
    data-cy="second"
  />
);
const thirdChild = (
  <div
    data-testid="child"
    style={{ width: '30px', height: '10px', backgroundColor: 'red' }}
    data-cy="third"
  />
);
const forthChild = (
  <div
    data-testid="child"
    style={{ width: '40px', height: '10px', backgroundColor: 'red' }}
    data-cy="forth"
  />
);

const defaultProps: ComponentProps<typeof CenteredSpacer> = {
  children: [firstChild, secondChild, thirdChild] as ReactNode,
};

const { mountComponent } = componentMounter(CenteredSpacer, defaultProps, theme);

describe('CenteredSpacer', () => {
  const getCenteredSpacer = (): Cypress.Chainable<JQuery<HTMLElement>> =>
    cy.get('[data-testid=centeredSpacer]');

  const getPositionGrid = (position: 'left' | 'center' | 'right'): Cypress.Chainable<JQuery<HTMLElement>> =>
    getCenteredSpacer().find(`[data-testid=centeredSpacer-grid][data-cy=${position}]`);

  const itRendersChildIntoGrid = (child: 'first' | 'second' | 'third', grid: 'left' | 'center' | 'right') =>
    it(`renders ${child} child into ${grid} grid`, () => {
      getPositionGrid(grid).find(`[data-testid=child][data-cy=${child}]`).should('exist');
    });

  const centeredSpacerStylesSuite = (): Suite =>
    context('CenteredSpacer styles', () => {
      it('renders with custom style', () => {
        getCenteredSpacer()
          .should('have.css', 'display', 'flex')
          .then(($centeredSpacer) => {
            expect($centeredSpacer.width()).to.be.eq($centeredSpacer.parent().width());
          });
      });

      const itRendersInlineGridWithCustomStyle = (inlinePosition: 'left' | 'right'): void =>
        it(`renders ${inlinePosition} grid with custom style`, () => {
          getPositionGrid(inlinePosition)
            .should('have.css', 'display', 'flex')
            .and('have.css', 'flex-grow', '1')
            .and('have.css', 'align-items', 'center')
            .and('have.css', 'justify-content', inlinePosition === 'left' ? 'flex-start' : 'flex-end')
            .then(($grid) => {
              getPositionGrid('center').then(($centerGrid) => {
                expect(floor($grid.width()!)).to.be.eq(
                  floor(($grid.parent().width()! - $centerGrid.width()!) / 2),
                );
              });
            });
        });

      itRendersInlineGridWithCustomStyle('left');

      it('renders center grid with custom style', () => {
        getPositionGrid('center')
          .should('have.css', 'display', 'flex')
          .and('have.css', 'align-items', 'center');
      });

      itRendersInlineGridWithCustomStyle('right');
    });

  const completedChildsSuite = (): Suite =>
    context('Completed childs', () => {
      itRendersChildIntoGrid('first', 'left');

      itRendersChildIntoGrid('second', 'center');

      itRendersChildIntoGrid('third', 'right');
    });

  context('Three childs', () => {
    beforeEach(() => mountComponent());

    centeredSpacerStylesSuite();

    completedChildsSuite();
  });

  context('Less childs', () => {
    beforeEach(() => mountComponent({ ...defaultProps, children: [firstChild, secondChild] as ReactNode }));

    centeredSpacerStylesSuite();

    itRendersChildIntoGrid('first', 'left');

    itRendersChildIntoGrid('second', 'center');
  });

  context('More childs', () => {
    beforeEach(() =>
      mountComponent({
        ...defaultProps,
        children: [firstChild, secondChild, thirdChild, forthChild] as ReactNode,
      }),
    );

    centeredSpacerStylesSuite();

    completedChildsSuite();

    it('should not renders forth child', () => {
      cy.get('[data-testid=child][data-cy=forth]').should('not.exist');
    });
  });
});
