import { Param, UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { SmartChampionshipExceptionMapperExecutor } from 'src/executors/SmartChampionshipExceptionMapperExecutor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { ChampionshipService } from 'src/services/championship.service';

@Controller('championship')
@ApiTags('Championship')
@UsePipes(validationPipe)
@UseExceptionMapper(SmartChampionshipExceptionMapperExecutor)
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @ApiOperation({ summary: 'Get championship' })
  @ApiResponse({ type: EliminationChampionshipResponseDTO, status: 200 })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @Get()
  async getChampionship(@Param('id') id = 1): Promise<EliminationChampionshipResponseDTO> {
    return await this.championshipService.getChampionship(id);
  }
}
