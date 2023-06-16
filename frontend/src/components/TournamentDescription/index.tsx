import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

export interface TitledTextProps {
  name: string;
  size: number;
}

export const TournamentDescription: FC<TitledTextProps> = ({ name, size }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid}>
      <Typography variant="subtitle1" className={classes.title}>
        {name}
      </Typography>
      <Typography variant="body2">Cupos disponibles:{size}</Typography>
    </Grid>
  );
};
