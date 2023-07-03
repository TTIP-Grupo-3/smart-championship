import { Grid, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardTournamentEnroll } from '../../components/CardTournamentEnroll';
import { Loader } from '../../components/Loader';
import { Navbar } from '../../components/NavBar';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useStyles } from './style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { TeamLeaderTournament } from '../../interfaces';

export const TournamentsToStart = () => {
  const [championships, setChampionships] = useState<TeamLeaderTournament[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { classes } = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      API_TEAM_LEADER.championshipsToEnroll().then(({ data }) => {
        setChampionships(data);
        setIsLoading(false);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Navbar
      button={{
        action: () => navigate('/leader'),
        text: 'Volver',
        icon: (
          <ArrowBackIosIcon style={{ height: 18, display: 'flex', color: theme.palette.common.white }} />
        ),
      }}
    >
      {isLoading ? (
        <Loader text="Cargando Torneos" />
      ) : (
        <>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={classes.title}
          >
            <Typography className={classes.textEnroll}>Inscripciones</Typography>
          </Grid>
          <Grid
            container
            style={{ flexGrow: 1, display: 'flex' }}
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            padding={2}
          >
            {championships.map((championship, index: number) => (
              <CardTournamentEnroll key={index} championship={championship}></CardTournamentEnroll>
            ))}
          </Grid>
        </>
      )}
    </Navbar>
  );
};
