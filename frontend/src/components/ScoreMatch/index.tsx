import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { StartedMatchLoader } from '../StartedMatchLoader';
import { StatusMatch } from '../StatusMatch';
import { useStyles } from './style';

interface ScoreMatchProps {
  localGoals?: number;
  visitingGoals?: number;
  status: string;
}

export const ScoreMatch: FC<ScoreMatchProps> = ({ localGoals, visitingGoals, status }) => {
  const { classes } = useStyles();

  const showGoals = visitingGoals !== undefined && localGoals !== undefined;
  return (
    <Grid data-testid="ScoreMatch" className={classes.resultGrid}>
      <Typography data-testid="ScoreMatch-score-result" className={classes.result} noWrap>
        {showGoals ? `${localGoals} - ${visitingGoals}` : `-`}
      </Typography>
      {status === 'STARTED' ? (
        <StartedMatchLoader />
      ) : (
        <StatusMatch status={status} className={classes.statusMatch} />
      )}
    </Grid>
  );
};
