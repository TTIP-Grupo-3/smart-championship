import { Controller, Get, Param, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  refs,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { AdminMatchResponseDTO } from 'src/dtos/responses/adminMatch.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialMatchResponseDTO } from 'src/dtos/responses/partialMatch.response.dto';
import { PhaseResponseDTO } from 'src/dtos/responses/phase.response.dto';
import { Match } from 'src/entities/match.entity';
import { Phase } from 'src/entities/phase.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { AdminMatchService } from 'src/services/adminMatch.service';

@Controller('admin/championship/:championshipId/match')
@ApiTags('Admin matches')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class AdminMatchController {
  constructor(private readonly adminMatchService: AdminMatchService) {}

  @ApiExtraModels(PartialMatchResponseDTO, PhaseResponseDTO)
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Get to start championship's matches" })
  @ApiOkResponse({ schema: { anyOf: refs(PhaseResponseDTO, PartialMatchResponseDTO) }, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(AdminMatchResponseDTO))
  @Get()
  async championshipMatches(@Param() matchesDTO: ChampionshipIdDTO): Promise<Array<Match | Phase>> {
    return await this.adminMatchService.championshipMatches(matchesDTO);
  }
}
