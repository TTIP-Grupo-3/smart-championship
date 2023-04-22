import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AnotationVeedor } from '../../components/AnotationVeedor';
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

  const disallowCard = (typeCard: 'YELLOW' | 'RED', isLocal: boolean) => {
    socket.emit('card:disallow', {
      cardId: 1,
      id: idMatch,
      championshipId: 1,
    });
  };

  console.log(match);

  return (
    <Navbar>
      <Grid container className={classes.container}>
        {!idMatch ? (
          <MatchSelector setSelected={setSelected} matches={treeToList(tournament)} />
        ) : (
          <>
            <Grid style={{ margin: 27, display: 'flex', width: '100%' }}>
              <MatchScoreResult
                match={match}
                time={`${minutes(time)}:${seconds(time)}`}
                componentStart={
                  <Button
                    style={{ color: 'white', backgroundColor: '#bf360c', width: '105px' }}
                    onClick={!isStarted ? start : stop}
                  >
                    <Typography variant="body1" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                      {!isStarted ? 'Inicio' : 'Final  '}
                    </Typography>
                  </Button>
                }
              />
            </Grid>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Anotar/Desanotar Goles</Typography>
            </Grid>
            <AnotationVeedor
              buttonLeftAction={() => scoreGoal(true)}
              buttonLeftChild={'+'}
              buttonRightAction={() => disallowGoal(match?.local.goals.pop().id)}
              buttonRightChild={'-'}
            />
            <Grid style={{ display: 'flex' }}></Grid>

            <AnotationVeedor
              buttonLeftAction={() => scoreGoal(false)}
              buttonLeftChild={'+'}
              buttonRightAction={() => disallowGoal(match?.visiting.goals.pop().id)}
              buttonRightChild={'-'}
            />
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Anotar/Desanotar Infracciones</Typography>
            </Grid>

            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Rojas</Typography>
            </Grid>
            <AnotationVeedor
              buttonLeftAction={() => scoreCard('RED', true)}
              buttonLeftChild={'+'}
              buttonRightAction={() => disallowCard('RED', true)}
              buttonRightChild={'-'}
            />
            <Grid style={{ display: 'flex' }}></Grid>
            <AnotationVeedor
              buttonLeftAction={() => scoreCard('RED', false)}
              buttonLeftChild={'+'}
              buttonRightAction={() => disallowCard('RED', false)}
              buttonRightChild={'-'}
            />

            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Amarillas</Typography>
            </Grid>
            <AnotationVeedor
              buttonLeftAction={() => scoreCard('YELLOW', true)}
              buttonLeftChild={'+'}
              buttonRightAction={() => disallowCard('YELLOW', true)}
              buttonRightChild={'-'}
            />
            <Grid style={{ display: 'flex' }}></Grid>

            <AnotationVeedor
              buttonLeftAction={() => scoreCard('YELLOW', false)}
              buttonLeftChild={'+'}
              buttonRightAction={() => disallowCard('YELLOW', false)}
              buttonRightChild={'-'}
            />
          </>
        )}
      </Grid>
    </Navbar>
  );
};
