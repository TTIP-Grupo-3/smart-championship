import { Injectable } from '@nestjs/common';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { EntityManager } from 'typeorm';
import { DataSource } from 'typeorm';
import { configService } from './config.service';

const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ChampionshipService {
  constructor(private readonly dataSource: DataSource, private readonly mapper: EntityToDTOMapper) {}

  async getChampionship(id: number): Promise<EliminationChampionshipResponseDTO> {
    return await this.dataSource.transaction(async (manager) => {
      const championship = await this.findChampionship(manager, id);
      return this.mapper.map(championship);
    });
  }

  private async findChampionship(manager: EntityManager, id: number): Promise<EliminationChampionship> {
    const finals = await manager
      .getTreeRepository(EliminationMatch)
      .findTrees({ relations: ['championshipFinal', 'status'] });
    const final = finals.find(({ championshipFinal }) => championshipFinal?.id === id);
    if (!final) throw new NotFoundException(errors.notFoundChampionship);
    final.championshipFinal.final = final;
    return final.championshipFinal;
  }
}
