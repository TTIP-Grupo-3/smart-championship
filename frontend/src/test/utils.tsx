/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import { mount, MountReturn } from 'cypress/react';
import { createTheme, Theme, ThemeProvider, TypographyVariant } from '@mui/material/styles';

import {
  createRef,
  FC,
  forwardRef,
  ReactElement,
  ReactNode,
  Ref,
  RefObject,
  useImperativeHandle,
  useState,
} from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

const withTheme = (jsx: ReactNode, theme: Theme): ReactElement => (
  <ThemeProvider {...{ theme }}>{jsx}</ThemeProvider>
);

interface IPropsType {
  [key: string]: any;
}

interface RouteMatch {
  path: string;
  route: string;
}

interface ComponentHistoryContext {
  component: ReactNode;
}

interface FunctionMounter<T extends IPropsType> {
  mountComponent: ComponentMounter<T>;
}

type ComponentMounter<PropsType extends IPropsType> = (
  customProps?: PropsType,
  withoutTheme?: boolean,
  routeMatch?: RouteMatch,
) => Cypress.Chainable<MountReturn>;

const withRoute = (
  jsx: ReactNode,
  routeMatch: RouteMatch = {
    path: '/',
    route: '/',
  },
): { component: ReactNode } => {
  const routes = [{ path: routeMatch.path, element: jsx }];
  const router = createMemoryRouter(routes, { initialEntries: [routeMatch.route], initialIndex: 1 });
  return {
    component: <RouterProvider router={router} />,
  };
};

const getComponent = <PropsType extends IPropsType>(
  Component: FC<PropsType>,
  props: PropsType,
  theme: Theme,
  withoutTheme: boolean,
  routeMatch?: RouteMatch,
): ComponentHistoryContext => {
  let context = withRoute(<Component {...props} />, routeMatch);
  if (!withoutTheme) context = { ...context, component: withTheme(context.component, theme) };
  return context;
};

const componentMounter = <PropsType extends IPropsType>(
  Component: FC<PropsType>,
  defaultProps: React.ComponentProps<typeof Component>,
  theme: Theme = createTheme({}),
  defaultRouteMatch?: RouteMatch,
): FunctionMounter<React.ComponentProps<typeof Component>> => ({
  mountComponent: (
    customProps: any,
    withoutTheme = false,
    routeMatch: any,
  ): Cypress.Chainable<MountReturn> => {
    //if (customProps || routeMatch) unmount();
    const { component } = getComponent(
      Component,
      customProps ?? defaultProps,
      theme,
      withoutTheme,
      routeMatch ?? defaultRouteMatch,
    );
    cy.wrap(history).as('history');
    return mount(component);
  },
});

export type MountReloadableHookResult<T = any> = RefObject<{ getHook: () => T; reload: () => void }>;

const mountReloadableHook = <T extends any>(
  useHook: () => T,
): Cypress.Chainable<MountReloadableHookResult<T>> => {
  const Aux: FC<{ ref: Ref<{ getHook: () => T; reload: () => void }> }> = forwardRef<
    { getHook: () => T; reload: () => void },
    { ref: Ref<{ getHook: () => T; reload: () => void }> }
  >((props, ref) => {
    const [forceReload, setForceReload] = useState(false);
    const hook = useHook();
    useImperativeHandle(
      ref,
      () => ({
        reload: (): void => setForceReload((prev) => !prev),
        getHook: (): T => {
          setForceReload((prev) => !prev);
          return hook;
        },
      }),
      [hook],
    );
    return forceReload ? <></> : <></>;
  });
  const ref = createRef<{ getHook: () => T; reload: () => void }>();
  const { mountComponent } = componentMounter(Aux, { ref });
  return mountComponent().then(() => cy.wrap(ref));
};

const testTypography = (
  chainable: Cypress.Chainable<JQuery<HTMLElement>>,
  typographyOption: TypographyVariant,
  theme: Theme,
): Cypress.Chainable<JQuery<HTMLElement>> => {
  const { fontFamily, fontWeight, fontStyle, fontSize, lineHeight, letterSpacing } = {
    ...(theme.typography[typographyOption] as TypographyStyleOptions),
  };

  return chainable
    .should('have.css', 'font-family', fontFamily)
    .and('have.css', 'font-weight', fontWeight?.toString())
    .and('have.css', 'font-style', fontStyle)
    .and('have.css', 'font-size', fontSize)
    .and('have.css', 'line-height', lineHeight)
    .and('have.css', 'letter-spacing', letterSpacing === '0px' ? '0' : letterSpacing);
};

export { componentMounter, testTypography, mountReloadableHook };
