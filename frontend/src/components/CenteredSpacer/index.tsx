import { Grid } from '@mui/material';
import { Children, FC, ReactNode, useEffect, useState } from 'react';
import { useStyles } from './style';

const CenteredSpacer: FC<{ children: ReactNode }> = ({ children, ...props }) => {
  const { classes } = useStyles();
  const [childs, setChilds] = useState<Array<ReactNode>>([]);

  useEffect(() => setChilds(Children.toArray(children)), [children]);

  return (
    <Grid data-testid="centeredSpacer" {...props} container>
      <Grid data-testid="centeredSpacer-grid" data-cy="left" className={classes.left}>
        {childs[0]}
      </Grid>
      <Grid data-testid="centeredSpacer-grid" data-cy="center" className={classes.center}>
        {childs[1]}
      </Grid>
      <Grid data-testid="centeredSpacer-grid" data-cy="right" className={classes.right}>
        {childs[2]}
      </Grid>
    </Grid>
  );
};

export default CenteredSpacer;
