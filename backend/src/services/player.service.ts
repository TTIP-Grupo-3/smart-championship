import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EntityManager } from 'typeorm';
import { Player } from 'src/entities/player.entity';
import { TeamService } from './team.service';
import { CreatePlayerDTO } from 'src/dtos/createPlayer.dto';
import { TeamIdDTO } from 'src/dtos/teamId.dto';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';

@Injectable()
export class PlayerService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly teamService: TeamService,
  ) {}

  async createPlayer(
    createPlayerDTO: CreatePlayerDTO,
    teamIdDTO: TeamIdDTO,
    teamLeader: TeamLeader,
    manager?: EntityManager,
  ): Promise<Player> {
    return await this.transactionService.transaction(async (manager) => {
      const { name, number, dni } = createPlayerDTO;
      const team = await this.teamService.getTeam(teamIdDTO.teamId, manager);
      if (!team.isLeader(teamLeader)) throw new NotFoundException('Team not found');
      const player = manager.create<Player>(Player, { name, number, dni });
      team.addPlayer(player);
      return await manager.save(player);
    }, manager);
  }
}
