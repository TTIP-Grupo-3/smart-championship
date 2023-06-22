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
import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';
import { ChampionshipService } from './championship.service';

const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class AllChampionshipService extends ChampionshipService {
  constructor(transactionService: TransactionService, private storageService: StorageService) {
    super(transactionService);
  }

  protected exists(championship?: Championship): boolean {
    return !!championship && championship.status !== ChampionshipStatus.TOSTART;
  }

  protected async setMatches(championship: Championship, manager: EntityManager): Promise<Championship> {
    if (championship instanceof EliminationChampionship) {
      championship.final = await this.findFinal(championship, manager);
    }
    await this.addLogoTeams(championship);
    return championship;
  }

  private async addLogoTeams(championship: Championship): Promise<Championship> {
    championship.matchTeams.forEach((team) => (team.logo = this.storageService.getImage(`${team.id}.png`)));
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
