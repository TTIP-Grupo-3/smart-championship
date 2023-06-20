import { Injectable } from '@nestjs/common';
import { configService } from './config.service';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { TransactionService } from './transaction.service';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { EntityManager } from 'typeorm';
import { UsersService } from './user.service';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { CreateTeamLeaderDTO } from 'src/dtos/createTeamLeader.dto';
import { AuthService } from './auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class TeamLeaderService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly userService: UsersService,
    private readonly authService: AuthService,
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

  async checkExists(username: string, manager: EntityManager): Promise<void> {
    const user = await this.userService.findOne(username, manager);
    if (!!user) throw new InvalidArgumentException(errors.alreadyExists);
  }
}
