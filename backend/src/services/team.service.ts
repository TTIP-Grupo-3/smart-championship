import { Injectable } from '@nestjs/common';
import { Team } from 'src/entities/team.entity';
import { EntityManager } from 'typeorm';
import { TransactionService } from './transaction.service';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TeamLeaderService } from './teamLeader.service';
import { IdDTO } from 'src/dtos/id.dto';
import { CreateTeamDTO } from 'src/dtos/createTeam.dto';
import { StorageService } from './storage.service';

@Injectable()
export class TeamService {
  private readonly logosContainer = 'logos';

  constructor(
    private readonly transactionService: TransactionService,
    private readonly teamLeaderService: TeamLeaderService,
    private readonly storageService: StorageService,
  ) {}

  async getTeam(id: number, manager?: EntityManager): Promise<Team> {
    return await this.transactionService.transaction(async (manager) => {
      const team = await manager.findOneBy(Team, { id });
      if (!team) throw new NotFoundException();
      return team;
    }, manager);
  }

  async createTeam(createTeamDTO: CreateTeamDTO, leaderDTO: IdDTO, manager?: EntityManager): Promise<Team> {
    return await this.transactionService.transaction(async (manager) => {
      const { name, logoString: logo } = createTeamDTO;
      const leader = await this.teamLeaderService.getTeamLeader(leaderDTO, manager);
      const team = manager.create<Team>(Team, { name, players: [] });
      team.logo = logo;
      leader.setTeam(team);
      await manager.save(team);
      if (logo) await this.storageService.upload(team.filename, logo, this.logosContainer);
      return team;
    }, manager);
  }
}
