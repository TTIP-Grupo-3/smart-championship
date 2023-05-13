import { OmitType } from '@nestjs/swagger';
import { ChampionshipIdDTO } from './championshipId.dto';
import { ChampionshipType } from 'src/services/championship.service';

export class ScoreChampionshipIdDTO extends OmitType(ChampionshipIdDTO, ['championshipType'] as const) {
  readonly championshipType = ChampionshipType.SCORE;
}
