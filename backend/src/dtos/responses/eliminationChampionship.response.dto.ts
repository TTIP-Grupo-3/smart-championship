import { ApiProperty } from '@nestjs/swagger';
import { EliminationChampionshipResponse } from 'src/responses/eliminationChampionship.response';
import { PhaseManagerResponseDTO } from './phaseManager.response.dto';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { Type } from 'class-transformer';
import { ChampionshipResponseDTO } from './championship.response.dto';
import { ChampionshipType } from 'src/enums/championshipType.enum';

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
}
