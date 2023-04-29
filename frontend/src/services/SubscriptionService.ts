import { Socket } from 'socket.io-client';
import { SocketService } from './SocketService';

export abstract class SubscriptionService extends SocketService {
  subscribe(socket: Socket, data?: any) {
    socket.emit('subscribe', data);
  }

  unsubscribe(socket: Socket, data?: any) {
    socket.emit('unsubscribe', data);
  }

  exception(socket: Socket, cb: (algo: any) => void) {
    socket.on('exception', cb);
  }
}
