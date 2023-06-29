import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreatePlayerDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  number: number;
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  dni: number;
}
