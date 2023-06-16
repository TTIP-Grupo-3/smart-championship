import { UseFilters, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { ScoreStatusResponseDTO } from 'src/dtos/responses/scoreStatus.response.dto';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { WsExceptionFilter } from 'src/filters/ws.exception.filter';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { wsValidationPipe } from 'src/pipes/ws.validation.pipe';
import { ScoreChampionshipService } from 'src/services/scoreChampionship.service';
import { UserSocket } from 'src/utils/types';

@WebSocketGateway({ namespace: 'championship/score' })
@UseFilters(WsExceptionFilter)
@UsePipes(wsValidationPipe)
export class ScoreChampionshipGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly scoreChampionshipService: ScoreChampionshipService,
    private readonly mapper: EntityToDTOMapper,
  ) {}

  @SubscribeMessage('teams')
  async teams(@ConnectedSocket() client: UserSocket, @MessageBody() championshipIdDTO: ChampionshipIdDTO) {
    const teamStatuses = await this.scoreChampionshipService.getTeamStatuses(championshipIdDTO);
    client.emit('teams', this.mapper.map(teamStatuses, client, ScoreStatusResponseDTO));
    client.join(this.teamStatusesRoom(championshipIdDTO.championshipId));
  }

  async notifyUpdate(client: UserSocket, championship: ScoreChampionship) {
    this.server
      .to(this.teamStatusesRoom(championship.id))
      .emit('teams', this.mapper.map(championship.scoreStatuses, client, ScoreStatusResponseDTO));
  }

  private teamStatusesRoom(championshipId: number): string {
    return `teamStatuses-${championshipId}`;
  }
}
