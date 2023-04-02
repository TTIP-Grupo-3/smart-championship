import { Grid } from '@mui/material';
import { FC } from 'react';
import { BoxTeam } from '../BoxTeam';
import { Bracket } from '../Bracket';
import { useStyles } from './style';

const CompositionTournament: FC<any> = ({ dataSet, round = 0 }) => {
  const { classes } = useStyles();
  return (
    <>
      <Grid className={classes.round}>
        {dataSet.matches.map((match: any) => (
          <Grid className={classes.matchesRound}>
            <Grid className={classes.alineationTeamsColumn}>
              {round > 0 && (
                <Grid className={classes.gridLeft}>
                  <Bracket />
                </Grid>
              )}
              <Grid className={classes.alineationMatch} alignItems="center" justifyContent="center">
                <BoxTeam name={match.name} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      {dataSet.children.map((matches: any) => (
        <>
          <CompositionTournament dataSet={matches} round={round + 1} />
        </>
      ))}
    </>
  );
};

export default CompositionTournament;
