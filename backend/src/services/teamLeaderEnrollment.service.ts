import { Injectable } from '@nestjs/common';
import { configService } from './config.service';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { TransactionService } from './transaction.service';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { EntityManager } from 'typeorm';
import { TeamLeaderChampionshipService } from './teamLeaderChampionship.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class TeamLeaderEnrollmentService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly championshipService: TeamLeaderChampionshipService,
  ) {}

  async enroll(
    enrollDTO: ChampionshipIdDTO,
    teamLeader: TeamLeader,
    manager?: EntityManager,
  ): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.championshipService.getChampionship(enrollDTO, manager);
      const teamEnrollment = championship.enroll(teamLeader);
      return await manager.save(teamEnrollment);
    }, manager);
  }
}
