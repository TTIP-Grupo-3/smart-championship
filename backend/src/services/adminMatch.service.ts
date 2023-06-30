import { MatchService } from './match.service';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { Injectable } from '@nestjs/common';
import { configService } from './config.service';
import { TransactionService } from './transaction.service';
import { AdminChampionshipService } from './adminChampionship.service';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { Match } from 'src/entities/match.entity';
import { EntityManager } from 'typeorm';
import { Phase } from 'src/entities/phase.entity';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class AdminMatchService extends MatchService {
  constructor(transactionService: TransactionService, championshipService: AdminChampionshipService) {
    super(transactionService, championshipService);
  }

  async championshipMatches(
    matchesDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Array<Match | Phase>> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.championshipService.getChampionship(matchesDTO, manager);
      return championship.adminMatches;
    }, manager);
  }
}
