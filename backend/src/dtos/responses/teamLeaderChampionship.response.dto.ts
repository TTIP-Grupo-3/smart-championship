import { TeamLeaderChampionshipResponse } from 'src/responses/teamLeaderChampionship.response';
import { PartialAdminChampionshipResponseDTO } from './partialAdminChampionship.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Championship } from 'src/entities/championship.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class TeamLeaderChampionshipResponseDTO
  extends PartialAdminChampionshipResponseDTO
  implements TeamLeaderChampionshipResponse
{
  @ApiProperty()
  isEnrolled: boolean;

  static from(
    championship: Championship,
    { user }: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): TeamLeaderChampionshipResponseDTO {
    const { id, name, type, date, start, end, size, enrollment, duration, teamSize, status } = championship;
    const { price, enrolled } = enrollment;
    return toInstance(TeamLeaderChampionshipResponseDTO, {
      id,
      name,
      type,
      date,
      start,
      end,
      size,
      enrolled,
      price,
      duration,
      teamSize,
      status,
      isEnrolled: championship.isEnrolled(user),
    });
  }
}
