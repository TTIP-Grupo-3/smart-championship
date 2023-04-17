import { Grid } from '@mui/material';
import { FC } from 'react';
import { TeamStatus } from '../BoxTeams';
import { MatchTeamCard } from '../MatchTeamCard';
import { useStyles } from './style';

type MatchTeamCardsProps = Omit<TeamStatus, 'name' | 'goals'>;

export const MatchTeamCards: FC<MatchTeamCardsProps> = ({ cards }) => {
  const { classes } = useStyles();

  return (
    <Grid data-testid="MatchTeamCards" className={classes.cardsGrid}>
      <MatchTeamCard color="red" amount={cards.red} />
      <MatchTeamCard color="yellow" amount={cards.yellow} />
    </Grid>
  );
};
