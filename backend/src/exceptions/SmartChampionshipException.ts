import { HttpException } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export abstract class SmartChampionshipException extends HttpException {
  wsException(): WsException {
    return new WsException(this.message);
  }
}
