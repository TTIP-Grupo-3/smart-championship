import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsInt, IsOptional } from 'class-validator';

export class EditChampionshipDTO {
  @ApiProperty()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(Date.parse(value)))
  date: Date;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  size: number;
  @ApiProperty()
  @IsOptional()
  price: number;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  duration: number;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  teamSize: number;
}
