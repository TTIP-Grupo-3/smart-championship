import { FC, useEffect, useState } from 'react';
import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import useStyles from './style';
import CenteredSpacer from '../CenteredSpacer';
import smartLogo from '../../default_match_icon_local.svg';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import { API_AUTH } from '../../services/Auth';

export const Navbar: FC<any> = ({ children, button, removebuttonLog }) => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  const handleCloseSession = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLogged = (): boolean => {
    return !!localStorage.getItem('token');
  };
  useEffect(() => {
    if (isLogged()) {
      API_AUTH.profile().then((r) => {
        setUsername(r.data.username);
      });
    }
  }, []);

  return (
    <Grid className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <CenteredSpacer>
            {button ? (
              <Button
                sx={{ color: grey[200] }}
                onClick={button.action}
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {button.icon ?? ''}
                <Typography style={{ fontSize: 15, fontWeight: 600, paddingTop: 3 }}>
                  {button.text}
                </Typography>
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
            {removebuttonLog ? (
              <></>
            ) : isLogged() ? (
              <Grid className={classes.gridUser}>
                <Typography className={classes.username}>{username}</Typography>
                <IconButton onClick={handleCloseSession}>
                  <LogoutIcon style={{ color: 'white' }} />
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
