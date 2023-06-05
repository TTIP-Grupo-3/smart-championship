import { Param, Req, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiNotFoundResponse,
  ApiParam,
  ApiOkResponse,
  refs,
  ApiExtraModels,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { ChampionshipResponseDTO } from 'src/dtos/responses/championship.response.dto';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialChampionshipResponseDTO } from 'src/dtos/responses/partialChampionship.response.dto';
import { ScoreChampionshipResponseDTO } from 'src/dtos/responses/scoreChampionship.response.dto';
import { Championship } from 'src/entities/championship.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { AllChampionshipService } from 'src/services/allChampionship.service';
import { UserRequestInfo } from 'src/utils/types';

@Controller('championship')
@ApiTags('Championship')
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class AllChampionshipController {
  constructor(private readonly championshipService: AllChampionshipService) {}

  @ApiExtraModels(EliminationChampionshipResponseDTO, ScoreChampionshipResponseDTO)
  @Roles(Role.All)
  @ApiOperation({ summary: 'Get championship' })
  @ApiOkResponse({
    schema: { anyOf: refs(EliminationChampionshipResponseDTO, ScoreChampionshipResponseDTO) },
  })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(ChampionshipResponseDTO))
  @Get(':championshipId')
  async getChampionship(
    @Param() getChampionshipDTO: ChampionshipIdDTO,
    @Req() request?: UserRequestInfo,
  ): Promise<Championship> {
    return await this.championshipService.getChampionship(getChampionshipDTO);
  }

  @Roles(Role.All)
  @ApiOperation({ summary: 'Get all championships' })
  @ApiOkResponse({ type: PartialChampionshipResponseDTO, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialChampionshipResponseDTO))
  @Get()
  async getChampionships(): Promise<Array<Championship>> {
    return await this.championshipService.getChampionships();
  }
}
