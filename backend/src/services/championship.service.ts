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
import { StorageService } from 'src/services/storage.service';

const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ChampionshipService {
  constructor(
    private readonly transactionService: TransactionService,
    private storageService: StorageService,
  ) {}

  async getChampionship(id: number, manager?: EntityManager): Promise<Championship> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.findChampionship(manager, id);

      return championship;
    }, manager);
  }

  private async findChampionship(manager: EntityManager, id: number): Promise<EliminationChampionship> {
    const finals = await manager
      .getTreeRepository(EliminationMatch)
      .findTrees({ relations: ['championshipFinal', 'status'] });
    const final = finals.find(({ championshipFinal }) => championshipFinal?.id === id);
    if (!final) throw new NotFoundException(errors.notFoundChampionship);
    final.championshipFinal.final = final;
    return await this.addLogoTeams(final.championshipFinal);
  }

  private async addLogoTeams(championship: EliminationChampionship): Promise<EliminationChampionship> {
    championship.final.teams().forEach((team) => {
      team.logo = this.storageService.getImage(`${team.id}.png`);
    });
    return championship;
  }
}
