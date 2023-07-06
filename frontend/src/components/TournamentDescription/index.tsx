import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { TypeChampionship } from '../../interfaces';
import { ChipChampionship } from '../ChipChampionship';
import { useStyles } from './style';

export interface TitledTextProps {
  name: string;
  size: number;
  enrolled: number;
  type: TypeChampionship;
}

export const TournamentDescription: FC<TitledTextProps> = ({ name, size, enrolled, type }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.grid}>
      <Grid className={classes.gridTitle}>
        <Typography variant="subtitle1" className={classes.title}>
          {name}
        </Typography>
        <ChipChampionship {...{ type }} className={classes.chip} />
      </Grid>
      <Typography variant="body2">Cupos disponibles:{size - enrolled}</Typography>
    </Grid>
  );
};
