import { FC } from 'react';
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import useStyles from './style';
import CenteredSpacer from '../CenteredSpacer';
import smartLogo from '../../default_match_icon_local.svg';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { blue, grey } from '@mui/material/colors';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export const Navbar: FC<any> = ({ children, button }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleCloseSession = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLogged = (): boolean => {
    return !!localStorage.getItem('token');
  };

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <CenteredSpacer>
            {button ? (
              <Button
                sx={{ color: grey[200] }}
                onClick={button.action}
                style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}
              >
                <ArrowBackIosNewIcon style={{ height: 16, display: 'flex' }} />
                <Typography style={{ fontSize: 15, fontWeight: 600 }}>{button.text}</Typography>
              </Button>
            ) : (
              <div></div>
            )}
            <Grid container direction="row" alignItems="center" wrap="nowrap">
              <Typography className={classes.titleSmart}>smart</Typography>
              {/* <Typography className={classes.titleDot}>.</Typography> */}
              <img src={smartLogo} width="30px" height="30px" />
              <Typography className={classes.titleChampionship}>championship</Typography>
            </Grid>
            {isLogged() ? (
              <Grid>
                <IconButton onClick={handleCloseSession}>
                  <ExitToAppIcon style={{ color: 'white' }} />
                </IconButton>
              </Grid>
            ) : (
              <Button sx={{ color: grey[400] }} onClick={handleCloseSession}>
                Log in
              </Button>
            )}
          </CenteredSpacer>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Toolbar />
        <Grid className={classes.content}>{children}</Grid>
      </main>
    </Grid>
  );
};
