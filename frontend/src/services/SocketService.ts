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

  protected url = process.env.REACT_APP_API_SERVER_URL!;
  protected abstract readonly namespace: string;

  create(): Socket {
    return io(`${this.url}/${this.namespace}`, this.defaultOptions);
  }
}
