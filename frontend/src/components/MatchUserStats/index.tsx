import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { MatchUserResult } from '../MatchUserResult';
import { useStyles } from './style';

export const MatchUserStats: FC<any> = ({ title, dataLocal, dataVisiting }) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.statsGrid}>
      <Typography variant="h5" color="white">
        {title}
      </Typography>
      <Grid container style={{ borderRadius: 4, width: '100%', backgroundColor: 'grey' }}>
        <MatchUserResult cards={dataLocal} />
        <MatchUserResult cards={dataVisiting} />
      </Grid>
    </Grid>
  );
};
