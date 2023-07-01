import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { PayStatus } from 'src/enums/payStatus.enum';
import { TeamLeaderEnrollmentResponse } from 'src/responses/teamLeaderEnrollment.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { UserRequestInfo } from 'src/utils/types';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { toInstance } from 'src/utils/instances';

export class TeamLeaderEnrollmentResponseDTO
  extends ResponseDTOFactory
  implements TeamLeaderEnrollmentResponse
{
  @ApiProperty()
  id: number;
  @ApiProperty()
  championship: string;
  @ApiProperty()
  price: number;
  @ApiProperty({ enum: PayStatus })
  status: PayStatus;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;

  static from(
    enrollment: TeamEnrollment,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): TeamLeaderEnrollmentResponseDTO {
    const { id, status, championshipEnrollment } = enrollment;
    const { price } = championshipEnrollment;
    const { championship: championshipEntity } = championshipEnrollment;
    const { name: championship, type } = championshipEntity;
    return toInstance(TeamLeaderEnrollmentResponseDTO, {
      id,
      championship,
      type,
      price,
      status,
    });
  }
}
