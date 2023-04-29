import { UseFilters, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IdDTO } from 'src/dtos/id.dto';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
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
  async subscribe(@ConnectedSocket() client: Socket, @MessageBody() subscribeDTO?: IdDTO) {
    const { id } = subscribeDTO ?? { id: 1 };
    const championship = (await this.championshipService.getChampionship(id)) as EliminationChampionship;
    client.emit('championship', this.mapper.map(championship));
    client.join(championship.room);
  }

  @SubscribeMessage('unsubscribe')
  async unsubscribe(@ConnectedSocket() client: Socket, @MessageBody() unsubscribeDTO?: IdDTO) {
    const { id } = unsubscribeDTO;
    const championship = (await this.championshipService.getChampionship(id)) as EliminationChampionship;
    client.leave(championship.room);
  }

  async notifyUpdate(championship: EliminationChampionship) {
    this.server.to(championship.room).emit('championship', this.mapper.map(championship));
  }
}
