import { Controller, Get, Param, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
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
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { MatchIdDTO } from 'src/dtos/matchId.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { MatchTeamsResponseDTO } from 'src/dtos/responses/matchTeams.response.dto';
import { PartialMatchResponseDTO } from 'src/dtos/responses/partialMatch.response.dto';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { MatchService } from 'src/services/match.service';

@Controller('championship/:championshipId/match')
@ApiTags('Matches')
@UsePipes(validationPipe)
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @ApiOperation({ summary: 'Get championship matches' })
  @ApiResponse({ type: PartialMatchResponseDTO, status: 200, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(PartialMatchResponseDTO))
  @Get()
  async matches(@Param() matchesDTO: ChampionshipIdDTO) {
    return await this.matchService.matches(matchesDTO);
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.Reviewer)
  @ApiOperation({ summary: 'Get match' })
  @ApiResponse({ type: MatchTeamsResponseDTO, status: 200 })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiParam({ name: 'id', type: 'number' })
  @UseInterceptors(new TransformInterceptor(MatchTeamsResponseDTO))
  @Get(':id')
  async match(@Param() matchDTO: MatchIdDTO) {
    return await this.matchService.findOne(matchDTO);
  }
}
