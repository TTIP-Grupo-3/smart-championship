import { Body, Controller, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateTeamLeaderDTO } from 'src/dtos/createTeamLeader.dto';
import { AccessTokenResponseDTO } from 'src/dtos/responses/accessToken.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { TeamLeaderService } from 'src/services/teamLeader.service';

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
  async createChampionship(@Body() createTeamLeaderDTO: CreateTeamLeaderDTO): Promise<TeamLeader> {
    return await this.teamLeaderService.createTeamLeader(createTeamLeaderDTO);
  }
}
