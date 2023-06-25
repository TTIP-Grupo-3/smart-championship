import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardTournamentEnroll } from '../../components/CardTournamentEnroll';
import { Loader } from '../../components/Loader';
import { Navbar } from '../../components/NavBar';
import { API_TEAM_LEADER } from '../../services/TeamLeader';
import { useStyles } from './style';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const TournamentsToStart = () => {
  const [championships, setChampionships] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { classes } = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    API_TEAM_LEADER.championshipsToEnroll().then((r) => {
      setChampionships(r.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Navbar
      button={{
        action: () => navigate('/leader'),
        text: 'Volver',
        icon: <ArrowBackIosIcon style={{ height: 18, display: 'flex', color: 'white' }} />,
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
            <Typography>Selecciona el torneo que deseas inscribirte: </Typography>
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
            {championships.map((championship) => (
              <CardTournamentEnroll championship={championship}></CardTournamentEnroll>
            ))}
          </Grid>
        </>
      )}
    </Navbar>
  );
};
