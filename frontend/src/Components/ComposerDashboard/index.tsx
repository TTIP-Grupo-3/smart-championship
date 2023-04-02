import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { API } from '../../services/Championship';
import CompositionTournament from '../CompositionTournament';

export const ComposeDashboard: FC = () => {
  const [matches, setMatches] = useState({ matches: [], next: null });

  useEffect(() => {
    API.getChampionship().then((r) => {
      setMatches(r.data);
    });
  }, []);

  return (
    <Grid sx={{ display: 'flex' }}>
      <CompositionTournament dataSet={matches} />
    </Grid>
  );
};
