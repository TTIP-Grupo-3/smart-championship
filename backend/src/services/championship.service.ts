import { Injectable } from '@nestjs/common';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { EntityManager } from 'typeorm';
import { configService } from './config.service';
import { Championship } from 'src/entities/championship.entity';
import { TransactionService } from './transaction.service';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';

const errors = configService.get('service.errors');

export enum ChampionshipType {
  ELIMINATION = 'elimination',
  SCORE = 'score',
}

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ChampionshipService {
  constructor(private readonly transactionService: TransactionService) {}

  async getChampionship(
    getChampionshipDTO: ChampionshipIdDTO<ChampionshipType.ELIMINATION>,
    manager?: EntityManager,
  ): Promise<EliminationChampionship>;
  async getChampionship(
    getChampionshipDTO: ChampionshipIdDTO<ChampionshipType.SCORE>,
    manager?: EntityManager,
  ): Promise<ScoreChampionship>;
  async getChampionship(
    getChampionshipDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Championship>;
  async getChampionship(
    getChampionshipDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Championship> {
    return await this.transactionService.transaction(async (manager) => {
      const { championshipId, championshipType } = getChampionshipDTO;
      if (championshipType === ChampionshipType.ELIMINATION) {
        return await this.findEliminationChampionship(manager, championshipId);
      } else {
        return await this.findScoreChampionship(manager, championshipId);
      }
    }, manager);
  }

  async getChampionships(manager?: EntityManager): Promise<Array<Championship>> {
    return await this.transactionService.transaction(async (manager) => {
      return await manager.findBy(Championship, {});
    }, manager);
  }

  private async findEliminationChampionship(
    manager: EntityManager,
    id: number,
  ): Promise<EliminationChampionship> {
    const finals = await manager
      .getTreeRepository(EliminationMatch)
      .findTrees({ relations: ['championshipFinal', 'status'] });
    const final = finals.find(({ championshipFinal }) => championshipFinal?.id === id);
    if (!final) throw new NotFoundException(errors.notFoundChampionship);
    final.championshipFinal.final = final;
    return final.championshipFinal;
  }

  private async findScoreChampionship(manager: EntityManager, id: number): Promise<ScoreChampionship> {
    const championship = await manager.findOneBy(ScoreChampionship, { id });
    if (!championship) throw new NotFoundException(errors.notFoundChampionship);
    return championship;
  }
}
