import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MatchManager } from '../../components/MatchManager';
import { MatchScoreResult } from '../../components/MatchScoreResult';
import { MatchSelector } from '../../components/MatchSelector';
import { Navbar } from '../../components/NavBar';
import { useTimer } from '../../hooks/useTimer';
import { API_MATCH } from '../../services/Match';
import { SocketService } from '../../services/SocketService';
import { useStyles } from './style';

const socketService = new SocketService();
const socket = socketService.create('match');
export const Veedor = () => {
  const { classes } = useStyles();
  const [matches, setMatches] = useState([]);
  const [idMatch, setSelected] = useState(null);
  const [match, setMatch] = useState<any>();
  const [currentMatch, setCurrentMatch] = useState<any>();
  const { minutes, seconds, start, stop, isStarted, time } = useTimer(0);

  useEffect(() => {
    API_MATCH.getMatches(1).then((r) => {
      setMatches(r.data);
    });
  }, []);
  console.log(match);
  useEffect(() => {
    if (idMatch) {
      API_MATCH.getMatch(1, idMatch).then((r) => setCurrentMatch(r.data));
    }
  }, [idMatch]);

  useEffect(() => {
    if (idMatch) {
      socket.on('match', (data: any) => setMatch(data));
      socketService.subscribe(socket, { id: idMatch, championshipId: 1 });
      return () => socketService.unsubscribe(socket);
    }
  }, [idMatch]);

  const scoreGoal = (isLocal: boolean, idPlayer: number) => {
    socket.emit('goal', {
      id: idMatch,
      championshipId: 1,
      playerId: idPlayer,
      minute: minutes(time),
      local: isLocal,
    });
  };

  const disallowGoal = (idGoal: number) => {
    socket.emit('goal:disallow', { goalId: idGoal, id: idMatch, championshipId: 1 });
  };

  const scoreCard = (typeCard: 'YELLOW' | 'RED', isLocal: boolean, idPlayer: number) => {
    socket.emit('card', {
      type: typeCard,
      id: idMatch,
      championshipId: 1,
      minute: minutes(time),
      playerId: idPlayer,
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

  const startGame = () => {
    socket.emit('start', {
      id: idMatch,
      championshipId: 1,
    });
  };

  const endGame = () => {
    socket.emit('end', {
      id: idMatch,
      championshipId: 1,
    });
  };

  const initGame = () => {
    start();
    startGame();
  };

  const finishGame = () => {
    stop();
    endGame();
  };

  const getGoals = (type: 'local' | 'visiting') => {
    if (match) {
      return match[type].goals.map((goal: any) => ({ ...goal.player, id: goal.id, minute: goal.minute }));
    }
    return [];
  };
  const getCards = (type: 'local' | 'visiting', color: 'RED' | 'YELLOW') => {
    if (match) {
      return match[type].cards[color.toLowerCase()].map((card: any) => ({
        ...card.player,
        id: card.id,
        minute: card.minute,
      }));
    }
    return [];
  };
  return (
    <Navbar>
      <Grid container className={classes.container}>
        {!idMatch ? (
          <MatchSelector setSelected={setSelected} matches={matches} />
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
                      className={classes.initOrFinishButton}
                      onClick={!isStarted ? initGame : finishGame}
                    >
                      <Typography variant="body1" className={classes.initOrFinishTypography}>
                        {!isStarted ? 'Inicio' : 'Final  '}
                      </Typography>
                    </Button>
                  )
                }
                componentStop={
                  <>
                    {match?.status === 'FINISHED' && (
                      <Typography className={classes.typographyStatus}>
                        {match?.status === 'FINISHED' ? 'Finalizado' : ''}
                      </Typography>
                    )}{' '}
                  </>
                }
              />
            </Grid>
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Anotar/Desanotar Goles</Typography>
            </Grid>
            <MatchManager
              buttonLeftLocal={{ function: scoreGoal, args: [true], items: currentMatch?.local.players }}
              buttonRightLocal={{ function: disallowGoal, args: [], items: getGoals('local') }}
              buttonLeftVisiting={{
                function: scoreGoal,
                args: [true],
                items: currentMatch?.visiting.players,
              }}
              buttonRightVisiting={{ function: disallowGoal, args: [], items: getGoals('visiting') }}
            />
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Anotar/Desanotar Infracciones</Typography>
            </Grid>

            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Rojas</Typography>
            </Grid>
            <MatchManager
              buttonLeftLocal={{
                function: scoreCard,
                args: ['RED', true],
                items: currentMatch?.local.players,
              }}
              buttonRightLocal={{ function: disallowCard, args: [], items: getCards('local', 'RED') }}
              buttonLeftVisiting={{
                function: scoreCard,
                args: ['RED', false],
                items: currentMatch?.visiting.players,
              }}
              buttonRightVisiting={{ function: disallowCard, args: [], items: getCards('visiting', 'RED') }}
            />
            <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography color="white">Amarillas</Typography>
            </Grid>
            <MatchManager
              buttonLeftLocal={{
                function: scoreCard,
                args: ['YELLOW', true],
                items: currentMatch?.local.players,
              }}
              buttonRightLocal={{ function: disallowCard, args: [], items: getCards('local', 'YELLOW') }}
              buttonLeftVisiting={{
                function: scoreCard,
                args: ['YELLOW', false],
                items: currentMatch?.visiting.players,
              }}
              buttonRightVisiting={{
                function: disallowCard,
                args: [],
                items: getCards('visiting', 'YELLOW'),
              }}
            />
          </>
        )}
      </Grid>
    </Navbar>
  );
};
