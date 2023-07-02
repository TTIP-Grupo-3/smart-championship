import { Injectable } from '@nestjs/common';
import { CreateChampionshipDTO } from 'src/dtos/createChampionship.dto';
import { DeepPartial, EntityManager } from 'typeorm';
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
import { Class } from 'src/utils/types';

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
      const championship = manager.create<Championship>(
        this.getChampionshipSubclass(createChampionshipDTO.type),
        this.plainChampionship(createChampionshipDTO),
      );
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
      return await manager.save(championship);
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

  private plainChampionship(createChampionshipDTO: CreateChampionshipDTO): DeepPartial<Championship> {
    const {
      name,
      size,
      price,
      duration,
      teamSize,
      date,
      payData: { name: payDataName, cuit, cbu, alias },
    } = createChampionshipDTO;
    const payData = { name: payDataName, cuit, cbu, alias };
    const enrollment = { size, payData, price, teamEnrollments: [] };
    return { name, date, enrollment, duration, teamSize };
  }

  private getChampionshipSubclass(type: ChampionshipType): Class<Championship> {
    const championshipSubclasses = {
      [ChampionshipType.ELIMINATION]: EliminationChampionship,
      [ChampionshipType.SCORE]: ScoreChampionship,
    };
    return championshipSubclasses[type];
  }
}
