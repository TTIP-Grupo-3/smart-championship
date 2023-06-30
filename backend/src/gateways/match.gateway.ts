import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
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
import { ScoreChampionshipGateway } from './scoreChampionship.gateway';
import { Match } from 'src/entities/match.entity';
import { ScoreMatch } from 'src/entities/scoreMatch.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserSocket } from 'src/utils/types';
import { ReviewerMatchService } from 'src/services/reviewerMatch.service';

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
    private readonly reviewerMatchService: ReviewerMatchService,
    private readonly mapper: EntityToDTOMapper,
  ) {}

  @SubscribeMessage('subscribe')
  async subscribe(@ConnectedSocket() client: UserSocket, @MessageBody() subscribeDTO: MatchIdDTO) {
    const match = await this.matchService.findOne(subscribeDTO);
    client.emit('match', this.mapper.map(match, client, MatchResponseDTO));
    client.join(match.room);
  }

  @SubscribeMessage('unsubscribe')
  async unsubscribe(@ConnectedSocket() client: UserSocket, @MessageBody() unsubscribeDTO: MatchIdDTO) {
    const match = await this.matchService.findOne(unsubscribeDTO);
    client.leave(match.room);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('start')
  async start(@ConnectedSocket() client: UserSocket, @MessageBody() startDTO: MatchIdDTO) {
    const match = await this.reviewerMatchService.start(startDTO);
    await this.notifyUpdate(client, match);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('end')
  async end(@ConnectedSocket() client: UserSocket, @MessageBody() endDTO: MatchIdDTO) {
    const match = await this.reviewerMatchService.end(endDTO);
    await this.notifyUpdate(client, match);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('goal')
  async goal(@ConnectedSocket() client: UserSocket, @MessageBody() goalDTO: GoalDTO) {
    const match = await this.reviewerMatchService.goal(goalDTO);
    await this.notifyUpdate(client, match);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('card')
  async card(@ConnectedSocket() client: UserSocket, @MessageBody() cardDTO: CardDTO) {
    const match = await this.reviewerMatchService.card(cardDTO);
    await this.notifyUpdate(client, match);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('goal:disallow')
  async disallowGoal(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() disallowGoalDTO: DisallowGoalDTO,
  ) {
    const match = await this.reviewerMatchService.disallowGoal(disallowGoalDTO);
    await this.notifyUpdate(client, match);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Reviewer)
  @SubscribeMessage('card:disallow')
  async disallowCard(
    @ConnectedSocket() client: UserSocket,
    @MessageBody() disallowCardDTO: DisallowCardDTO,
  ) {
    const match = await this.reviewerMatchService.disallowCard(disallowCardDTO);
    await this.notifyUpdate(client, match);
  }

  private async notifyUpdate(client: UserSocket, match: Match) {
    this.server.to(match.room).emit('match', this.mapper.map(match, client, MatchResponseDTO));
    await this.championshipGateway.notifyUpdate(client, match.championship);
    if (match instanceof ScoreMatch) {
      await this.scoreChampionshipGateway.notifyUpdate(client, match.championship);
    }
  }
}
