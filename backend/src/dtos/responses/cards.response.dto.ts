import { ApiProperty } from '@nestjs/swagger';
import { CardsResponse } from 'src/responses/cards.response';
import { PlayerEventResponseDTO } from './playerEvent.response.dto';

export class CardsResponseDTO implements CardsResponse {
  @ApiProperty({ type: PlayerEventResponseDTO, isArray: true })
  red: Array<PlayerEventResponseDTO>;
  @ApiProperty({ type: PlayerEventResponseDTO, isArray: true })
  yellow: Array<PlayerEventResponseDTO>;
}
