import { Grid } from '@mui/material';
import { FC } from 'react';
import { EliminationTournament, MatchTournament } from '../../pages/Dashboard';
import { BoxTeams } from '../BoxTeams';
import { Bracket } from '../Bracket';
import { useStyles } from './style';

interface TournamentProps {
  dataSet: EliminationTournament;
  round?: number;
}

export const Tournament: FC<TournamentProps> = ({ dataSet, round = 0 }) => {
  const { classes } = useStyles();
  return (
    <>
      <Grid data-testid="Tournament-round" className={classes.round}>
        {dataSet.matches.map((match: MatchTournament) => (
          <Grid key={match.id} data-testid="tournament-match" className={classes.matchesRound}>
            <Grid data-testid="alineation-round" className={classes.alineationTeamsColumn}>
              {round > 0 && (
                <Grid data-testid="composition-grid-bracket" className={classes.gridLeft}>
                  <Bracket />
                </Grid>
              )}

              <Grid
                className={classes.alineationMatch}
                data-testid="alineation-match"
                alignItems="center"
                justifyContent="center"
              >
                <BoxTeams {...match} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <>{dataSet.next && <Tournament dataSet={dataSet.next} round={round + 1} />}</>
    </>
  );
};
