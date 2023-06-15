import { FC, useEffect, useState } from 'react';
import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import useStyles from './style';
import CenteredSpacer from '../CenteredSpacer';
import smartLogo from '../../default_match_icon_local.svg';
import { grey } from '@mui/material/colors';
import { API_AUTH } from '../../services/Auth';
import MailIcon from '@mui/icons-material/Mail';
import { UserLogout } from '../UserLogout';

export const Navbar: FC<any> = ({ children, button, removebuttonLog, footer = false }) => {
  const { classes } = useStyles();
  const [userData, setUsername] = useState<any>({ username: '', role: '' });

  const isLogged = (): boolean => {
    return !!localStorage.getItem('token');
  };
  useEffect(() => {
    if (isLogged()) {
      API_AUTH.profile().then((r) => {
        setUsername(r.data);
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
            ) : (
              <>
                <UserLogout isLogged={isLogged()} {...{ userData }} />
              </>
            )}
          </CenteredSpacer>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <Toolbar />
        <Grid className={classes.content}>{children}</Grid>
        {footer && (
          <Grid className={classes.footer}>
            <Typography className={classes.contact}>Contacto</Typography>
            <Grid className={classes.containerEmail}>
              <MailIcon style={{ color: 'white' }} />
              <Typography className={classes.email}>admin.championship@gmail.com</Typography>
            </Grid>
          </Grid>
        )}
      </main>
    </Grid>
  );
};
