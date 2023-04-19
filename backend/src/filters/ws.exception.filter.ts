import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { WsExceptionMapper } from 'src/mappers/WsExceptionMapper';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  private mapper: WsExceptionMapper = new WsExceptionMapper();
  catch(exception, host: ArgumentsHost) {
    super.catch(this.mapper.map(exception), host);
  }
}
