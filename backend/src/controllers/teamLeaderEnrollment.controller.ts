import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { EnrollmentIdDTO } from 'src/dtos/enrollmentId.dto';
import { EnrollmentResponseDTO } from 'src/dtos/responses/enrollment.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { UploadReceiptDTO } from 'src/dtos/uploadReceipt.dto';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { SetFileInterceptor } from 'src/interceptors/setFile.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { validationPipe } from 'src/pipes/validation.pipe';
import { TeamLeaderEnrollmentService } from 'src/services/teamLeaderEnrollment.service';
import { UserRequestInfo } from 'src/utils/types';

@Controller('team_leader/championship/:championshipId/enrollment')
@ApiTags('Team enrollments')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@UsePipes(validationPipe)
export class TeamLeaderEnrollmentController {
  constructor(private readonly teamLeaderEnrollmentService: TeamLeaderEnrollmentService) {}

  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Get enrollment' })
  @ApiOkResponse({ type: EnrollmentResponseDTO })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(EnrollmentResponseDTO))
  @Get(':id')
  async getLeaderEnrollment(
    @Param() getEnrollmentDTO: EnrollmentIdDTO,
    @Req() { user }: UserRequestInfo<TeamLeader>,
  ): Promise<TeamEnrollment> {
    return await this.teamLeaderEnrollmentService.getLeaderEnrollment(getEnrollmentDTO, user);
  }

  @Roles(Role.TeamLeader)
  @ApiOperation({ summary: 'Enroll to a championship' })
  @ApiResponse({ type: EnrollmentResponseDTO, status: 201 })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(EnrollmentResponseDTO))
  @Post()
  async enroll(
    @Param() enrollDTO: ChampionshipIdDTO,
    @Req() { userDTO }: UserRequestInfo<TeamLeader>,
  ): Promise<TeamEnrollment> {
    return await this.teamLeaderEnrollmentService.enroll(enrollDTO, userDTO);
  }

  @Roles(Role.TeamLeader)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload receipt' })
  @ApiResponse({ type: EnrollmentResponseDTO, status: 200 })
  @ApiParam({ name: 'championshipId', type: 'number' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(
    FileInterceptor('receipt'),
    SetFileInterceptor,
    new TransformInterceptor(EnrollmentResponseDTO),
  )
  @Put(':id')
  async uploadReceipt(
    @Param() enrollmentIdDTO: EnrollmentIdDTO,
    @Body() uploadReceiptDTO: UploadReceiptDTO,
  ): Promise<TeamEnrollment> {
    return await this.teamLeaderEnrollmentService.uploadReceipt(enrollmentIdDTO, uploadReceiptDTO);
  }
}
