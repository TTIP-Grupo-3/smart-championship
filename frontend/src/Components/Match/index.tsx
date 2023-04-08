import { Grid } from '@mui/material';
import { FC } from 'react';
import { TeamStatus } from '../BoxTeams';
import { useStyles } from './style';
import smartLogo from '../../logo.svg';
import { MatchTeam } from '../MatchTeam';
import { ScoreMatch } from '../ScoreMatch';

interface TeamProps {
  local: TeamStatus;
  visiting: TeamStatus;
}

export const Match: FC<TeamProps> = ({ local, visiting }) => {
  const { classes } = useStyles();
  return (
    <Grid container className={classes.backgroundTeamCard}>
      <MatchTeam logo={smartLogo} team={local} />
      <ScoreMatch localGoals={local.goals} visitingGoals={visiting.goals} />
      <MatchTeam logo={smartLogo} team={visiting} />
    </Grid>
  );
};
