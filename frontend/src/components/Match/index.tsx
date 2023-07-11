import { Grid, lighten, useTheme } from '@mui/material';
import { FC } from 'react';
import { TeamStatus } from '../BoxMatch';
import { useStyles } from './style';
import smartLogoLocal from '../../default_match_icon_local.svg';
import smartLogoVisiting from '../../default_match_icon_visiting.svg';

import { MatchTeam } from '../MatchTeam';
import { ScoreMatch } from '../ScoreMatch';

interface MatchProps {
  local: TeamStatus;
  visiting: TeamStatus;
  status: string;
}

export const Match: FC<MatchProps> = ({ local, visiting, status }) => {
  const { classes } = useStyles();
  const theme = useTheme();

  return (
    <Grid
      container
      data-testid="Match"
      className={classes.backgroundTeamCard}
      style={!(local && visiting) ? { backgroundColor: lighten(theme.palette.background.paper, 0.3) } : {}}
    >
      <MatchTeam logo={smartLogoLocal} team={local} />
      <ScoreMatch localGoals={local?.goals} visitingGoals={visiting?.goals} status={status} />
      <MatchTeam logo={smartLogoVisiting} team={visiting} />
    </Grid>
  );
};
