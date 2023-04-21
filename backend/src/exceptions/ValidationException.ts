import { WsException } from '@nestjs/websockets';
import { SmartChampionshipException } from './SmartChampionshipException';
import { ValidationError } from 'class-validator';

export class ValidationException extends SmartChampionshipException {
  constructor(private errors: Array<ValidationError>) {
    super(errors ?? 'Bad request', 400);
  }

  wsException(): WsException {
    return new WsException(this.errors);
  }
}
