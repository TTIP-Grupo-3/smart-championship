import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ChampionshipType } from 'src/services/championship.service';

export class CreateChampionshipDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  @IsEnum(ChampionshipType)
  @IsNotEmpty()
  type: ChampionshipType;
}
