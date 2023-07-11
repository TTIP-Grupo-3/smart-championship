import {
  MenuProps,
  Menu as MuiMenu,
  PaperProps as MuiPaperProps,
  MenuListProps as MuiMenuListProps,
} from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

const Menu: FC<MenuProps> = (props) => {
  const { PaperProps, MenuListProps } = props;
  const { classes, cx } = useStyles();
  return (
    <MuiMenu
      data-testid="menu"
      {...props}
      PaperProps={
        {
          elevation: 8,
          'data-testid': 'menu-paper',
          ...PaperProps,
          className: cx(classes.paper, PaperProps?.className),
        } as MuiPaperProps
      }
      MenuListProps={
        {
          'data-testid': 'menu-list',
          ...MenuListProps,
          className: cx(classes.list, MenuListProps?.className),
        } as MuiMenuListProps
      }
    />
  );
};

export default Menu;
