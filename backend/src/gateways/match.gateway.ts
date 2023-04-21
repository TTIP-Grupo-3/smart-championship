import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { ChampionshipGateway } from './championship.gateway';
import { MatchService } from 'src/services/match.service';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { MatchIdDTO } from 'src/dtos/matchId.dto';
import { GoalDTO } from 'src/dtos/goal.dto';
import { CardDTO } from 'src/dtos/card.dto';
import { UseFilters, UsePipes } from '@nestjs/common';
import { wsValidationPipe } from 'src/pipes/ws.validation.pipe';
import { WsExceptionFilter } from 'src/filters/ws.exception.filter';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { DisallowGoalDTO } from 'src/dtos/disallowGoal.dto';
import { DisallowCardDTO } from 'src/dtos/disallowCard.dto';

@WebSocketGateway({ namespace: 'match' })
@UseFilters(WsExceptionFilter)
@UsePipes(wsValidationPipe)
export class MatchGateway {
  @WebSocketServer()
  private readonly server: Server;

  constructor(
    private readonly championshipGateway: ChampionshipGateway,
    private readonly matchService: MatchService,
    private readonly mapper: EntityToDTOMapper,
  ) {}

  @SubscribeMessage('subscribe')
  async subscribe(@ConnectedSocket() client: Socket, @MessageBody() subscribeDTO: MatchIdDTO) {
    const match = (await this.matchService.findOne(subscribeDTO)) as EliminationMatch;
    client.emit('match', this.mapper.map(match, MatchResponseDTO));
    client.join(match.room);
  }

  @SubscribeMessage('unsubscribe')
  async unsubscribe(@ConnectedSocket() client: Socket, @MessageBody() unsubscribeDTO: MatchIdDTO) {
    const match = (await this.matchService.findOne(unsubscribeDTO)) as EliminationMatch;
    client.leave(match.room);
  }

  @SubscribeMessage('start')
  async start(@ConnectedSocket() client: Socket, @MessageBody() startDTO: MatchIdDTO) {
    const match = (await this.matchService.start(startDTO)) as EliminationMatch;
    await this.notifyUpdate(match);
  }

  @SubscribeMessage('end')
  async end(@ConnectedSocket() client: Socket, @MessageBody() endDTO: MatchIdDTO) {
    const match = (await this.matchService.end(endDTO)) as EliminationMatch;
    await this.notifyUpdate(match);
  }

  @SubscribeMessage('goal')
  async goal(@ConnectedSocket() client: Socket, @MessageBody() goalDTO: GoalDTO) {
    const match = (await this.matchService.goal(goalDTO)) as EliminationMatch;
    await this.notifyUpdate(match);
  }

  @SubscribeMessage('card')
  async card(@ConnectedSocket() client: Socket, @MessageBody() cardDTO: CardDTO) {
    const match = (await this.matchService.card(cardDTO)) as EliminationMatch;
    await this.notifyUpdate(match);
  }

  @SubscribeMessage('goal:disallow')
  async disallowGoal(@ConnectedSocket() client: Socket, @MessageBody() disallowGoalDTO: DisallowGoalDTO) {
    const match = await this.matchService.disallowGoal(disallowGoalDTO);
    await this.notifyUpdate(match);
  }

  @SubscribeMessage('card:disallow')
  async disallowCard(@ConnectedSocket() client: Socket, @MessageBody() disallowCardDTO: DisallowCardDTO) {
    const match = await this.matchService.disallowCard(disallowCardDTO);
    await this.notifyUpdate(match);
  }

  private async notifyUpdate(match: EliminationMatch) {
    this.server.to(match.room).emit('match', this.mapper.map(match, MatchResponseDTO));
    await this.championshipGateway.notifyUpdate(match.championship);
  }
}
