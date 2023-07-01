import { Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { MatchTeam } from '../MatchTeam';
import { useStyles } from './style';
import smartLogoLocal from '../../default_match_icon_local.svg';
import smartLogoVisiting from '../../default_match_icon_visiting.svg';
import { StartedMatchLoader } from '../StartedMatchLoader';
import { MatchStatus } from '../../interfaces';

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
        <MatchTeam
          logo={smartLogoLocal}
          inDialog
          team={match?.local}
          showCards={false}
          paddingTopImg={14}
        />
        <Typography variant="h3" className={classes.resultScore}>
          {match?.local ? match.local.goals.length : 0}
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
            {match?.status === MatchStatus.STARTED && <StartedMatchLoader />}
          </>
        )}
        {componentStop}
      </Grid>
      <Grid className={classes.teamMatch}>
        <MatchTeam
          logo={smartLogoVisiting}
          inDialog
          team={match?.visiting}
          showCards={false}
          paddingTopImg={14}
        />
        <Typography variant="h3" className={classes.resultScore}>
          {match?.visiting ? match.visiting?.goals?.length : 0}
        </Typography>
      </Grid>
    </Grid>
  );
};
