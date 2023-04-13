import { Grid } from '@mui/material';
import { FC } from 'react';
import { TeamStatus } from '../BoxTeams';
import { MatchTeamCards } from '../MatchTeamCards';
import { TooltipText } from '../TooltipText';
import { useStyles } from './style';

interface MatchTeamProps {
  logo: string;
  team: TeamStatus;
}

export const MatchTeam: FC<MatchTeamProps> = ({ logo, team }) => {
  const { classes } = useStyles();
  return (
    <Grid data-testid="MatchTeam" className={classes.gridIconTeam}>
      <img src={logo} data-testid="img-team" width="60" height="60" />
      <TooltipText text={team.name} />
      <MatchTeamCards {...team} />
    </Grid>
  );
};
