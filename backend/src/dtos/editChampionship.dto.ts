import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsOptional } from 'class-validator';
import { ChampionshipType } from 'src/enums/championshipType.enum';

export class EditChampionshipDTO {
  @ApiProperty()
  @IsOptional()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  @IsEnum(ChampionshipType)
  @IsOptional()
  type: ChampionshipType;
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
