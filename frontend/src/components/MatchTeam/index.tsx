/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid } from '@mui/material';
import { FC } from 'react';
import { getInitials } from '../../utils/utils';
import { TeamStatus } from '../BoxMatch';
import { MatchTeamCards } from '../MatchTeamCards';
import { TooltipText } from '../TooltipText';
import { useStyles } from './style';

interface MatchTeamProps {
  logo: string;
  team?: TeamStatus;
  showCards?: boolean;
  paddingTopImg?: number;
  inDialog?: boolean;
}

export const MatchTeam: FC<MatchTeamProps> = ({
  logo,
  team,
  showCards = true,
  paddingTopImg = 0,
  inDialog = false,
}) => {
  const { classes } = useStyles();
  return (
    <Grid data-testid="MatchTeam" className={classes.gridIconTeam}>
      <img
        src={team?.logo ? `data:image/png;base64,${team.logo}` : logo}
        data-testid="img-team"
        width="45"
        height="45"
        style={{ borderRadius: '50%', paddingTop: paddingTopImg }}
      />
      <TooltipText text={inDialog ? getInitials(team!.name).toUpperCase() : team?.name} />
      {showCards && <MatchTeamCards {...team} />}
    </Grid>
  );
};
