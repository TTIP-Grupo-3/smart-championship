import { EnrollmentIdDTO } from 'src/dtos/enrollmentId.dto';
import { TransactionService } from './transaction.service';
import { TeamEnrollment } from '../entities/teamEnrollment.entity';
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AdminChampionshipService } from './adminChampionship.service';
import { StorageService } from './storage.service';
import { EnrollmentService } from './enrollment.service';

@Injectable()
export class AdminEnrollmentService extends EnrollmentService {
  constructor(
    transactionService: TransactionService,
    championshipService: AdminChampionshipService,
    storageService: StorageService,
  ) {
    super(transactionService, championshipService, storageService);
  }

  async acceptEnrollment(
    acceptEnrollmentDTO: EnrollmentIdDTO,
    manager?: EntityManager,
  ): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.getChampionship(acceptEnrollmentDTO, manager);
      const enrollment = championship.acceptEnrollment(acceptEnrollmentDTO.id);
      enrollment.championshipEnrollment = championship.enrollment;
      return await manager.save(enrollment);
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
}
