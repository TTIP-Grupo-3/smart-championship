import { Body, Controller, Post, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateTeamDTO } from 'src/dtos/createTeam.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { LeaderTeamResponseDTO } from 'src/dtos/responses/leaderTeam.response.dto';
import { Team } from 'src/entities/team.entity';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { SetFileInterceptor } from 'src/interceptors/setFile.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { TeamService } from 'src/services/team.service';
import { UserRequestInfo } from 'src/utils/types';

@Controller('team_leader/team')
@ApiTags('Team management')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Roles(Role.TeamLeader)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ type: LeaderTeamResponseDTO, status: 201 })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(
    FileInterceptor('logo'),
    SetFileInterceptor,
    new TransformInterceptor(LeaderTeamResponseDTO),
  )
  @Post()
  async createTeam(
    @Body() createTeamDTO: CreateTeamDTO,
    @Req() { userDTO }: UserRequestInfo<TeamLeader>,
  ): Promise<Team> {
    return await this.teamService.createTeam(createTeamDTO, userDTO);
  }
}
