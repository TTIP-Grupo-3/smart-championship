import { FC } from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import useStyles from './style';
import CenteredSpacer from '../CenteredSpacer';

export const Navbar: FC<any> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <CenteredSpacer>
            <div></div>
            <Typography className={classes.title}>SMART.CHAMPIONSHIP</Typography>
          </CenteredSpacer>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Toolbar />
        {children}
      </main>
    </Grid>
  );
};
