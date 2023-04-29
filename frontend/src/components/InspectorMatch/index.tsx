/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useTimer } from '../../hooks/useTimer';
import { API_MATCH } from '../../services/Match';
import { MatchService } from '../../services/MatchService';
import { MatchManager } from '../MatchManager';
import { MatchScoreResult } from '../MatchScoreResult';
import { useStyles } from './style';

const matchService = new MatchService();

export const InspectorMatch: FC<{ idMatch: number }> = ({ idMatch }) => {
  const [match, setMatch] = useState<any>();
  const [currentMatch, setCurrentMatch] = useState<any>();
  const { minutes, seconds, start, stop, isStarted, time } = useTimer(0);
  const [socket, setSocket] = useState<Socket>();
  const { classes } = useStyles();

  useEffect(() => {
    API_MATCH.getMatch(1, idMatch).then(({ data }) => setCurrentMatch(data));
    const socketCreated = matchService.create();
    setSocket(socketCreated);
    socketCreated.on('match', (data: any) => setMatch(data));
    matchService.subscribe(socketCreated, { id: idMatch, championshipId: 1 });
    return () => matchService.unsubscribe(socketCreated);
  }, []);

  const scoreGoal = (isLocal: boolean, idPlayer: number) => {
    matchService.goal(socket!, idMatch, idPlayer, 1, minutes(time), isLocal);
  };

  const disallowGoal = (idGoal: number) => {
    matchService.goalDisallow(socket!, idGoal, idMatch, 1);
  };

  const scoreCard = (typeCard: 'YELLOW' | 'RED', isLocal: boolean, idPlayer: number) => {
    matchService.scoreCard(socket!, typeCard, minutes(time), isLocal, idPlayer, idMatch, 1);
  };

  const disallowCard = (cardId: number) => {
    matchService.disallowCard(socket!, cardId, idMatch, 1);
  };

  const initGame = () => {
    start();
    matchService.startGame(socket!, idMatch!, 1);
  };

  const finishGame = () => {
    stop();
    matchService.endGame(socket!, idMatch!, 1);
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
    <>
      {' '}
      <Grid className={classes.containerResult}>
        <MatchScoreResult
          match={match}
          showTime={match?.status !== 'FINISHED'}
          time={`${minutes(time)}:${seconds(time)}`}
          componentStart={
            match?.status !== 'FINISHED' && (
              <Button className={classes.initOrFinishButton} onClick={!isStarted ? initGame : finishGame}>
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
  );
};
