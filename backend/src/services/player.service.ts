import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EntityManager } from 'typeorm';
import { Player } from 'src/entities/player.entity';
import { CreatePlayerDTO } from 'src/dtos/createPlayer.dto';
import { IdDTO } from 'src/dtos/id.dto';
import { IdsDTO } from 'src/dtos/ids.dto';
import { TeamLeaderService } from './teamLeader.service';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class PlayerService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly teamLeaderService: TeamLeaderService,
  ) {}

  async getPlayers(leaderDTO: IdDTO, manager?: EntityManager): Promise<Array<Player>> {
    return await this.transactionService.transaction(async (manager) => {
      const leader = await this.teamLeaderService.getTeamLeader(leaderDTO, manager);
      return leader.players;
    }, manager);
  }

  async createPlayer(
    createPlayerDTO: CreatePlayerDTO,
    leaderDTO: IdDTO,
    manager?: EntityManager,
  ): Promise<Player> {
    return await this.transactionService.transaction(async (manager) => {
      const { name, number, dni } = createPlayerDTO;
      const leader = await this.teamLeaderService.getTeamLeader(leaderDTO, manager);
      const player = manager.create<Player>(Player, { name, number, dni });
      leader.addPlayer(player);
      return await manager.save(player);
    }, manager);
  }

  async deletePlayers(
    deletePlayersDTO: IdsDTO,
    leaderDTO: IdDTO,
    manager?: EntityManager,
  ): Promise<Array<Player>> {
    return await this.transactionService.transaction(async (manager) => {
      const players = await this.findPlayers(deletePlayersDTO, leaderDTO, manager);
      return await manager.remove(players);
    }, manager);
  }

  private async findPlayers(
    findPlayersDTO: IdsDTO,
    leaderDTO: IdDTO,
    manager: EntityManager,
  ): Promise<Array<Player>> {
    const { ids } = findPlayersDTO;
    const options = ids.map((id) => ({ id, team: { leader: { id: leaderDTO.id } } }));
    return ids.length !== 0 ? await manager.findBy(Player, options) : [];
  }
}
