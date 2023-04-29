import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export class SocketService {
  defaultOptions: Partial<ManagerOptions & SocketOptions> = {
    autoConnect: true,
    upgrade: true,
    path: '/socket.io',
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 3000,
  };

  url = 'ws://localhost:3001';

  create(namespace: string): Socket {
    return io(`${this.url}/${namespace}`, this.defaultOptions);
  }

  subscribe(socket: Socket, data?: any) {
    socket.emit('subscribe', data);
  }

  unsubscribe(socket: Socket, data?: any) {
    socket.emit('unsubscribe', data);
  }
}
