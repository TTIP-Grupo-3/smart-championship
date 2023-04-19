import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EntityManager } from 'typeorm';
import { ChampionshipPlayer } from 'src/entities/championshipPlayer.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { configService } from './config.service';

const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ChampionshipPlayerService {
  constructor(private readonly transactionSrvice: TransactionService) {}

  async findOne(id: number, manager?: EntityManager): Promise<ChampionshipPlayer> {
    return await this.transactionSrvice.transaction(async (manager) => {
      const championshipPlayer = await manager.findOneBy(ChampionshipPlayer, { id });
      if (!championshipPlayer) throw new NotFoundException(errors.notFound);
      return championshipPlayer;
    }, manager);
  }
}
