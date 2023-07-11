import { ApiProperty } from '@nestjs/swagger';
import { EliminationChampionshipResponse } from 'src/responses/eliminationChampionship.response';
import { PhaseManagerResponseDTO } from './phaseManager.response.dto';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { Type } from 'class-transformer';
import { ChampionshipResponseDTO } from './championship.response.dto';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class EliminationChampionshipResponseDTO
  extends ChampionshipResponseDTO
  implements EliminationChampionshipResponse
{
  @ApiProperty({ enum: ChampionshipType, example: ChampionshipType.ELIMINATION })
  type: ChampionshipType.ELIMINATION = ChampionshipType.ELIMINATION;
  @ApiProperty({ type: PartialMatchResponseDTO, isArray: true })
  @Type(() => PartialMatchResponseDTO)
  matches: Array<PartialMatchResponseDTO>;
  @ApiProperty({ type: PhaseManagerResponseDTO, nullable: true })
  @Type(() => PhaseManagerResponseDTO)
  next: PhaseManagerResponseDTO | null;

  static from(
    championship: EliminationChampionship,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): EliminationChampionshipResponseDTO {
    const { id, name, type } = championship;
    return toInstance(EliminationChampionshipResponseDTO, {
      id,
      name,
      type,
      ...mapper.map(championship.phaseManager, request, PhaseManagerResponseDTO),
    });
  }
}
