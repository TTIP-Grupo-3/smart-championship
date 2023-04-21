import { Injectable } from '@nestjs/common';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { EntityManager } from 'typeorm';
import { configService } from './config.service';
import { MatchIdDTO } from 'src/dtos/matchId.dto';
import { Goal } from 'src/entities/goal.entity';
import { TransactionService } from './transaction.service';
import { GoalDTO } from 'src/dtos/goal.dto';
import { ChampionshipPlayerService } from './championshipPlayer.service';
import { Card } from 'src/entities/card.entity';
import { CardDTO } from 'src/dtos/card.dto';
import { ChampionshipService } from './championship.service';
import { DisallowGoalDTO } from 'src/dtos/disallowGoal.dto';
import { DisallowCardDTO } from 'src/dtos/disallowCard.dto';
import { Match } from 'src/entities/match.entity';

const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class MatchService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly championshipPlayerService: ChampionshipPlayerService,
    private readonly championshipService: ChampionshipService,
  ) {}

  async findOne(matchUpdateDTO: MatchIdDTO, manager?: EntityManager): Promise<EliminationMatch> {
    return await this.transactionService.transaction(async (manager) => {
      const { id, championshipId } = matchUpdateDTO;
      const championship = (await this.championshipService.getChampionship(
        championshipId,
        manager,
      )) as EliminationChampionship;
      const match = championship.findMatch(id);
      if (!match) throw new NotFoundException(errors.notFound);
      match.championship = championship;
      return match;
    }, manager);
  }

  async matches(championshipId: number, manager?: EntityManager): Promise<Array<Match>> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = (await this.championshipService.getChampionship(
        championshipId,
        manager,
      )) as EliminationChampionship;
      return championship.matches();
    }, manager);
  }

  async start(startDTO: MatchIdDTO, manager?: EntityManager): Promise<EliminationMatch> {
    return await this.transactionService.transaction(async (manager) => {
      const match = await this.findOne(startDTO, manager);
      match.start();
      return await manager.save(EliminationMatch, match);
    }, manager);
  }

  async end(endDTO: MatchIdDTO, manager?: EntityManager): Promise<EliminationMatch> {
    return await this.transactionService.transaction(async (manager) => {
      const match = await this.findOne(endDTO, manager);
      match.end();
      return await manager.save(EliminationMatch, match);
    }, manager);
  }

  async goal(goalDTO: GoalDTO, manager?: EntityManager): Promise<EliminationMatch> {
    return await this.transactionService.transaction(async (manager) => {
      const { minute, playerId, local } = goalDTO;
      const match = await this.findOne(goalDTO, manager);
      const player = await this.championshipPlayerService.findOne(playerId, manager);
      const goal = manager.create<Goal>(Goal, { minute, player });
      match.goal(goal, local);
      return await manager.save(EliminationMatch, match);
    }, manager);
  }

  async card(cardDTO: CardDTO, manager?: EntityManager): Promise<EliminationMatch> {
    return await this.transactionService.transaction(async (manager) => {
      const { type, minute, playerId, local } = cardDTO;
      const match = await this.findOne(cardDTO, manager);
      const player = await this.championshipPlayerService.findOne(playerId, manager);
      const card = manager.create<Card>(Card, { type, minute, player });
      match.card(card, local);
      return await manager.save(EliminationMatch, match);
    }, manager);
  }

  async disallowCard(disallowCardDTO: DisallowCardDTO): Promise<EliminationMatch> {
    return await this.transactionService.transaction(async (manager) => {
      const { cardId: id } = disallowCardDTO;
      const { affected } = await manager.delete(Card, { id });
      if (affected === 0) throw new NotFoundException();
      return await this.findOne(disallowCardDTO, manager);
    });
  }

  async disallowGoal(disallowGoalDTO: DisallowGoalDTO): Promise<EliminationMatch> {
    return await this.transactionService.transaction(async (manager) => {
      const { goalId: id } = disallowGoalDTO;
      const { affected } = await manager.delete(Goal, { id });
      if (affected === 0) throw new NotFoundException();
      return await this.findOne(disallowGoalDTO, manager);
    });
  }
}
