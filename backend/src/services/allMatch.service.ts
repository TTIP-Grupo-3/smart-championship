import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { MatchService } from './match.service';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { Injectable } from '@nestjs/common';
import { configService } from './config.service';
import { TransactionService } from './transaction.service';
import { AllChampionshipService } from './allChampionship.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class AllMatchService extends MatchService {
  constructor(transactionService: TransactionService, championshipService: AllChampionshipService) {
    super(transactionService, championshipService);
  }
}
