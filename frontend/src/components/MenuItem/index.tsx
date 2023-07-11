import { MenuItem as MuiMenuItem } from '@mui/material';
import { ComponentProps, FC } from 'react';
import { useStyles } from './style';

const MenuItem: FC<ComponentProps<typeof MuiMenuItem>> = (props) => {
  const { className } = props;
  const { classes, cx } = useStyles();
  return <MuiMenuItem data-testid="menuItem" {...props} className={cx(classes.menuitem, className)} />;
};

export default MenuItem;
