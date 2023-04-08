import { HttpException } from '@nestjs/common';
import { SmartChampionshipToHttpExceptionMapper } from 'src/mappers/SmartChampionshipToHttpExceptionMapper';
import { ExceptionMapperExecutor } from './ExceptionMapperExecutor';

export class SmartChampionshipExceptionMapperExecutor extends ExceptionMapperExecutor<
  Error,
  HttpException
> {
  constructor() {
    super(new SmartChampionshipToHttpExceptionMapper());
  }
}
