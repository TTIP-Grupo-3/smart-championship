import { ScoreChampionshipResponse } from 'src/responses/scoreChampionship.response';
import { ChampionshipResponseDTO } from './championship.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class ScoreChampionshipResponseDTO
  extends ChampionshipResponseDTO
  implements ScoreChampionshipResponse
{
  @ApiProperty({ enum: ChampionshipType, example: ChampionshipType.SCORE })
  type: ChampionshipType.SCORE = ChampionshipType.SCORE;
  @ApiProperty({ type: PartialMatchResponseDTO, isArray: true })
  @Type(() => PartialMatchResponseDTO)
  matches: Array<PartialMatchResponseDTO>;

  static from(
    championship: ScoreChampionship,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): ScoreChampionshipResponseDTO {
    const { id, name, type, matches } = championship;
    return toInstance(ScoreChampionshipResponseDTO, {
      id,
      name,
      type,
      matches: mapper.map(matches, request, PartialMatchResponseDTO),
    });
  }
}
