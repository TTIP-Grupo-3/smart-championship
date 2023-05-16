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
    getChampionshipDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Championship> {
    return await this.transactionService.transaction(async (manager) => {
      const { championshipId } = getChampionshipDTO;
      const championship = await this.findChampionship(championshipId, manager);
      return await this.setMatches(championship, manager);
    }, manager);
  }

  async getChampionships(manager?: EntityManager): Promise<Array<Championship>> {
    return await this.transactionService.transaction(async (manager) => {
      return await manager.findBy(Championship, {});
    }, manager);
  }

  private async findChampionship(id: number, manager: EntityManager): Promise<Championship> {
    const championship = await manager.findOneBy(Championship, { id });
    if (!championship) throw new NotFoundException(errors.notFoundChampionship);
    return championship;
  }

  private async setMatches(championship: Championship, manager: EntityManager): Promise<Championship> {
    if (championship instanceof EliminationChampionship) {
      championship.final = await this.findFinal(championship, manager);
    }
    return championship;
  }

  private async findFinal(
    championship: EliminationChampionship,
    manager: EntityManager,
  ): Promise<EliminationMatch> {
    const relations = ['championshipFinal', 'status'];
    const finals = await manager.getTreeRepository(EliminationMatch).findTrees({ relations });
    const final = finals.find(({ championshipFinal }) => championshipFinal?.id === championship.id);
    if (!final) throw new NotFoundException(errors.notFoundChampionship);
    return final;
  }
}
