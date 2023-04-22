import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class MatchIdDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  id: number;
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  championshipId: number;
}
