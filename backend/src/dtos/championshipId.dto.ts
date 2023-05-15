import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ChampionshipType } from 'src/services/championship.service';

export class ChampionshipIdDTO<T extends ChampionshipType = ChampionshipType> {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  championshipId: number;
  @IsEnum(ChampionshipType)
  @IsNotEmpty()
  championshipType: T;
}
