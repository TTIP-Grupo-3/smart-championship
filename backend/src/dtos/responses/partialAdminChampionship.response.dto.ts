import { PartialAdminChampionshipResponse } from 'src/responses/partialAdminChampionship.response';
import { PartialChampionshipResponseDTO } from './partialChampionship.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';
import { Championship } from 'src/entities/championship.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PartialAdminChampionshipResponseDTO
  extends PartialChampionshipResponseDTO
  implements PartialAdminChampionshipResponse
{
  @ApiProperty({ example: new Date() })
  date: string;
  @ApiProperty({ example: new Date(), nullable: true, required: false })
  start?: string;
  @ApiProperty({ example: new Date(), nullable: true, required: false })
  end?: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  enrolled: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  teamSize: number;
  @ApiProperty({ enum: ChampionshipStatus })
  status: ChampionshipStatus;

  static from(
    championship: Championship,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): PartialAdminChampionshipResponseDTO {
    const { id, name, type, date, start, end, size, enrollment, duration, teamSize, status } = championship;
    const { price, enrolled } = enrollment;
    return toInstance(PartialAdminChampionshipResponseDTO, {
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
    });
  }
}
