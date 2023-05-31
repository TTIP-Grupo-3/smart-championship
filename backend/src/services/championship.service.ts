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
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { CreateChampionshipDTO } from 'src/dtos/createChampionship.dto';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';

const errors = configService.get('service.errors');

export enum ChampionshipType {
  ELIMINATION = 'elimination',
  SCORE = 'score',
}

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ChampionshipService {
  constructor(
    private readonly transactionService: TransactionService,
    private storageService: StorageService,
  ) {}

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

  async createChampionship(
    createChampionshipDTO: CreateChampionshipDTO,
    manager?: EntityManager,
  ): Promise<Championship> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = this.newChampionship(createChampionshipDTO, manager);
      return await manager.save(championship);
    }, manager);
  }

  private newChampionship(
    createChampionshipDTO: CreateChampionshipDTO,
    manager: EntityManager,
  ): Championship {
    const championshipSubclasses = {
      [ChampionshipType.ELIMINATION]: EliminationChampionship,
      [ChampionshipType.SCORE]: ScoreChampionship,
    };
    const { name, date, size, price, type } = createChampionshipDTO;
    const ChampionshipSubclass = championshipSubclasses[type];
    return manager.create<Championship>(ChampionshipSubclass, { name, date, size, price });
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
