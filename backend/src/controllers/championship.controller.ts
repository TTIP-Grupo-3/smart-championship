import { Param, UseFilters, UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { SmartChampionshipExceptionFilter } from 'src/filters/smartChampionship.exception.filter';
import { validationPipe } from 'src/pipes/validation.pipe';
import { ChampionshipResponse } from 'src/responses/championship.response';
import { ChampionshipService } from 'src/services/championship.service';

@Controller('championship')
@UseFilters(SmartChampionshipExceptionFilter)
@UsePipes(validationPipe)
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Get()
  async getChampionship(@Param('id') id = 1): Promise<ChampionshipResponse> {
    return await this.championshipService.getChampionship(id);
  }
}
