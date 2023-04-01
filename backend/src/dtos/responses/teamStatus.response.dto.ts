import { ApiProperty } from '@nestjs/swagger';
import { TeamStatusResponse } from 'src/responses/teamStatus.response';
import { CardsResponseDTO } from './cards.response';

export class TeamStatusResponseDTO implements TeamStatusResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  goals: number;
  @ApiProperty({ type: CardsResponseDTO })
  cards: CardsResponseDTO;
}
