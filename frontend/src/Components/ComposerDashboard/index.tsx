import { Grid } from '@mui/material';
import { FC } from 'react';
import CompositionTournament from '../CompositionTournament';

export const ComposeDashboard: FC<any> = ({ dataSet }) => {
  return (
    <Grid sx={{ display: 'flex' }}>
      <CompositionTournament dataSet={dataSet} />
    </Grid>
  );
};
