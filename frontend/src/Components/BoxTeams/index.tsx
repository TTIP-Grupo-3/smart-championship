import { Grid } from '@mui/material';
import { FC } from 'react';
import { Match } from '../Match';
import { useStyles } from './style';

interface BoxTeamProps {
  local: TeamStatus;
  visiting: TeamStatus;
}

export interface TeamStatus {
  name: string;
  goals: number;
  cards: TypeCards;
}

interface TypeCards {
  yellow: number;
  red: number;
}

export const BoxTeams: FC<BoxTeamProps> = ({ local, visiting }) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      <Grid className={classes.gridTeam}>
        <Match local={local} visiting={visiting} />
      </Grid>
    </Grid>
  );
};
