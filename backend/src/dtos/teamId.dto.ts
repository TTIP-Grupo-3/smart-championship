import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TeamIdDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  teamId: number;
}