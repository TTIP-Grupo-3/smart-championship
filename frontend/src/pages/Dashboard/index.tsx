import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { TeamStatus } from '../../components/BoxTeams';
import { Navbar } from '../../components/NavBar';
import { Tournament } from '../../components/Tournament';
import { SocketService } from '../../services/SocketService';
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

const socketService = new SocketService();

export const Dashboard: FC = () => {
  const [matches, setMatches] = useState<EliminationTournament>({ matches: [], next: null });
  const { classes } = useStyles();

  useEffect(() => {
    const socket = socketService.create('championship');
    socket.on('championship', (data: any) => setMatches(data));
    socketService.subscribe(socket, { id: 1 });
    return () => socketService.unsubscribe(socket);
  }, []);

  return (
    <Navbar>
      <Grid container className={classes.gridContainer}>
        <Tournament dataSet={matches} />
      </Grid>
    </Navbar>
  );
};
