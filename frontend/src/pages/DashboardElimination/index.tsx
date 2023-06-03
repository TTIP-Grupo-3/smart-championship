/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamStatus } from '../../components/BoxMatch';
import { Navbar } from '../../components/NavBar';
import { Tournament } from '../../components/Tournament';
import { ChampionshipService } from '../../services/ChampionshipService';
import { useStyles } from './style';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export interface SmartChampionship extends EliminationTournament {
  id: number;
  name: string;
}
export interface EliminationTournament {
  type?: string;
  id?: number;
  name: string;
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
  const [tournament, setTournament] = useState<EliminationTournament>({
    name: '',
    matches: [],
    next: null,
  });
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const socket = championshipService.create();
    socket.on('championship', (data: any) => setTournament(data));
    championshipService.subscribe(socket, { championshipId: +id!, championshipType: 'elimination' });
    return () => championshipService.unsubscribe(socket);
  }, []);

  return (
    <Navbar
      button={{
        action: () => navigate('/'),
        text: 'Torneos',
        icon: <EmojiEventsIcon style={{ height: 22, display: 'flex', color: 'yellow' }} />,
      }}
    >
      <Typography className={classes.tournamentTitle}>{tournament.name}</Typography>
      <Grid container className={classes.gridContainer}>
        <Tournament dataSet={tournament} />
      </Grid>
    </Navbar>
  );
};
