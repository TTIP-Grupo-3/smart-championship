import { IsNotEmpty, IsNumber } from 'class-validator';

export class IdDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
