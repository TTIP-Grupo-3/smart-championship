import { ScoreChampionshipResponse } from 'src/responses/scoreChampionship.response';
import { ChampionshipResponseDTO } from './championship.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { ChampionshipType } from 'src/enums/championshipType.enum';

export class ScoreChampionshipResponseDTO
  extends ChampionshipResponseDTO
  implements ScoreChampionshipResponse
{
  @ApiProperty({ enum: ChampionshipType, example: ChampionshipType.SCORE })
  type: ChampionshipType.SCORE = ChampionshipType.SCORE;
  @ApiProperty({ type: PartialMatchResponseDTO, isArray: true })
  @Type(() => PartialMatchResponseDTO)
  matches: Array<PartialMatchResponseDTO>;
}
