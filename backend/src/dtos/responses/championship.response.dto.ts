import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { ChampionshipResponse } from 'src/responses/championship.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { Championship } from 'src/entities/championship.entity';
import { UserRequestInfo } from 'src/utils/types';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { toInstance } from 'src/utils/instances';

export class ChampionshipResponseDTO extends ResponseDTOFactory implements ChampionshipResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;

  static from(
    championship: Championship,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): ChampionshipResponseDTO {
    const { id, name, type } = championship;
    return toInstance(ChampionshipResponseDTO, { id, name, type });
  }
}
