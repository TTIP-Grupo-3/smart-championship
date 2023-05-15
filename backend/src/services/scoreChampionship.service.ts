import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EntityManager } from 'typeorm';
import { ScoreStatus } from 'src/entities/scoreStatus.entity';
import { ChampionshipService } from './championship.service';
import { ScoreChampionshipIdDTO } from 'src/dtos/scoreChampionshipId.dto';

@Injectable()
export class ScoreChampionshipService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly championshipService: ChampionshipService,
  ) {}

  async getTeamStatuses(
    championshipIdDTO: ScoreChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Array<ScoreStatus>> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.championshipService.getChampionship(championshipIdDTO, manager);
      return championship.scoreStatuses;
    }, manager);
  }
}
