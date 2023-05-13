import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipResponse } from 'src/responses/championship.response';
import { ChampionshipType } from 'src/services/championship.service';

export class ChampionshipResponseDTO implements ChampionshipResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;
}
