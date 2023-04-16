import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { useStyles } from './style';

interface ScoreMatchProps {
  localGoals: number;
  visitingGoals: number;
}

export const ScoreMatch: FC<ScoreMatchProps> = ({ localGoals, visitingGoals }) => {
  const { classes } = useStyles();

  return (
    <Grid data-testid="ScoreMatch" className={classes.resultGrid}>
      <Typography data-testid="ScoreMatch-score-result" className={classes.result} noWrap>
        {localGoals} - {visitingGoals}
      </Typography>
    </Grid>
  );
};
