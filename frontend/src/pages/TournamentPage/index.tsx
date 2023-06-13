import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CardTournament } from '../../components/CardTournament';
import { Loader } from '../../components/Loader';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';
import { useStyles } from './style';

export const Tournaments = () => {
  const [championships, setChampionships] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { classes } = useStyles();

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
          <Typography className={classes.title}>
            Selecciona un torneo para visualizar su estado:{' '}
          </Typography>
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
