import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardTournament } from '../../components/CardTournament';
import { Loader } from '../../components/Loader';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';
import { useStyles } from './style';

export const Tournaments = () => {
  const [championships, setChampionships] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { classes } = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    API.getChampionships().then((r) => {
      setChampionships(r.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Navbar footer>
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
            <Typography>Selecciona un torneo para visualizar su estado o </Typography>
            <Button className={classes.enrollmentButton} onClick={() => navigate('/check')}>
              {' '}
              Inscribete
            </Button>
            <Typography>a un torneo </Typography>
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
              <CardTournament championship={championship}></CardTournament>
            ))}
          </Grid>
        </>
      )}
    </Navbar>
  );
};
