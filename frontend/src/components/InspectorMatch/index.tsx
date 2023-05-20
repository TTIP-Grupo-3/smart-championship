/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { useTimer } from '../../hooks/useTimer';
import { InspectorMatchProps } from '../../interfaces';
import { API_MATCH } from '../../services/Match';
import { MatchService } from '../../services/MatchService';
import { MatchManager } from '../MatchManager';
import { MatchScoreResult } from '../MatchScoreResult';
import { useStyles } from './style';
import CloseIcon from '@mui/icons-material/Close';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { MatchTeamCard } from '../MatchTeamCard';
import { EliminationInspectorDialog } from '../EliminationInspectorDialog';

const matchService = new MatchService();

export const InspectorMatch: FC<InspectorMatchProps> = ({ idMatch, setSelected, championshipId, type }) => {
  const [match, setMatch] = useState<any>();
  const [currentMatch, setCurrentMatch] = useState<any>();
  const { minutes, seconds, start, stop, isStarted, time } = useTimer(0);
  const [socket, setSocket] = useState<Socket>();
  const [open, setOpen] = useState<boolean>(false);
  const { classes } = useStyles();

  useEffect(() => {
    API_MATCH.getMatch(+championshipId!, idMatch).then(({ data }) => setCurrentMatch(data));
    const socketCreated = matchService.create();
    setSocket(socketCreated);
    socketCreated.on('match', (data: any) => setMatch(data));
    matchService.subscribe(socketCreated, {
      id: idMatch,
      championshipId: +championshipId!,
      championshipType: type,
    });
    return () => matchService.unsubscribe(socketCreated);
  }, []);
  const scoreGoal = (isLocal: boolean, idPlayer: number) => {
    matchService.goal(socket!, idMatch, idPlayer, +championshipId!, minutes(time), isLocal, type);
  };

  const disallowGoal = (idGoal: number) => {
    matchService.goalDisallow(socket!, idGoal, idMatch, +championshipId!);
  };

  const scoreCard = (typeCard: 'YELLOW' | 'RED', isLocal: boolean, idPlayer: number) => {
    matchService.scoreCard(socket!, typeCard, minutes(time), isLocal, idPlayer, idMatch, +championshipId!);
  };

  const disallowCard = (cardId: number) => {
    matchService.disallowCard(socket!, cardId, idMatch, +championshipId!);
  };

  const initGame = () => {
    start();
    matchService.startGame(socket!, idMatch!, +championshipId!);
  };

  const finishGame = () => {
    if (isEliminationTied()) {
      setOpen(true);
    } else {
      stop();
      matchService.endGame(socket!, idMatch!, +championshipId!);
    }
  };

  const getGoals = (type: 'local' | 'visiting') => {
    if (match) {
      return match[type].goals.map((goal: any) => ({ ...goal.player, id: goal.id, minute: goal.minute }));
    }
    return [];
  };

  const isEliminationTied = () => {
    return type === 'elimination' && match.local.goals.length === match.visiting.goals.length;
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

  const handleBack = () => {
    setSelected(null);
  };

  return (
    <>
      {' '}
      <Grid classes={{ root: classes.containerResult }}>
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
          args: [false],
          items: currentMatch?.visiting.players,
        }}
        buttonRightProps={{ disabled: match?.local.goals.length < 1 }}
        buttonRightPropsVisiting={{ disabled: match?.visiting.goals.length < 1 }}
        buttonRightVisiting={{ function: disallowGoal, args: [], items: getGoals('visiting') }}
        icons={{
          left: <SportsSoccerIcon style={{ position: 'absolute', color: 'white' }} />,
          right: (
            <Grid display="flex" alignItems="center" justifyContent="center">
              <SportsSoccerIcon
                style={{
                  position: 'absolute',
                  color: 'white',
                }}
              ></SportsSoccerIcon>
              <CloseIcon style={{ position: 'absolute', color: 'red', fontSize: 40 }}></CloseIcon>
            </Grid>
          ),
        }}
      />
      <Grid container direction="column" alignItems="center" justifyContent="center" padding={2}>
        <Typography color="white">Anotar/Desanotar Infracciones</Typography>
      </Grid>
      <MatchManager
        buttonLeftLocal={{
          function: scoreCard,
          args: ['RED', true],
          items: currentMatch?.local.players,
        }}
        buttonRightProps={{ disabled: match?.local.cards.red.length < 1 }}
        buttonRightPropsVisiting={{ disabled: match?.visiting.cards.red.length < 1 }}
        buttonRightLocal={{ function: disallowCard, args: [], items: getCards('local', 'RED') }}
        buttonLeftVisiting={{
          function: scoreCard,
          args: ['RED', false],
          items: currentMatch?.visiting.players,
        }}
        buttonRightVisiting={{ function: disallowCard, args: [], items: getCards('visiting', 'RED') }}
        icons={{
          left: <MatchTeamCard color="red" absolute amount={1} width={16} height={20} />,
          right: (
            <Grid display="flex" alignItems="center" justifyContent="center">
              <MatchTeamCard color="red" absolute amount={1} width={16} height={20} />
              <CloseIcon style={{ position: 'absolute', color: 'white', fontSize: 40 }}></CloseIcon>
            </Grid>
          ),
        }}
      />
      <Grid container direction="column" alignItems="center" justifyContent="center" paddingTop={3}></Grid>
      <MatchManager
        buttonLeftLocal={{
          function: scoreCard,
          args: ['YELLOW', true],
          items: currentMatch?.local.players,
        }}
        buttonRightProps={{ disabled: match?.local.cards.yellow.length < 1 }}
        buttonRightPropsVisiting={{ disabled: match?.visiting.cards.yellow.length < 1 }}
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
        icons={{
          left: <MatchTeamCard color="yellow" absolute amount={1} width={16} height={20} />,
          right: (
            <Grid display="flex" alignItems="center" justifyContent="center">
              <MatchTeamCard color="yellow" absolute amount={1} width={16} height={20} />
              <CloseIcon style={{ position: 'absolute', color: 'red', fontSize: 40 }}></CloseIcon>
            </Grid>
          ),
        }}
      />
      <Button onClick={handleBack} style={{ color: 'white', backgroundColor: '#bf360c', marginTop: 30 }}>
        Volver a partidos
      </Button>
      <EliminationInspectorDialog open={open} setOpen={setOpen} />
    </>
  );
};
