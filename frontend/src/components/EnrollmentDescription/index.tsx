import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export const EnrollmentDescription: FC<any> = ({ tournamentRequested, typeChampionship, price }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid}>
      <Typography variant="subtitle1" className={classes.title}>
        {tournamentRequested}
      </Typography>
      <Typography variant="body2">Tipo: {typeChampionship}</Typography>

      <Typography variant="body2">Precio: ${price}</Typography>
    </Grid>
  );
};
