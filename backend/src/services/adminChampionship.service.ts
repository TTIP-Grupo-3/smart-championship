import { Injectable } from '@nestjs/common';
import { CreateChampionshipDTO } from 'src/dtos/createChampionship.dto';
import { EntityManager } from 'typeorm';
import { Championship } from '../entities/championship.entity';
import { TransactionService } from './transaction.service';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { configService } from './config.service';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { ChampionshipService } from './championship.service';
import { EditChampionshipDTO } from 'src/dtos/editChampionship.dto';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class AdminChampionshipService extends ChampionshipService {
  constructor(transactionService: TransactionService) {
    super(transactionService);
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

  async editChampionship(
    championshipIdDTO: ChampionshipIdDTO,
    editChampionshipDTO: EditChampionshipDTO,
    manager?: EntityManager,
  ): Promise<Championship> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.getChampionship(championshipIdDTO, manager);
      championship.edit(editChampionshipDTO);
      const editedChampionship = await this.changeType(championship, editChampionshipDTO, manager);
      return await manager.save(editedChampionship);
    }, manager);
  }

  async startChampionship(
    championshipIdDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Championship> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.getChampionship(championshipIdDTO, manager);
      championship.startChampionship();
      return await manager.save(championship);
    }, manager);
  }

  protected exists(championship?: Championship): boolean {
    return !!championship;
  }

  protected filterChampionships(championships: Array<Championship>): Array<Championship> {
    return championships;
  }

  protected async setMatches(championship: Championship, manager: EntityManager): Promise<Championship> {
    return championship;
  }

  private newChampionship(
    createChampionshipDTO: {
      name: string;
      date: Date;
      size: number;
      price: number;
      duration: number;
      teamSize: number;
      type: ChampionshipType;
    },
    manager: EntityManager,
  ): Championship {
    const { name, date, size, price, duration, teamSize, type } = createChampionshipDTO;
    const ChampionshipSubclass = this.getChampionshipSubclass(type);
    return manager.create<Championship>(ChampionshipSubclass, {
      name,
      date,
      enrollment: { size, price, teamEnrollments: [] },
      duration,
      teamSize,
    });
  }

  private async changeType(
    championship: Championship,
    editChampionshipDTO: EditChampionshipDTO,
    manager: EntityManager,
  ): Promise<Championship> {
    const { type } = editChampionshipDTO;
    if (type) {
      const ChampionshipSubclass = this.getChampionshipSubclass(type);
      const { enrollment, ...plainChampionship } = championship;
      const newChampionship = manager.create<Championship>(ChampionshipSubclass, plainChampionship);
      await manager.remove(championship);
      await manager.save(enrollment);
      newChampionship.enrollment = enrollment;
      return newChampionship;
    }
    return championship;
  }

  private getChampionshipSubclass(type: ChampionshipType) {
    const championshipSubclasses = {
      [ChampionshipType.ELIMINATION]: EliminationChampionship,
      [ChampionshipType.SCORE]: ScoreChampionship,
    };
    return championshipSubclasses[type];
  }
}
