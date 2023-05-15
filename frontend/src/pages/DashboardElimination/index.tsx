/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamStatus } from '../../components/BoxTeams';
import { Navbar } from '../../components/NavBar';
import { Tournament } from '../../components/Tournament';
import { ChampionshipService } from '../../services/ChampionshipService';
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

const championshipService = new ChampionshipService();

export const DashboardElimination: FC = () => {
  const [matches, setMatches] = useState<EliminationTournament>({ matches: [], next: null });
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const socket = championshipService.create();
    socket.on('championship', (data: any) => setMatches(data));
    championshipService.subscribe(socket, { championshipId: +id!, championshipType: 'elimination' });
    return () => championshipService.unsubscribe(socket);
  }, []);

  return (
    <Navbar button={{ action: () => navigate(-1), text: 'Inicio' }}>
      <Grid container className={classes.gridContainer}>
        <Tournament dataSet={matches} />
      </Grid>
    </Navbar>
  );
};
