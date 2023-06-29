import { Body, Controller, Param, Post, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CreatePlayerDTO } from 'src/dtos/createPlayer.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PlayerResponseDTO } from 'src/dtos/responses/player.response.dto';
import { TeamIdDTO } from 'src/dtos/teamId.dto';
import { Player } from 'src/entities/player.entity';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { PlayerService } from 'src/services/player.service';
import { UserRequestInfo } from 'src/utils/types';

@Controller('team_leader/team/:teamId/player')
@ApiTags('Player management')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Create player' })
  @ApiResponse({ type: PlayerResponseDTO, status: 201 })
  @ApiParam({ name: 'teamId', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PlayerResponseDTO))
  @Post()
  async createTeam(
    @Body() createPlayerDTO: CreatePlayerDTO,
    @Param() teamIdDTO: TeamIdDTO,
    @Req() { user }: UserRequestInfo<TeamLeader>,
  ): Promise<Player> {
    return await this.playerService.createPlayer(createPlayerDTO, teamIdDTO, user);
  }
}
