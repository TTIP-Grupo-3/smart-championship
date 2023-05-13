import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ChampionshipIdDTO } from './championshipId.dto';

export class MatchIdDTO extends ChampionshipIdDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
}
