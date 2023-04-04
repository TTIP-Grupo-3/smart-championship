import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CompositionTournament from '../../components/CompositionTournament';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';

export const DashBoard = () => {
  const [matches, setMatches] = useState({ matches: [], next: null });

  useEffect(() => {
    API.getChampionship().then((r) => {
      setMatches(r.data);
    });
  }, []);

  return (
    <Navbar>
      <Grid sx={{ display: 'flex' }}>
        <CompositionTournament dataSet={matches} />
      </Grid>
    </Navbar>
  );
};
