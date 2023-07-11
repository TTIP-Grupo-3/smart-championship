import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { MatchDate } from 'src/utils/types';

export class MatchDateDTO implements MatchDate {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({ required: false })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(Date.parse(value)) : undefined))
  date?: Date;
}
