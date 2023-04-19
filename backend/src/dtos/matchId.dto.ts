import { IsNotEmpty, IsNumber } from 'class-validator';

export class MatchIdDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @IsNumber()
  @IsNotEmpty()
  championshipId: number;
}
