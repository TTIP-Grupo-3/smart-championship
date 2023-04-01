import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { SmartChampionshipToHttpExceptionMapper } from 'src/mappers/SmartChampionshipToHttpExceptionMapper';
import { SmartChampionshipException } from 'src/exceptions/SmartChampionshipException';
import { Mapper } from 'src/mappers/Mapper';

@Catch(SmartChampionshipException)
export class SmartChampionshipExceptionFilter implements ExceptionFilter {
  private mapper: Mapper<Error, HttpException> = new SmartChampionshipToHttpExceptionMapper();

  catch(exception: SmartChampionshipException, host: ArgumentsHost) {
    throw this.mapper.map(exception);
  }
}
