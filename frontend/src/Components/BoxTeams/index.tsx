import { Divider, Grid } from '@mui/material';
import { FC } from 'react';
import { Team } from '../Team';
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
        <Team dataTeam={local} />
        <Divider className={classes.dividerTeam} />
        <Team dataTeam={visiting} />
      </Grid>
    </Grid>
  );
};
