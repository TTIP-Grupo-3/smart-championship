import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { ChampionshipResponse } from 'src/responses/championship.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';

export abstract class ChampionshipResponseDTO extends ResponseDTOFactory implements ChampionshipResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;
}
