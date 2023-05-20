import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { CardTournament } from '../../components/CardTournament';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';

export const Tournaments = () => {
  const [championships, setChampionships] = useState([]);

  useEffect(() => {
    API.getChampionships().then((r) => setChampionships(r.data));
  }, []);

  return (
    <Navbar>
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
    </Navbar>
  );
};
