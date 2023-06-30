import { Injectable } from '@nestjs/common';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { EntityManager } from 'typeorm';
import { configService } from './config.service';
import { MatchIdDTO } from 'src/dtos/matchId.dto';
import { TransactionService } from './transaction.service';
import { ChampionshipPlayerService } from './championshipPlayer.service';
import { AllChampionshipService } from './allChampionship.service';
import { Match } from 'src/entities/match.entity';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';

const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class MatchService {
  constructor(
    protected readonly transactionService: TransactionService,
    protected readonly championshipPlayerService: ChampionshipPlayerService,
    protected readonly championshipService: AllChampionshipService,
  ) {}

  async findOne(findOneDTO: MatchIdDTO, manager?: EntityManager): Promise<Match> {
    return await this.transactionService.transaction(async (manager) => {
      const { id } = findOneDTO;
      const championship = await this.championshipService.getChampionship(findOneDTO, manager);
      const match = championship.findMatch(id);
      if (!this.exists(match)) throw new NotFoundException(errors.notFound);
      match.championship = championship;
      return match;
    }, manager);
  }

  async matches(matchesDTO: ChampionshipIdDTO, manager?: EntityManager): Promise<Array<Match>> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.championshipService.getChampionship(matchesDTO, manager);
      return championship.matches.filter((match) => this.exists(match));
    }, manager);
  }

  protected exists(match?: Match): boolean {
    return !!match;
  }
}
