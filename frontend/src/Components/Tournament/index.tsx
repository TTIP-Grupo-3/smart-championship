import { Grid } from '@mui/material';
import { FC } from 'react';
import { EliminationTournament, MatchTournament } from '../../pages/Dashboard';
import { BoxTeams } from '../BoxTeams';
import { Bracket } from '../Bracket';
import { useStyles } from './style';

interface CompositionTournamentProps {
  dataSet: EliminationTournament;
  round?: number;
}

const Tournament: FC<CompositionTournamentProps> = ({ dataSet, round = 0 }) => {
  const { classes } = useStyles();
  return (
    <div data-testid="Tournament">
      <Grid data-testid="tournament-round" className={classes.round}>
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
                <BoxTeams local={match.local} visiting={match.visiting} />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <>{dataSet.next && <Tournament dataSet={dataSet.next} round={round + 1} />}</>
    </div>
  );
};

export default Tournament;
