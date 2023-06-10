import { IsNotEmpty, IsNumber } from 'class-validator';
import { ChampionshipIdDTO } from './championshipId.dto';
import { Transform } from 'class-transformer';

export class EnrollmentIdDTO extends ChampionshipIdDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
}
