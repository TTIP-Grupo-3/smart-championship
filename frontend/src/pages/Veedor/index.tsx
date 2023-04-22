import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AnotationVeedor } from '../../components/AnotationVeedor';
import { MatchManager } from '../../components/MatchManager';
import { MatchScoreResult } from '../../components/MatchScoreResult';
import { MatchSelector } from '../../components/MatchSelector';
import { Navbar } from '../../components/NavBar';
import { useTimer } from '../../hooks/useTimer';
import { API } from '../../services/Championship';
import { SocketService } from '../../services/SocketService';
import { useStyles } from './style';

const socketService = new SocketService();

export const Veedor = () => {
  const { classes } = useStyles();
  const socket = socketService.create('match');
  const [tournament, setTournament] = useState({ matches: [], next: null });
  const [idMatch, setSelected] = useState(null);
  const [match, setMatch] = useState<any>();
  const { minutes, seconds, start, stop, isStarted, time } = useTimer(0);

  useEffect(() => {
    API.getChampionship().then((r) => {
      setTournament(r.data);
    });
  }, []);

  useEffect(() => {
    socket.on('match', (data: any) => setMatch(data));
    socketService.subscribe(socket, { id: idMatch, championshipId: 1 });
    return () => socketService.unsubscribe(socket);
  }, [idMatch]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const treeToList = (tournament: any): any[] => {
    if (tournament.next === null) return [];
    return tournament.matches.concat(treeToList(tournament.next));
  };

  const scoreGoal = (isLocal: boolean) => {
    socket.emit('goal', {
      id: idMatch,
      championshipId: 1,
      playerId: 1,
      minute: minutes(time),
      local: isLocal,
    });
  };

  const disallowGoal = (idGoal: number) => {
    socket.emit('goal:disallow', { goalId: idGoal, id: idMatch, championshipId: 1 });
  };

  const scoreCard = (typeCard: 'YELLOW' | 'RED', isLocal: boolean) => {
    socket.emit('card', {
      type: typeCard,
      id: idMatch,
      championshipId: 1,
      minute: minutes(time),
      playerId: 12,
      local: isLocal,
    });
  };

  const disallowCard = (cardId: number) => {
    socket.emit('card:disallow', {
      cardId: cardId,
      id: idMatch,
      championshipId: 1,
    });
  };

  return (
    <Navbar>
      <Grid container className={classes.container}>
        {!idMatch ? (
          <MatchSelector setSelected={setSelected} matches={treeToList(tournament)} />
        ) : (
          <>
            <Grid className={classes.containerResult}>
              <MatchScoreResult
                match={match}
                showTime={match?.status !== 'FINISHED'}
                time={`${minutes(time)}:${seconds(time)}`}
                componentStart={
                  match?.status !== 'FINISHED' && (
                    <Button
                      style={{ color: 'white', backgroundColor: '#bf360c', width: '105px' }}
                      onClick={!isStarted ? start : stop}
                    >
                      <Typography variant="body1" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                        {!isStarted ? 'Inicio' : 'Final  '}
                      </Typography>
                    </Button>
                  )
                }
                componentStop={
                  <>
                    <Typography
                      color="white"
                      style={{
                        paddingTop: 3,
                        paddingBottom: 3,
                        paddingLeft: 10,
                        paddingRight: 10,
                        backgroundColor: 'red',
                        borderRadius: 6,
                      }}
                    >
                      {match?.status}
                    </Typography>
                  </>
                }
              />
            </Grid>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Anotar/Desanotar Goles</Typography>
            </Grid>
            <MatchManager
              buttonLeftLocal={() => scoreGoal(true)}
              buttonRightLocal={() => disallowGoal(match?.local.goals.pop().id)}
              buttonLeftVisiting={() => scoreGoal(true)}
              buttonRightVisiting={() => disallowGoal(match?.visiting.goals.pop().id)}
            />
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Anotar/Desanotar Infracciones</Typography>
            </Grid>

            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Rojas</Typography>
            </Grid>
            <MatchManager
              buttonLeftLocal={() => scoreCard('RED', true)}
              buttonRightLocal={() => disallowCard(1)}
              buttonLeftVisiting={() => scoreCard('RED', false)}
              buttonRightVisiting={() => disallowCard(1)}
            />
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Amarillas</Typography>
            </Grid>
            <MatchManager
              buttonLeftLocal={() => scoreCard('YELLOW', true)}
              buttonRightLocal={() => disallowCard(1)}
              buttonLeftVisiting={() => scoreCard('YELLOW', false)}
              buttonRightVisiting={() => disallowCard(1)}
            />
          </>
        )}
      </Grid>
    </Navbar>
  );
};
