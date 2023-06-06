import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { CreateChampionshipDTO } from 'src/dtos/createChampionship.dto';
import { EditChampionshipDTO } from 'src/dtos/editChampionship.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialAdminChampionshipResponseDTO } from 'src/dtos/responses/partialAdminChampionship.response.dto';
import { Championship } from 'src/entities/championship.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { AdminChampionshipService } from 'src/services/adminChampionship.service';

@Controller('admin/championship')
@ApiTags('Championship management')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class AdminChampionshipController {
  constructor(private readonly adminChampionshipService: AdminChampionshipService) {}

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get championship' })
  @ApiOkResponse({ type: PartialAdminChampionshipResponseDTO })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Get(':championshipId')
  async getChampionship(@Param() getChampionshipDTO: ChampionshipIdDTO): Promise<Championship> {
    return await this.adminChampionshipService.getChampionship(getChampionshipDTO);
  }

  @ApiExtraModels(PartialAdminChampionshipResponseDTO)
  @Roles(Role.Admin)
  @ApiOperation({ summary: "Get admin's championships" })
  @ApiOkResponse({ type: PartialAdminChampionshipResponseDTO, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Get()
  async getChampionships(): Promise<Array<Championship>> {
    return await this.adminChampionshipService.getChampionships();
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Create championship' })
  @ApiResponse({ type: PartialAdminChampionshipResponseDTO, status: 201 })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Post()
  async createChampionship(@Body() createChampionshipDTO: CreateChampionshipDTO): Promise<Championship> {
    return await this.adminChampionshipService.createChampionship(createChampionshipDTO);
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Edit championship' })
  @ApiOkResponse({ type: PartialAdminChampionshipResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Patch(':championshipId')
  async editChampionship(
    @Param() championshipIdDTO: ChampionshipIdDTO,
    @Body() editChampionshipDTO: EditChampionshipDTO,
  ): Promise<Championship> {
    return await this.adminChampionshipService.editChampionship(championshipIdDTO, editChampionshipDTO);
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Start championship' })
  @ApiOkResponse({ type: PartialAdminChampionshipResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialAdminChampionshipResponseDTO))
  @Patch(':championshipId')
  async startChampionship(@Param() championshipIdDTO: ChampionshipIdDTO): Promise<Championship> {
    return await this.adminChampionshipService.startChampionship(championshipIdDTO);
  }
}
