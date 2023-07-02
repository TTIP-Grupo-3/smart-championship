import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { PayDataDTO } from './payData.dto';

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
  @ApiProperty()
  @IsNotEmpty()
  duration: number;
  @ApiProperty()
  @IsNotEmpty()
  teamSize: number;
  @ApiProperty({ type: PayDataDTO })
  @ValidateNested()
  @Type(() => PayDataDTO)
  payData: PayDataDTO;
}
