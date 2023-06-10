import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { MatchTeam } from '../MatchTeam';
import { useStyles } from './style';
import smartLogoLocal from '../../default_match_icon_local.svg';
import smartLogoVisiting from '../../default_match_icon_visiting.svg';
import { StartedMatchLoader } from '../StartedMatchLoader';

export const MatchScoreResult: FC<any> = ({
  match,
  time,
  componentStart,
  componentStop,
  showTime = true,
}) => {
  const { classes } = useStyles();

  return (
    <Grid container className={classes.containerStyle}>
      <Grid className={classes.teamMatch}>
        <MatchTeam logo={smartLogoLocal} team={match?.local} showCards={false} paddingTopImg={14} />
        <Typography variant="h3" className={classes.resultScore}>
          {match?.local.goals.length}
        </Typography>
      </Grid>
      <Grid className={classes.timer}>
        {componentStart}
        {showTime && (
          <>
            <Typography variant="body1" className={classes.time}>
              Tiempo
            </Typography>
            <Typography variant="body1" className={classes.time}>
              {time}'
            </Typography>
            {match?.status === 'STARTED' && <StartedMatchLoader />}
          </>
        )}
        {componentStop}
      </Grid>
      <Grid className={classes.teamMatch}>
        <MatchTeam logo={smartLogoVisiting} team={match?.visiting} showCards={false} paddingTopImg={14} />
        <Typography variant="h3" className={classes.resultScore}>
          {match?.visiting.goals.length}
        </Typography>
      </Grid>
    </Grid>
  );
};
