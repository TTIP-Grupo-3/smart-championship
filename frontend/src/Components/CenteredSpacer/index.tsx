import { Grid } from '@mui/material';
import React, { Children, FC, ReactNode, useEffect, useState } from 'react';
import { useStyles } from './style';

interface CenteredSpacerProps {
  children?: React.ReactNode;
}

const CenteredSpacer: FC<CenteredSpacerProps> = ({ children, ...props }) => {
  const { classes } = useStyles();
  const [childs, setChilds] = useState<Array<ReactNode>>([]);

  useEffect(() => setChilds(Children.toArray(children)), [children]);

  return (
    <Grid {...props} container>
      <Grid className={classes.left}>{childs[0]}</Grid>
      <Grid className={classes.center}>{childs[1]}</Grid>
      <Grid className={classes.right}>{childs[2]}</Grid>
    </Grid>
  );
};

export default CenteredSpacer;
