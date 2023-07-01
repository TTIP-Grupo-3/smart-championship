import { Injectable } from '@nestjs/common';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { EntityManager } from 'typeorm';
import { configService } from './config.service';
import { Championship } from 'src/entities/championship.entity';
import { TransactionService } from './transaction.service';
import { StorageService } from 'src/services/storage.service';
import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';
import { ChampionshipService } from './championship.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const superChampionship = await super.setMatches(championship, manager);
    await this.addLogoTeams(superChampionship);
    return superChampionship;
  }

  private async addLogoTeams(championship: Championship): Promise<Championship> {
    championship.matchTeams.forEach((team) => (team.logo = this.storageService.getImage(team.filename)));
    return championship;
  }
}
