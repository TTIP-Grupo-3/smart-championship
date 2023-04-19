import { Socket } from 'dgram';
import { io, ManagerOptions, SocketOptions } from 'socket.io-client';

export class SocketService {
  defaultOptions: Partial<ManagerOptions & SocketOptions> = {
    autoConnect: false,
    upgrade: true,
    path: '/',
    transports: ['websocket', 'polling', 'flashsocket'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000,
  };

  url = 'http://localhost:3001';

  create(options?: SocketOptions) {
    return io(this.url, { ...this.defaultOptions, ...options });
  }

  emitSubscribe(socket: any, data: any) {
    socket.emit('subscribe', data);

    socket.on('connect', () => socket.emit('subscribe', data));
  }

  emitUnsubscribe(socket: any, data: any) {
    socket.emit('unsubscribe', data);

    socket.removeListener('connect');
  }

  subscribe(topic: string, socket: Socket, data: any) {
    socket.emit(topic, data);
  }

  unSubscribe(topic: string, socket: Socket, data: any) {
    socket.emit(topic, data);
  }
}
