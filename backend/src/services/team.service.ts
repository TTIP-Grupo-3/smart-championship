import { Injectable } from '@nestjs/common';
import { Team } from 'src/entities/team.entity';
import { EntityManager } from 'typeorm';
import { TransactionService } from './transaction.service';
import { NotFoundException } from 'src/exceptions/NotFoundException';

@Injectable()
export class TeamService {
  constructor(private readonly transactionService: TransactionService) {}

  async getTeam(id: number, manager?: EntityManager): Promise<Team> {
    return await this.transactionService.transaction(async (manager) => {
      const team = await manager.findOneBy(Team, { id });
      if (!team) throw new NotFoundException();
      return team;
    }, manager);
  }
}
