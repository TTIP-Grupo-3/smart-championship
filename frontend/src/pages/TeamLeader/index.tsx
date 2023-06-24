import { Button, Grid, IconButton, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import smartLogoLocal from '../../default_match_icon_local.svg';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TeamFormation from '../../components/TeamFormation';
import AddIcon from '@mui/icons-material/Add';

export const TeamLeader: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate('/leader/enrollment/tournaments');
  };

  return (
    <Navbar
      button={{
        action: () => navigate('/'),
        text: 'Torneos',
        icon: <EmojiEventsIcon style={{ height: 22, display: 'flex', color: 'yellow' }} />,
      }}
    >
      <Grid className={classes.gridRoot}>
        <Typography className={classes.title}>Bienvenido Diego Moronha</Typography>
        <Grid
          container
          style={{ paddingTop: 30, display: 'flex', flexGrow: 1 }}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <Grid item className={classes.item} xs={6} md={6} sm={12}>
            <Grid className={classes.team}>
              <Typography
                color="white"
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  fontFamily: 'sans-serif',
                  paddingLeft: 10,
                  paddingTop: 10,
                }}
              >
                Equipo:
              </Typography>
              <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingTop: 30 }}>
                <img src={smartLogoLocal} />
                <Typography color="white">Los Nuevos FC</Typography>
              </Grid>
              <Grid
                container
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '6%',
                }}
              >
                <Button className={classes.buttonEnroll} onClick={handleEnroll}>
                  <Typography className={classes.buttonText}>Inscribirse a torneo</Typography>
                </Button>
                <Button className={classes.buttonEnroll}>
                  <Typography className={classes.buttonText}>Estado de inscripciones</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.item} xs={6} md={6} sm={12}>
            <Grid className={classes.team}>
              <Grid
                container
                direction="row"
                style={{ display: 'flex', alignItems: 'center', paddingTop: 10 }}
              >
                <Typography
                  color="white"
                  style={{
                    fontWeight: 600,
                    fontSize: 18,
                    fontFamily: 'sans-serif',
                    paddingLeft: 17,
                  }}
                >
                  Jugadores:
                </Typography>
                <IconButton>
                  <AddIcon style={{ color: 'white', fontSize: 23 }}></AddIcon>
                </IconButton>
              </Grid>

              <TeamFormation />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Navbar>
  );
};

/*
        <Typography>No tienes equipo: Crea un equipo y participa por grandes premios</Typography>
        <Typography>Jugadores</Typography>
        <Button> Cargar mi equipo</Button>

*/
