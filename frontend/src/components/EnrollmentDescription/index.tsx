import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const EnrollmentDescription: FC<any> = ({ tournamentRequested, type }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid}>
      <Typography variant="subtitle1" className={classes.title}>
        {tournamentRequested}
      </Typography>
      <Typography variant="body2">Tipo: {type}</Typography>
    </Grid>
  );
};
