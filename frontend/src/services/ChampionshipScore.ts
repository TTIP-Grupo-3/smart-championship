import { Socket } from 'socket.io-client';
import { SocketService } from './SocketService';

export class ChampionshipScoreService extends SocketService {
  protected readonly namespace = 'championship/score';

  teams(socket: Socket, championshipId: number) {
    socket.emit('teams', { championshipId: championshipId });
  }
}
