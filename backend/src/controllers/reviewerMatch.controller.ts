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
import { ReviewerMatchService } from 'src/services/reviewerMatch.service';

@Controller('reviewer/championship/:championshipId/match')
@ApiTags('Match review')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class ReviewerMatchController {
  constructor(private readonly reviewerMatchService: ReviewerMatchService) {}

  @Roles(Role.Reviewer)
  @ApiOperation({ summary: 'Get reviewable championship matches' })
  @ApiResponse({ type: PartialMatchResponseDTO, status: 200, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(PartialMatchResponseDTO))
  @Get()
  async matches(@Param() matchesDTO: ChampionshipIdDTO) {
    return await this.reviewerMatchService.matches(matchesDTO);
  }

  @Roles(Role.Reviewer)
  @ApiOperation({ summary: 'Get reviewable match' })
  @ApiResponse({ type: MatchTeamsResponseDTO, status: 200 })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiParam({ name: 'id', type: 'number' })
  @UseInterceptors(new TransformInterceptor(MatchTeamsResponseDTO))
  @Get(':id')
  async findOne(@Param() matchDTO: MatchIdDTO) {
    return await this.reviewerMatchService.findOne(matchDTO);
  }
}
