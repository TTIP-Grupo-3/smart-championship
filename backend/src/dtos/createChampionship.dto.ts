import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { ChampionshipType } from 'src/services/championship.service';

export class CreateChampionshipDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  @IsEnum(ChampionshipType)
  @IsNotEmpty()
  type: ChampionshipType;
  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(Date.parse(value)))
  date: Date;
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  size: number;
  @ApiProperty()
  @IsNotEmpty()
  price: number;
}
