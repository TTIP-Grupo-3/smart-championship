import { EnrollmentIdDTO } from 'src/dtos/enrollmentId.dto';
import { TransactionService } from './transaction.service';
import { TeamEnrollment } from '../entities/teamEnrollment.entity';
import { EntityManager } from 'typeorm';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { Injectable } from '@nestjs/common';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { AdminChampionshipService } from './adminChampionship.service';
import { ChampionshipEnrollment } from 'src/entities/championshipEnrollment.entity';
import { StorageService } from './storage.service';
import { Championship } from 'src/entities/championship.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly championshipService: AdminChampionshipService,
    private readonly storageService: StorageService,
  ) {}

  async getEnrollment(getEnrollmentDTO: EnrollmentIdDTO, manager?: EntityManager): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const { id, championshipId } = getEnrollmentDTO;
      const enrollment = await manager.findOne(TeamEnrollment, {
        where: { id, championshipEnrollment: { championship: { id: championshipId } } },
        relations: { championshipEnrollment: { teamEnrollments: false } },
      });
      if (!enrollment) throw new NotFoundException();
      return this.setReceipt(enrollment);
    }, manager);
  }

  async getEnrollments(
    getEnrollmentsDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Array<TeamEnrollment>> {
    return await this.transactionService.transaction(async (manager) => {
      const championship = await this.getChampionship(getEnrollmentsDTO, manager);
      const { teamEnrollments } = championship.enrollment;
      teamEnrollments.forEach(
        (enrollment) => (enrollment.championshipEnrollment = championship.enrollment),
      );
      return teamEnrollments;
    }, manager);
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

  private async getChampionship(
    championshipIdDTO: ChampionshipIdDTO,
    manager: EntityManager,
  ): Promise<Championship> {
    const championship = await this.championshipService.getChampionship(championshipIdDTO, manager);
    this.setReceipts(championship.enrollment);
    return championship;
  }

  private setReceipts(enrollment: ChampionshipEnrollment): void {
    enrollment.teamEnrollments.forEach((teamEnrollment) => this.setReceipt(teamEnrollment));
  }

  private setReceipt(enrollment: TeamEnrollment): TeamEnrollment {
    enrollment.receipt = this.getReceipt(enrollment.id);
    return enrollment;
  }

  private getReceipt(id: number): string {
    return this.storageService.getImage(`${id}.png`, 'receipts');
  }
}
