import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { PartialChampionshipResponse } from 'src/responses/partialChampionship.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { Championship } from 'src/entities/championship.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PartialChampionshipResponseDTO
  extends ResponseDTOFactory
  implements PartialChampionshipResponse
{
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;
  @ApiProperty({ example: new Date() })
  date: string;
  @ApiProperty()
  teamSize: number;

  static from(
    championship: Championship,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): PartialChampionshipResponseDTO {
    const { id, name, type, start, teamSize } = championship;
    return toInstance(PartialChampionshipResponseDTO, {
      id,
      name,
      type,
      date: start,
      teamSize,
    });
  }
}
