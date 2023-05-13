import { ApiProperty } from '@nestjs/swagger';
import { PartialChampionshipResponse } from 'src/responses/partialChampionship.response';
import { ChampionshipType } from 'src/services/championship.service';

export class PartialChampionshipResponseDTO implements PartialChampionshipResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;
}
