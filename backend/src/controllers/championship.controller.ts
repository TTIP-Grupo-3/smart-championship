import { Param, UseInterceptors, UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { Championship } from 'src/entities/championship.entity';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { ChampionshipService } from 'src/services/championship.service';

@Controller('championship')
@ApiTags('Championship')
@UsePipes(validationPipe)
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @ApiOperation({ summary: 'Get championship' })
  @ApiResponse({ type: EliminationChampionshipResponseDTO, status: 200 })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(EliminationChampionshipResponseDTO))
  @Get()
  async getChampionship(@Param('id') id = 1): Promise<Championship> {
    const res = await this.championshipService.getChampionship(id);
    return res;
  }
}
