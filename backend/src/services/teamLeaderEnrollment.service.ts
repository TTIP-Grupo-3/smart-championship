import { Injectable } from '@nestjs/common';
import { configService } from './config.service';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { TransactionService } from './transaction.service';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { EntityManager } from 'typeorm';
import { TeamLeaderChampionshipService } from './teamLeaderChampionship.service';
import { EnrollmentIdDTO } from 'src/dtos/enrollmentId.dto';
import { EnrollmentService } from './enrollment.service';
import { StorageService } from './storage.service';
import { UploadReceiptDTO } from 'src/dtos/uploadReceipt.dto';
import { IdDTO } from 'src/dtos/id.dto';
import { TeamLeaderService } from './teamLeader.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class TeamLeaderEnrollmentService extends EnrollmentService {
  constructor(
    transactionService: TransactionService,
    championshipService: TeamLeaderChampionshipService,
    storageService: StorageService,
    private readonly teamLeaderService: TeamLeaderService,
  ) {
    super(transactionService, championshipService, storageService);
  }

  async enroll(
    enrollDTO: ChampionshipIdDTO,
    leaderDTO: IdDTO,
    manager?: EntityManager,
  ): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const teamLeader = await this.teamLeaderService.getTeamLeader(leaderDTO, manager);
      const championship = await this.championshipService.getChampionship(enrollDTO, manager);
      const teamEnrollment = teamLeader.enrollTo(championship);
      return await manager.save(teamEnrollment);
    }, manager);
  }

  async uploadReceipt(
    enrollmentIdDTO: EnrollmentIdDTO,
    { receiptString }: UploadReceiptDTO,
    manager?: EntityManager,
  ): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const enrollment = await this.getEnrollment(enrollmentIdDTO, manager);
      enrollment.uploadReceipt(receiptString);
      await manager.save(enrollment);
      await this.storageService.upload(enrollment.filename, receiptString, this.receiptContainer);
      return enrollment;
    }, manager);
  }
}
