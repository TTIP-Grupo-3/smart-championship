import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { PartialChampionshipResponse } from 'src/responses/partialChampionship.response';

export class PartialChampionshipResponseDTO implements PartialChampionshipResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;
}
