import { Body, Controller, Delete, Post, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CreatePlayerDTO } from 'src/dtos/createPlayer.dto';
import { IdsDTO } from 'src/dtos/ids.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PlayerResponseDTO } from 'src/dtos/responses/player.response.dto';
import { Player } from 'src/entities/player.entity';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { PlayerService } from 'src/services/player.service';
import { UserRequestInfo } from 'src/utils/types';

@Controller('team_leader/player')
@ApiTags('Player management')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Create player' })
  @ApiResponse({ type: PlayerResponseDTO, status: 201 })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PlayerResponseDTO))
  @Post()
  async createTeam(
    @Body() createPlayerDTO: CreatePlayerDTO,
    @Req() { userDTO }: UserRequestInfo<TeamLeader>,
  ): Promise<Player> {
    return await this.playerService.createPlayer(createPlayerDTO, userDTO);
  }

  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Delete players' })
  @ApiResponse({ type: PlayerResponseDTO, isArray: true, status: 200 })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PlayerResponseDTO))
  @Delete()
  async deletePlayers(
    @Body() deletePlayersDTO: IdsDTO,
    @Req() { userDTO }: UserRequestInfo<TeamLeader>,
  ): Promise<Array<Player>> {
    return await this.playerService.deletePlayers(deletePlayersDTO, userDTO);
  }
}
