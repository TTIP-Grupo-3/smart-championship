import { ApiProperty } from '@nestjs/swagger';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { PayStatus } from 'src/enums/payStatus.enum';
import { EnrollmentResponse } from 'src/responses/enrollment.response';
import { toInstance } from 'src/utils/instances';
import { UserRequestInfo } from 'src/utils/types';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { ChampionshipResponseDTO } from './championship.response.dto';
import { Type } from 'class-transformer';

export class EnrollmentResponseDTO extends ResponseDTOFactory implements EnrollmentResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: ChampionshipResponseDTO })
  @Type(() => ChampionshipResponseDTO)
  championship: ChampionshipResponseDTO;
  @ApiProperty()
  price: number;
  @ApiProperty({ enum: PayStatus })
  status: PayStatus;
  @ApiProperty({ required: false, nullable: true })
  receipt?: string;

  static from(
    enrollment: TeamEnrollment,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): EnrollmentResponseDTO {
    const { id, status, receipt, championshipEnrollment, teamLeader } = enrollment;
    const { championship, price } = championshipEnrollment;
    const { name } = teamLeader;
    return toInstance(EnrollmentResponseDTO, {
      id,
      name,
      championship: mapper.map(championship, request, ChampionshipResponseDTO),
      price,
      status,
      receipt,
    });
  }
}
