import { Grid } from '@mui/material';
import { FC } from 'react';
import { BoxTeams } from '../BoxTeams';
import { Bracket } from '../Bracket';
import { useStyles } from './style';

const CompositionTournament: FC<any> = ({ dataSet, round = 0 }) => {
  const { classes } = useStyles();
  return (
    <>
      <Grid className={classes.round}>
        {dataSet.matches.map((match: any) => (
          <Grid key={match.id} className={classes.matchesRound}>
            <Grid className={classes.alineationTeamsColumn}>
              {round > 0 && (
                <Grid className={classes.gridLeft}>
                  <Bracket />
                </Grid>
              )}

              <Grid className={classes.alineationMatch} alignItems="center" justifyContent="center">
                <BoxTeams local={match.local} visiting={match.visiting} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <>{dataSet.next && <CompositionTournament dataSet={dataSet.next} round={round + 1} />}</>
    </>
  );
};

export default CompositionTournament;
