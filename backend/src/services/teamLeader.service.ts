import { Injectable } from '@nestjs/common';
import { configService } from './config.service';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { TransactionService } from './transaction.service';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { EntityManager, FindOptionsRelations } from 'typeorm';
import { UsersService } from './user.service';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { CreateTeamLeaderDTO } from 'src/dtos/createTeamLeader.dto';
import { AuthService } from './auth.service';
import { IdDTO } from 'src/dtos/id.dto';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { StorageService } from './storage.service';
import { TeamLeaderChampionshipService } from './teamLeaderChampionship.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class TeamLeaderService {
  private readonly relations: FindOptionsRelations<TeamLeader> = {
    team: true,
    enrollments: {
      championshipEnrollment: { championship: { enrollment: false, teams: false }, teamEnrollments: false },
    },
  };

  constructor(
    private readonly transactionService: TransactionService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
    private readonly championshipService: TeamLeaderChampionshipService,
  ) {}

  async createTeamLeader(
    createTeamLeaderDTO: CreateTeamLeaderDTO,
    manager?: EntityManager,
  ): Promise<TeamLeader> {
    return await this.transactionService.transaction(async (manager) => {
      const { firstName, lastName, username, password } = createTeamLeaderDTO;
      await this.checkExists(username, manager);
      const plainTeamLeader = { firstName, lastName, username, password, enrollments: [] };
      const teamLeader = manager.create<TeamLeader>(TeamLeader, plainTeamLeader);
      const savedTeamLeader = await manager.save(teamLeader);
      return await this.authService.login(savedTeamLeader);
    }, manager);
  }

  async getTeamLeader({ id }: IdDTO, manager?: EntityManager): Promise<TeamLeader> {
    return await this.transactionService.transaction(async (manager) => {
      const teamLeader = await manager.findOne(TeamLeader, { where: { id }, relations: this.relations });
      if (!teamLeader) throw new NotFoundException();
      teamLeader.minimumTeamSize = await this.getMinimumSize(manager);
      if (teamLeader.team) teamLeader.team.logo = this.storageService.getImage(teamLeader.team.filename);
      return teamLeader;
    }, manager);
  }

  private async getMinimumSize(manager: EntityManager): Promise<number> {
    const championships = await this.championshipService.getChampionships(manager);
    return Math.min(...championships.map(({ teamSize }) => teamSize));
  }

  private async checkExists(username: string, manager: EntityManager): Promise<void> {
    const user = await this.userService.findOne(username, manager);
    if (!!user) throw new InvalidArgumentException(errors.alreadyExists);
  }
}
