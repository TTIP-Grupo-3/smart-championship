import { EnrollmentIdDTO } from 'src/dtos/enrollmentId.dto';
import { TransactionService } from './transaction.service';
import { TeamEnrollment } from '../entities/teamEnrollment.entity';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AdminChampionshipService } from './adminChampionship.service';
import { StorageService } from './storage.service';
import { EnrollmentService } from './enrollment.service';
import { PayStatus } from 'src/enums/payStatus.enum';
import { Championship } from 'src/entities/championship.entity';
import { TeamService } from './team.service';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class AdminEnrollmentService extends EnrollmentService {
  constructor(
    transactionService: TransactionService,
    championshipService: AdminChampionshipService,
    storageService: StorageService,
    private readonly teamService: TeamService,
  ) {
    super(transactionService, championshipService, storageService);
  }

  async acceptEnrollment(
    acceptEnrollmentDTO: EnrollmentIdDTO,
    manager?: EntityManager,
  ): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.getChampionship(acceptEnrollmentDTO, manager);
      const enrollment = await this.getFromChampionship(acceptEnrollmentDTO.id, championship, manager);
      championship.acceptEnrollment(acceptEnrollmentDTO.id);
      await manager.save(championship);
      return enrollment;
    }, manager);
  }

  async rejectEnrollment(
    rejectEnrollmentDTO: EnrollmentIdDTO,
    manager?: EntityManager,
  ): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.getChampionship(rejectEnrollmentDTO, manager);
      const enrollment = championship.rejectEnrollment(rejectEnrollmentDTO.id);
      enrollment.championshipEnrollment = championship.enrollment;
      return await manager.save(enrollment);
    }, manager);
  }

  protected exists(teamEnrollment?: TeamEnrollment): boolean {
    const adminStatuses = [PayStatus.ToReview, PayStatus.Paid, PayStatus.Rejected];
    return !!teamEnrollment && adminStatuses.includes(teamEnrollment.payStatus);
  }

  private async getFromChampionship(
    id: number,
    championship: Championship,
    manager: EntityManager,
  ): Promise<TeamEnrollment> {
    const enrollment = championship.findEnrollment(id);
    enrollment.teamLeader.team = await this.teamService.getTeam(enrollment.teamId, manager);
    enrollment.championshipEnrollment = championship.enrollment;
    return enrollment;
  }
}
