import { Championship } from 'src/entities/championship.entity';
import { EntityManager } from 'typeorm';
import { ChampionshipService } from './championship.service';
import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { Injectable } from '@nestjs/common';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { TransactionService } from './transaction.service';

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class TeamLeaderChampionshipService extends ChampionshipService {
  constructor(transactionService: TransactionService) {
    super(transactionService);
  }

  protected exists(championship?: Championship): boolean {
    return !!championship && championship.status === ChampionshipStatus.TOSTART;
  }

  protected async setMatches(championship: Championship, manager: EntityManager): Promise<Championship> {
    return championship;
  }
}
