import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ChampionshipService } from './championship.service';
import { StorageService } from './storage.service';
import { EnrollmentIdDTO } from 'src/dtos/enrollmentId.dto';
import { EntityManager } from 'typeorm';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { Championship } from 'src/entities/championship.entity';
import { ChampionshipEnrollment } from 'src/entities/championshipEnrollment.entity';

@Injectable()
export class EnrollmentService {
  protected receiptContainer = 'receipts';

  constructor(
    protected readonly transactionService: TransactionService,
    protected readonly championshipService: ChampionshipService,
    protected readonly storageService: StorageService,
  ) {}

  async getEnrollment(getEnrollmentDTO: EnrollmentIdDTO, manager?: EntityManager): Promise<TeamEnrollment> {
    return await this.transactionService.transaction(async (manager) => {
      const { id, championshipId } = getEnrollmentDTO;
      const enrollment = await manager.findOne(TeamEnrollment, {
        where: { id, championshipEnrollment: { championship: { id: championshipId } } },
        relations: { championshipEnrollment: { teamEnrollments: false } },
      });
      if (!this.exists(enrollment)) throw new NotFoundException();
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
      return teamEnrollments.filter((enrollment) => this.exists(enrollment));
    }, manager);
  }

  protected async getChampionship(
    championshipIdDTO: ChampionshipIdDTO,
    manager: EntityManager,
  ): Promise<Championship> {
    const championship = await this.championshipService.getChampionship(championshipIdDTO, manager);
    this.setReceipts(championship.enrollment);
    return championship;
  }

  protected setReceipts(enrollment: ChampionshipEnrollment): void {
    enrollment.teamEnrollments.forEach((teamEnrollment) => this.setReceipt(teamEnrollment));
  }

  protected setReceipt(enrollment: TeamEnrollment): TeamEnrollment {
    enrollment.receipt = this.getReceipt(enrollment);
    return enrollment;
  }

  protected getReceipt(enrollment: TeamEnrollment): string {
    return this.storageService.getImage(enrollment.filename, this.receiptContainer);
  }

  protected exists(teamEnrollment?: TeamEnrollment): boolean {
    return !!teamEnrollment;
  }
}