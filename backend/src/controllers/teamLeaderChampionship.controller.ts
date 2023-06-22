import { Controller, Get, Param, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialAdminChampionshipResponseDTO } from 'src/dtos/responses/partialAdminChampionship.response.dto';
import { Championship } from 'src/entities/championship.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';

@Controller('team_leader/championship')
@ApiTags('Team leader championships')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class TeamLeaderChampionshipController {
  constructor(private readonly leaderChampionshipService: TeamLeaderChampionshipService) {}

  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Get to start championship' })
  @ApiOkResponse({ type: PartialAdminChampionshipResponseDTO })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Get(':championshipId')
  async getChampionship(@Param() getChampionshipDTO: ChampionshipIdDTO): Promise<Championship> {
    return await this.leaderChampionshipService.getChampionship(getChampionshipDTO);
  }

  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Get to start championships' })
  @ApiOkResponse({ type: PartialAdminChampionshipResponseDTO, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Get()
  async getChampionships(): Promise<Array<Championship>> {
    return await this.leaderChampionshipService.getChampionships();
  }
}
