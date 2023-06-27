import { Button, Grid, IconButton, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/NavBar';
import smartLogoLocal from '../../default_match_icon_local.svg';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TeamFormation from '../../components/TeamFormation';
import AddIcon from '@mui/icons-material/Add';
import { MyEnrollmentsDialog } from '../../components/MyEnrollmentsDialog';
import { EnrollmentTeamDialog } from '../../components/EnrollTeamDialog';
import { AddPlayerDialog } from '../../components/AddPlayerDialog';

export const TeamLeader: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const [openEnrollments, setOpenEnrollments] = useState(false);
  const [openTeamCreator, setOpenCreator] = useState(false);
  const [data, setData] = useState([1]);
  const [openPlayer, setOpenPlayer] = useState(false);

  const handleEnroll = () => {
    navigate('/leader/enrollment/tournaments');
  };

  const handleEnrollments = () => {
    setOpenEnrollments(true);
  };

  const handleCreate = () => {
    setOpenCreator(true);
  };

  const addPlayer = () => {
    setOpenPlayer(true);
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
        <Typography className={classes.title}>Bienvenido {'Username'}</Typography>

        {!data.length ? (
          <Grid container className={classes.emptyTeamGrid}>
            <Typography color="white" padding={2}>
              Notamos que no tienes ningun equipo.
            </Typography>
            <Button className={classes.createTeam} onClick={handleCreate}>
              <Typography className={classes.buttonText}>Crea Tu Primer Equipo</Typography>
            </Button>
            <EnrollmentTeamDialog open={openTeamCreator} setOpen={setOpenCreator} />
          </Grid>
        ) : (
          <>
            <Grid container className={classes.gridSpacer} spacing={2}>
              <Grid item className={classes.item} xs={6} md={6} sm={12}>
                <Grid className={classes.team}>
                  <Typography className={classes.teamText}>Equipo:</Typography>
                  <Grid className={classes.gridLogo}>
                    <img src={smartLogoLocal} />
                    <Typography color="white">Los Nuevos FC</Typography>
                  </Grid>
                  <Grid container className={classes.gridLeft}>
                    <Button className={classes.buttonEnroll} onClick={handleEnroll}>
                      <Typography className={classes.buttonText}>Inscribirse a torneo</Typography>
                    </Button>
                    <Button className={classes.buttonEnroll}>
                      <Typography className={classes.buttonText} onClick={handleEnrollments}>
                        Mis inscripciones
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.item} xs={6} md={6} sm={12}>
                <Grid className={classes.team}>
                  <Grid container className={classes.gridRigthContent}>
                    <Typography className={classes.teamPlayerText}>Jugadores:</Typography>
                    <IconButton onClick={addPlayer}>
                      <AddIcon style={{ color: 'white', fontSize: 23 }}></AddIcon>
                    </IconButton>
                  </Grid>

                  <TeamFormation />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <MyEnrollmentsDialog open={openEnrollments} setOpen={setOpenEnrollments} />
        <AddPlayerDialog open={openPlayer} setOpen={setOpenPlayer} />
      </Grid>
    </Navbar>
  );
};

/*
        <Typography>No tienes equipo: Crea un equipo y participa por grandes premios</Typography>
        <Typography>Jugadores</Typography>
        <Button> Cargar mi equipo</Button>

*/
