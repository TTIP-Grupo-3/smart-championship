import { ApiProperty } from '@nestjs/swagger';
import { CardsResponse } from 'src/responses/cards.response';

export class CardsResponseDTO implements CardsResponse {
  @ApiProperty()
  red: number;
  @ApiProperty()
  yellow: number;
}
