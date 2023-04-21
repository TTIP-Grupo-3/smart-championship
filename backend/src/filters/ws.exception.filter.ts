import { ArgumentsHost, Catch, ConsoleLogger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { WsExceptionMapper } from 'src/mappers/WsExceptionMapper';

@Catch()
export class WsExceptionFilter extends BaseWsExceptionFilter {
  private mapper: WsExceptionMapper = new WsExceptionMapper();
  private logger: ConsoleLogger = new ConsoleLogger();
  catch(exception, host: ArgumentsHost) {
    this.logger.error(exception);
    super.catch(this.mapper.map(exception), host);
  }
}
