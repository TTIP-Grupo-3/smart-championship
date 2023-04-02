import { Mapper } from './Mapper';
import { HttpException, BadRequestException, NotFoundException, ConsoleLogger } from '@nestjs/common';
import { SmartChampionshipException } from 'src/exceptions/SmartChampionshipException';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { NotFoundException as SmartchampionshipNotFoundException } from 'src/exceptions/NotFoundException';
import { configService } from 'src/services/config.service';

const errors = configService.get('controller.errors');

export class SmartChampionshipToHttpExceptionMapper extends Mapper<Error, HttpException> {
  private logger: ConsoleLogger = new ConsoleLogger();
  private exceptions = [SmartchampionshipNotFoundException, InvalidArgumentException];
  private httpErrors = {
    NotFoundException: NotFoundException,
    InvalidArgumentException: BadRequestException,
  };

  map(error: Error): HttpException {
    this.logger.error(error);
    if (error instanceof SmartChampionshipException) {
      return this.mapSmartChampionshipException(error);
    }
    if (error instanceof HttpException) return error;
    return new BadRequestException(errors.badRequest);
  }

  private mapSmartChampionshipException(error: SmartChampionshipException) {
    const ExceptionType: typeof SmartChampionshipException | undefined = this.exceptions.find(
      (type) => error instanceof type,
    );
    const [Exception, message] =
      ExceptionType !== undefined
        ? [this.httpErrors[ExceptionType.name], error.message]
        : [BadRequestException, errors.badRequest];
    return new Exception(message);
  }
}
