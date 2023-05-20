/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { io, ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export abstract class SocketService {
  private get defaultOptions(): Partial<ManagerOptions & SocketOptions> {
    return {
      auth: { token: `Bearer ${localStorage.getItem('token')}` },
      autoConnect: true,
      upgrade: true,
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 3000,
    };
  }

  exception(socket: Socket, cb: (algo: any) => void) {
    socket.on('exception', cb);
  }
  protected url = process.env.REACT_APP_API_SERVER_URL!;
  protected abstract readonly namespace: string;

  create(): Socket {
    const socket = io(`${this.url}/${this.namespace}`, this.defaultOptions);
    this.exception(socket, (data) => {
      if (data.message === 'Unauthorized') {
        window.location.href = `${window.location.origin}/login`;
        localStorage.removeItem('token');
      }
    });

    return socket;
  }
}
