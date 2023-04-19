import { WsException } from '@nestjs/websockets';
import { SmartChampionshipException } from 'src/exceptions/SmartChampionshipException';
import { Mapper } from './Mapper';
import { configService } from 'src/services/config.service';

const errors = configService.get('service.errors');

export class WsExceptionMapper extends Mapper<Error, WsException> {
  map(error: Error): WsException {
    if (error instanceof SmartChampionshipException) return error.wsException();
    if (error instanceof WsException) return error;
    return new WsException(errors.unknown);
  }
}
