import { Grid } from '@mui/material';
import { FC } from 'react';
import { TeamStatus } from '../BoxTeams';
import { useStyles } from './style';
import smartLogoLocal from '../../default_match_icon_local.svg';
import smartLogoVisiting from '../../default_match_icon_visiting.svg';

import { MatchTeam } from '../MatchTeam';
import { ScoreMatch } from '../ScoreMatch';

interface TeamProps {
  local: TeamStatus;
  visiting: TeamStatus;
}

export const Match: FC<TeamProps> = ({ local, visiting }) => {
  const { classes } = useStyles();
  return (
    <Grid container data-testid="Match" className={classes.backgroundTeamCard}>
      <MatchTeam logo={smartLogoLocal} team={local} />
      <ScoreMatch localGoals={local.goals} visitingGoals={visiting.goals} />
      <MatchTeam logo={smartLogoVisiting} team={visiting} />
    </Grid>
  );
};
