import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateTeamLeaderDTO } from 'src/dtos/createTeamLeader.dto';
import { AccessTokenResponseDTO } from 'src/dtos/responses/accessToken.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { TeamLeaderResponseDTO } from 'src/dtos/responses/teamLeader.response.dto';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UserRequestInfo } from 'src/utils/types';

@Controller('team_leader')
@ApiTags('Team leader')
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class TeamLeaderController {
  constructor(private readonly teamLeaderService: TeamLeaderService) {}

  @Roles(Role.All)
  @ApiOperation({ summary: 'Register team leader' })
  @ApiResponse({ type: AccessTokenResponseDTO, status: 201 })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(AccessTokenResponseDTO))
  @Post()
  async createTeamLeader(@Body() createTeamLeaderDTO: CreateTeamLeaderDTO): Promise<TeamLeader> {
    return await this.teamLeaderService.createTeamLeader(createTeamLeaderDTO);
  }

  @ApiBearerAuth()
  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Get team leader' })
  @ApiResponse({ type: TeamLeaderResponseDTO, status: 200 })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(TeamLeaderResponseDTO))
  @Get()
  async getTeamLeader(@Req() { userDTO }: UserRequestInfo<TeamLeader>): Promise<TeamLeader> {
    return await this.teamLeaderService.getTeamLeader(userDTO);
  }
}
