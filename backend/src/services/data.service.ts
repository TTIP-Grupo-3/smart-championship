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
  payDatas,
  users,
  players,
  teams,
  eliminationChampionships,
  scoreChampionships,
  eliminationMatches,
  scoreMatches,
  matchStatuses,
  teamStatuses,
  goals,
  cards,
  championshipEnrollments,
  teamEnrollments,
  teamLeaders,
  receipt,
} from '../data/initial.data.json';
import { User } from 'src/entities/user.entity';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { ScoreMatch } from 'src/entities/scoreMatch.entity';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { ChampionshipEnrollment } from 'src/entities/championshipEnrollment.entity';
import { Team } from 'src/entities/team.entity';
import { Player } from 'src/entities/player.entity';
import { StorageService } from './storage.service';
import { PayStatus } from 'src/enums/payStatus.enum';
import { PayData } from 'src/entities/payData.entity';

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class DataService {
  constructor(private readonly dataSource: DataSource, private readonly storageService: StorageService) {}

  async initialize() {
    await this.dataSource.transaction(async (manager) => {
      await manager.save(User, users as Array<DeepPartial<User>>);
      await manager.save(TeamLeader, teamLeaders as Array<DeepPartial<TeamLeader>>);
      await manager.save(EliminationChampionship, eliminationChampionships);
      await manager.save(ScoreChampionship, scoreChampionships);
      await manager.save(
        ChampionshipEnrollment,
        championshipEnrollments as Array<DeepPartial<ChampionshipEnrollment>>,
      );
      await manager.save(PayData, payDatas);
      await manager.save(TeamEnrollment, teamEnrollments as Array<DeepPartial<TeamEnrollment>>);
      await manager.save(Team, teams);
      await manager.save(Player, players);
      await manager.save(ChampionshipTeam, this.championshipTeams());
      await manager.save(ChampionshipPlayer, this.championshipPlayers());
      await manager.save(TeamStatus, teamStatuses);
      await manager.save(MatchStatus, matchStatuses);
      await manager.save(EliminationMatch, eliminationMatches);
      await manager.save(ScoreMatch, scoreMatches);
      await manager.save(Goal, goals);
      await manager.save(Card, cards as Array<DeepPartial<Card>>);
    });
    await this.createReceipts();
  }

  private championshipPlayers() {
    return players.map((player) => ({ ...player, player: { id: player.id } }));
  }

  private championshipTeams() {
    return teams.map((team) => ({ ...team, team: { id: team.id } }));
  }

  private async createReceipts() {
    await this.dataSource.transaction(async (manager) => {
      const receiptStatuses = [PayStatus.ToReview, PayStatus.Paid, PayStatus.Rejected];
      const ids = (teamEnrollments as Array<DeepPartial<TeamEnrollment>>)
        .filter(({ payStatus }) => receiptStatuses.includes(payStatus))
        .map(({ id }) => ({ id }));
      const enrollments = ids.length === 0 ? [] : await manager.findBy(TeamEnrollment, ids);
      await Promise.all(
        enrollments.map(
          async (enrollment) => await this.storageService.upload(enrollment.filename, receipt, 'receipts'),
        ),
      );
    });
  }
}
