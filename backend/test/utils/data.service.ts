import { Injectable } from '@nestjs/common';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { Card } from 'src/entities/card.entity';
import { ChampionshipPlayer } from 'src/entities/championshipPlayer.entity';
import { ChampionshipTeam } from 'src/entities/championshipTeam.entity';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { Goal } from 'src/entities/goal.entity';
import { MatchStatus } from 'src/entities/matchStatus.entity';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { DeepPartial } from 'src/utils/types';
import { DataSource } from 'typeorm';
import {
  players,
  teams,
  eliminationChampionships,
  eliminationMatches,
  matchStatuses,
  teamStatuses,
  goals,
  cards,
} from './data/initial.data.json';

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class DataService {
  constructor(private readonly dataSource: DataSource) {}

  async initialize() {
    await this.dataSource.transaction(async (manager) => {
      await manager.save(EliminationChampionship, eliminationChampionships);
      await manager.save(ChampionshipTeam, teams);
      await manager.save(ChampionshipPlayer, players);
      await manager.save(TeamStatus, teamStatuses);
      await manager.save(MatchStatus, matchStatuses);
      await manager.save(EliminationMatch, eliminationMatches);
      await manager.save(Goal, goals);
      await manager.save(Card, cards as Array<DeepPartial<Card>>);
    });
  }
}
