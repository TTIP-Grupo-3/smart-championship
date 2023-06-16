import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { ChampionshipResponse } from 'src/responses/championship.response';

export class ChampionshipResponseDTO implements ChampionshipResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;
}
