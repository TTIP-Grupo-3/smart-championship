import { Controller, Get, Param, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialMatchResponseDTO } from 'src/dtos/responses/partialMatch.response.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { AllMatchService } from 'src/services/allMatch.service';

@Controller('championship/:championshipId/match')
@ApiTags('Matches')
@UsePipes(validationPipe)
export class AllMatchController {
  constructor(private readonly matchService: AllMatchService) {}

  @ApiOperation({ summary: 'Get championship matches' })
  @ApiResponse({ type: PartialMatchResponseDTO, status: 200, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(PartialMatchResponseDTO))
  @Get()
  async matches(@Param() matchesDTO: ChampionshipIdDTO) {
    return await this.matchService.matches(matchesDTO);
  }
}
