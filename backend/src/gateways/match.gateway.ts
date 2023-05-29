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
import { MatchIdDTO } from 'src/dtos/matchId.dto';
import { GoalDTO } from 'src/dtos/goal.dto';
import { CardDTO } from 'src/dtos/card.dto';
import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import { wsValidationPipe } from 'src/pipes/ws.validation.pipe';
import { WsExceptionFilter } from 'src/filters/ws.exception.filter';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { DisallowGoalDTO } from 'src/dtos/disallowGoal.dto';
import { DisallowCardDTO } from 'src/dtos/disallowCard.dto';
import { WsAuthGuard } from 'src/guards/wsAuth.guard';
import { ScoreChampionshipGateway } from './scoreChampionship.gateway';
import { Match } from 'src/entities/match.entity';
import { ScoreMatch } from 'src/entities/scoreMatch.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@WebSocketGateway({ namespace: 'match' })
@UseFilters(WsExceptionFilter)
@UsePipes(wsValidationPipe)
export class MatchGateway {
  @WebSocketServer()
  private readonly server: Server;

  constructor(
    private readonly championshipGateway: ChampionshipGateway,
    private readonly scoreChampionshipGateway: ScoreChampionshipGateway,
    private readonly matchService: MatchService,
    private readonly mapper: EntityToDTOMapper,
  ) {}

  @SubscribeMessage('subscribe')
  async subscribe(@ConnectedSocket() client: Socket, @MessageBody() subscribeDTO: MatchIdDTO) {
    const match = await this.matchService.findOne(subscribeDTO);
    client.emit('match', this.mapper.map(match, MatchResponseDTO));
    client.join(match.room);
  }

  @SubscribeMessage('unsubscribe')
  async unsubscribe(@ConnectedSocket() client: Socket, @MessageBody() unsubscribeDTO: MatchIdDTO) {
    const match = await this.matchService.findOne(unsubscribeDTO);
    client.leave(match.room);
  }

  @UseGuards(WsAuthGuard, RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('start')
  async start(@ConnectedSocket() client: Socket, @MessageBody() startDTO: MatchIdDTO) {
    const match = await this.matchService.start(startDTO);
    await this.notifyUpdate(match);
  }

  @UseGuards(WsAuthGuard, RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('end')
  async end(@ConnectedSocket() client: Socket, @MessageBody() endDTO: MatchIdDTO) {
    const match = await this.matchService.end(endDTO);
    await this.notifyUpdate(match);
  }

  @UseGuards(WsAuthGuard, RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('goal')
  async goal(@ConnectedSocket() client: Socket, @MessageBody() goalDTO: GoalDTO) {
    const match = await this.matchService.goal(goalDTO);
    await this.notifyUpdate(match);
  }

  @UseGuards(WsAuthGuard, RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('card')
  async card(@ConnectedSocket() client: Socket, @MessageBody() cardDTO: CardDTO) {
    console.log(client.handshake.auth);
    const match = await this.matchService.card(cardDTO);
    await this.notifyUpdate(match);
  }

  @UseGuards(WsAuthGuard, RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('goal:disallow')
  async disallowGoal(@ConnectedSocket() client: Socket, @MessageBody() disallowGoalDTO: DisallowGoalDTO) {
    const match = await this.matchService.disallowGoal(disallowGoalDTO);
    await this.notifyUpdate(match);
  }

  @UseGuards(WsAuthGuard, RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('card:disallow')
  async disallowCard(@ConnectedSocket() client: Socket, @MessageBody() disallowCardDTO: DisallowCardDTO) {
    const match = await this.matchService.disallowCard(disallowCardDTO);
    await this.notifyUpdate(match);
  }

  private async notifyUpdate(match: Match) {
    this.server.to(match.room).emit('match', this.mapper.map(match, MatchResponseDTO));
    await this.championshipGateway.notifyUpdate(match.championship);
    if (match instanceof ScoreMatch) await this.scoreChampionshipGateway.notifyUpdate(match.championship);
  }
}
