import { FC } from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import useStyles from './style';
import CenteredSpacer from '../CenteredSpacer';
import smartLogo from '../../default_match_icon_local.svg';

export const Navbar: FC<any> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <CenteredSpacer>
            <div></div>
            <Grid container direction="row" alignItems="center" wrap="nowrap">
              <Typography className={classes.titleSmart}>smart</Typography>
              {/* <Typography className={classes.titleDot}>.</Typography> */}
              <img src={smartLogo} width="30px" height="30px" />
              <Typography className={classes.titleChampionship}>championship</Typography>
            </Grid>
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
