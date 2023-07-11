import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EntityManager } from 'typeorm';
import { ScoreStatus } from 'src/entities/scoreStatus.entity';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { ChampionshipTeam } from 'src/entities/championshipTeam.entity';
import { ScoreMatch } from 'src/entities/scoreMatch.entity';

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ScoreChampionshipService {
  constructor(private readonly transactionService: TransactionService) {}

  async getTeamStatuses(
    championshipIdDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Array<ScoreStatus>> {
    return await this.transactionService.transaction(async (manager) => {
      const { championshipId } = championshipIdDTO;
      const championship = await this.findScoreChampionship(championshipId, manager);
      return championship.scoreStatuses;
    }, manager);
  }

  private async findScoreChampionship(id: number, manager: EntityManager): Promise<ScoreChampionship> {
    const championship = await manager.findOne(ScoreChampionship, {
      where: { id },
      loadEagerRelations: false,
    });
    if (!championship) throw new NotFoundException();
    championship.teams = await manager.find(ChampionshipTeam, { where: { championship: { id } } });
    championship.matches = await manager.find(ScoreMatch, { where: { championship: { id } } });
    return championship;
  }
}
