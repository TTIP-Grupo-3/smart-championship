import { Controller, Get, Param, Patch, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { EnrollmentIdDTO } from 'src/dtos/enrollmentId.dto';
import { EnrollmentResponseDTO } from 'src/dtos/responses/enrollment.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { AdminEnrollmentService } from 'src/services/adminEnrollment.service';

@Controller('admin/championship/:championshipId/enrollment')
@ApiTags('Enrollment management')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class AdminEnrollmentController {
  constructor(private readonly enrollmentService: AdminEnrollmentService) {}

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get enrollment' })
  @ApiOkResponse({ type: EnrollmentResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(EnrollmentResponseDTO))
  @Get(':id')
  async getEnrollment(@Param() getEnrollmentDTO: EnrollmentIdDTO): Promise<TeamEnrollment> {
    return await this.enrollmentService.getEnrollment(getEnrollmentDTO);
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get championship enrollments' })
  @ApiOkResponse({ type: EnrollmentResponseDTO, isArray: true })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(EnrollmentResponseDTO))
  @Get()
  async getEnrollments(@Param() getEnrollmentsDTO: ChampionshipIdDTO): Promise<Array<TeamEnrollment>> {
    return await this.enrollmentService.getEnrollments(getEnrollmentsDTO);
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Accept enrollment' })
  @ApiOkResponse({ type: EnrollmentResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(EnrollmentResponseDTO))
  @Patch(':id/accept')
  async acceptEnrollments(@Param() acceptEnrollmentDTO: EnrollmentIdDTO): Promise<TeamEnrollment> {
    return await this.enrollmentService.acceptEnrollment(acceptEnrollmentDTO);
  }

  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Reject enrollment' })
  @ApiOkResponse({ type: EnrollmentResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(EnrollmentResponseDTO))
  @Patch(':id/reject')
  async rejectEnrollments(@Param() rejectEnrollmentDTO: EnrollmentIdDTO): Promise<TeamEnrollment> {
    return await this.enrollmentService.rejectEnrollment(rejectEnrollmentDTO);
  }
}
