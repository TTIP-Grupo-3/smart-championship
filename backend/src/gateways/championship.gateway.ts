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
import { ChampionshipResponseDTO } from 'src/dtos/responses/championship.response.dto';
import { Championship } from 'src/entities/championship.entity';
import { WsExceptionFilter } from 'src/filters/ws.exception.filter';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { wsValidationPipe } from 'src/pipes/ws.validation.pipe';
import { AllChampionshipService } from 'src/services/allChampionship.service';
import { UserSocket } from 'src/utils/types';

@WebSocketGateway({ namespace: 'championship' })
@UseFilters(WsExceptionFilter)
@UsePipes(wsValidationPipe)
export class ChampionshipGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly championshipService: AllChampionshipService,
    private readonly mapper: EntityToDTOMapper,
  ) {}

  @SubscribeMessage('subscribe')
  async subscribe(@ConnectedSocket() client: UserSocket, @MessageBody() subscribeDTO: ChampionshipIdDTO) {
    const championship = await this.championshipService.getChampionship(subscribeDTO);
    client.emit('championship', this.mapper.map(championship, client, ChampionshipResponseDTO));
    client.join(championship.room);
  }

  @SubscribeMessage('unsubscribe')
  async unsubscribe(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() unsubscribeDTO: ChampionshipIdDTO,
  ) {
    const championship = await this.championshipService.getChampionship(unsubscribeDTO);
    client.leave(championship.room);
  }

  async notifyUpdate(client: UserSocket, championship: Championship) {
    this.server
      .to(championship.room)
      .emit('championship', this.mapper.map(championship, client, ChampionshipResponseDTO));
  }
}
