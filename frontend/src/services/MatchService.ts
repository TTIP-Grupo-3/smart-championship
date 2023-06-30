import { Socket } from 'socket.io-client';
import { CardsType } from '../interfaces';
import { SubscriptionService } from './SubscriptionService';

export class MatchService extends SubscriptionService {
  protected readonly namespace = 'match';

  goal(
    socket: Socket,
    idMatch: number,
    idPlayer: number,
    championshipId: number,
    minute: number,
    local: boolean,
    type: string,
  ): void {
    socket.emit('goal', {
      id: idMatch,
      championshipId: championshipId,
      playerId: idPlayer,
      minute: minute,
      local: local,
      championshipType: type,
    });
  }

  disallowGoal(socket: Socket, idGoal: number, idMatch: number, championshipId: number, type: string) {
    socket.emit('goal:disallow', {
      goalId: idGoal,
      id: idMatch,
      championshipId: championshipId,
      championshipType: type,
    });
  }

  scoreCard = (
    socket: Socket,
    typeCard: CardsType,
    time: number,
    isLocal: boolean,
    idPlayer: number,
    idMatch: number,
    championshipId: number,
  ) => {
    socket.emit('card', {
      type: typeCard,
      id: idMatch,
      championshipId: championshipId,
      minute: time,
      playerId: idPlayer,
      local: isLocal,
    });
  };

  disallowCard(socket: Socket, cardId: number, idMatch: number, championshipId: number) {
    socket.emit('card:disallow', {
      cardId: cardId,
      id: idMatch,
      championshipId: championshipId,
    });
  }

  startGame = (socket: Socket, idMatch: number, championshipId: number) => {
    socket.emit('start', { id: idMatch, championshipId: championshipId });
  };

  endGame(socket: Socket, idMatch: number, championshipId: number) {
    socket.emit('end', {
      id: idMatch,
      championshipId: championshipId,
    });
  }

  goalDisallow(socket: Socket, idGoal: number, idMatch: number, championshipId: number) {
    socket.emit('goal:disallow', {
      goalId: idGoal,
      id: idMatch,
      championshipId: championshipId,
    });
  }
}
