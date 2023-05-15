import { ScoreChampionshipResponse } from 'src/responses/scoreChampionship.response';
import { ChampionshipType } from 'src/services/championship.service';
import { ChampionshipResponseDTO } from './championship.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';

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
