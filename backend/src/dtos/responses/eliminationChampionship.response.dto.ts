import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipResponse } from 'src/responses/championship.response';
import { PhaseResponseDTO } from './phase.response.dto';

export class EliminationChampionshipResponseDTO extends PhaseResponseDTO implements ChampionshipResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}
