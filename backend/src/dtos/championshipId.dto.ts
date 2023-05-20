import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ChampionshipIdDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  championshipId: number;
}
