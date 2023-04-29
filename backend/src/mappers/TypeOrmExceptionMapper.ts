import { QueryFailedError, TypeORMError } from 'typeorm';
import { ConsoleLogger } from '@nestjs/common';
import { SmartChampionshipException } from 'src/exceptions/SmartChampionshipException';
import { configService } from 'src/services/config.service';
import { Mapper } from './Mapper';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { UnknownException } from 'src/exceptions/UnknownException';

const errors = configService.get('service.errors');

export class TypeOrmExceptionMapper extends Mapper<Error, SmartChampionshipException> {
  private logger: ConsoleLogger = new ConsoleLogger();

  map(error: Error): SmartChampionshipException {
    this.logger.error(error);
    if (error instanceof TypeORMError) return this.mapTypeORMError(error);
    if (error instanceof SmartChampionshipException) return error;
    return new UnknownException(errors.unknown);
  }

  private mapTypeORMError(error: TypeORMError): SmartChampionshipException {
    if (error instanceof QueryFailedError) return new InvalidArgumentException(errors.invalidArgument);
    return new UnknownException(errors.unknown);
  }
}
