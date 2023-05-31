import { Body, Param, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { CreateChampionshipDTO } from 'src/dtos/createChampionship.dto';
import { ChampionshipResponseDTO } from 'src/dtos/responses/championship.response.dto';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialAdminChampionshipResponseDTO } from 'src/dtos/responses/partialAdminChampionship.response.dto';
import { PartialChampionshipResponseDTO } from 'src/dtos/responses/partialChampionship.response.dto';
import { ScoreChampionshipResponseDTO } from 'src/dtos/responses/scoreChampionship.response.dto';
import { Championship } from 'src/entities/championship.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
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
  @ApiResponse({ type: ScoreChampionshipResponseDTO, status: 200 })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(ChampionshipResponseDTO))
  @Get(':championshipId')
  async getChampionship(@Param() getChampionshipDTO: ChampionshipIdDTO): Promise<Championship> {
    return await this.championshipService.getChampionship(getChampionshipDTO);
  }

  @ApiOperation({ summary: 'Get all championships' })
  @ApiResponse({ type: PartialChampionshipResponseDTO, isArray: true, status: 200 })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialChampionshipResponseDTO))
  @Get()
  async getChampionships(): Promise<Array<Championship>> {
    return await this.championshipService.getChampionships();
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create championship' })
  @ApiResponse({ type: PartialAdminChampionshipResponseDTO, status: 201 })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Post()
  async createChampionship(@Body() createChampionshipDTO: CreateChampionshipDTO): Promise<Championship> {
    return await this.championshipService.createChampionship(createChampionshipDTO);
  }
}
