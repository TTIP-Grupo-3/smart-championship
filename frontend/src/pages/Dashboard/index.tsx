import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { TeamStatus } from '../../components/BoxTeams';
import CompositionTournament from '../../components/CompositionTournament';
import { Navbar } from '../../components/NavBar';
import { API } from '../../services/Championship';
import { useStyles } from './style';

export interface SmartChampionship extends EliminationTournament {
  id: number;
  name: string;
}
export interface EliminationTournament {
  matches: MatchTournament[];
  next: EliminationTournament | null;
}

export interface MatchTournament {
  id: number;
  local: TeamStatus;
  visiting: TeamStatus;
}

export const DashBoard: FC = () => {
  const [matches, setMatches] = useState<EliminationTournament>({ matches: [], next: null });
  const { classes } = useStyles();

  useEffect(() => {
    API.getChampionship().then((r) => {
      setMatches(r.data);
    });
  }, []);

  return (
    <Navbar>
      <Grid container className={classes.gridContainer}>
        <CompositionTournament dataSet={matches} />
      </Grid>
    </Navbar>
  );
};
