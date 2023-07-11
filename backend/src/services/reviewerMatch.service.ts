import { MatchService } from './match.service';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { Injectable } from '@nestjs/common';
import { configService } from './config.service';
import { TransactionService } from './transaction.service';
import { ChampionshipPlayerService } from './championshipPlayer.service';
import { AllChampionshipService } from './allChampionship.service';
import { Match } from 'src/entities/match.entity';
import { MatchIdDTO } from 'src/dtos/matchId.dto';
import { EntityManager } from 'typeorm';
import { GoalDTO } from 'src/dtos/goal.dto';
import { Goal } from 'src/entities/goal.entity';
import { CardDTO } from 'src/dtos/card.dto';
import { Card } from 'src/entities/card.entity';
import { DisallowCardDTO } from 'src/dtos/disallowCard.dto';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { DisallowGoalDTO } from 'src/dtos/disallowGoal.dto';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ReviewerMatchService extends MatchService {
  constructor(
    transactionService: TransactionService,
    championshipService: AllChampionshipService,
    protected readonly championshipPlayerService: ChampionshipPlayerService,
  ) {
    super(transactionService, championshipService);
  }

  async start(startDTO: MatchIdDTO, manager?: EntityManager): Promise<Match> {
    return await this.transactionService.transaction(async (manager) => {
      const match = await this.findOne(startDTO, manager);
      match.start();
      return await this.save(match, manager);
    }, manager);
  }

  async end(endDTO: MatchIdDTO, manager?: EntityManager): Promise<Match> {
    return await this.transactionService.transaction(async (manager) => {
      const match = await this.findOne(endDTO, manager);
      match.end();
      return await this.save(match, manager);
    }, manager);
  }

  async goal(goalDTO: GoalDTO, manager?: EntityManager): Promise<Match> {
    return await this.transactionService.transaction(async (manager) => {
      const { minute, playerId, local } = goalDTO;
      const match = await this.findOne(goalDTO, manager);
      const player = await this.championshipPlayerService.findOne(playerId, manager);
      const goal = manager.create<Goal>(Goal, { minute, player });
      match.goal(goal, local);
      return await this.save(match, manager);
    }, manager);
  }

  async card(cardDTO: CardDTO, manager?: EntityManager): Promise<Match> {
    return await this.transactionService.transaction(async (manager) => {
      const { type, minute, playerId, local } = cardDTO;
      const match = await this.findOne(cardDTO, manager);
      const player = await this.championshipPlayerService.findOne(playerId, manager);
      const card = manager.create<Card>(Card, { type, minute, player });
      match.card(card, local);
      return await this.save(match, manager);
    }, manager);
  }

  async disallowCard(disallowCardDTO: DisallowCardDTO): Promise<Match> {
    return await this.transactionService.transaction(async (manager) => {
      const { cardId: id } = disallowCardDTO;
      const { affected } = await manager.delete(Card, { id });
      if (affected === 0) throw new NotFoundException();
      return await this.findOne(disallowCardDTO, manager);
    });
  }

  async disallowGoal(disallowGoalDTO: DisallowGoalDTO): Promise<Match> {
    return await this.transactionService.transaction(async (manager) => {
      const { goalId: id } = disallowGoalDTO;
      const { affected } = await manager.delete(Goal, { id });
      if (affected === 0) throw new NotFoundException();
      return await this.findOne(disallowGoalDTO, manager);
    });
  }

  private async save(match: Match, manager?: EntityManager): Promise<Match> {
    await manager.save(match.championship);
    return match;
  }

  protected exists(match?: Match): boolean {
    return !!match && match.reviewable();
  }
}
