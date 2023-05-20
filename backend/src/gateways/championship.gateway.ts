import { UseFilters, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { ChampionshipResponseDTO } from 'src/dtos/responses/championship.response.dto';
import { Championship } from 'src/entities/championship.entity';
import { WsExceptionFilter } from 'src/filters/ws.exception.filter';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { wsValidationPipe } from 'src/pipes/ws.validation.pipe';
import { ChampionshipService } from 'src/services/championship.service';

@WebSocketGateway({ namespace: 'championship' })
@UseFilters(WsExceptionFilter)
@UsePipes(wsValidationPipe)
export class ChampionshipGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly championshipService: ChampionshipService,
    private readonly mapper: EntityToDTOMapper,
  ) {}

  @SubscribeMessage('subscribe')
  async subscribe(@ConnectedSocket() client: Socket, @MessageBody() subscribeDTO: ChampionshipIdDTO) {
    const championship = await this.championshipService.getChampionship(subscribeDTO);
    client.emit('championship', this.mapper.map(championship, ChampionshipResponseDTO));
    client.join(championship.room);
  }

  @SubscribeMessage('unsubscribe')
  async unsubscribe(@ConnectedSocket() client: Socket, @MessageBody() unsubscribeDTO: ChampionshipIdDTO) {
    const championship = await this.championshipService.getChampionship(unsubscribeDTO);
    client.leave(championship.room);
  }

  async notifyUpdate(championship: Championship) {
    this.server
      .to(championship.room)
      .emit('championship', this.mapper.map(championship, ChampionshipResponseDTO));
  }
}
