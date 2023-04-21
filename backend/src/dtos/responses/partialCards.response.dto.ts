import { ApiProperty } from '@nestjs/swagger';
import { PartialCardsResponse } from 'src/responses/partialCards.response';

export class PartialCardsResponseDTO implements PartialCardsResponse {
  @ApiProperty()
  red: number;
  @ApiProperty()
  yellow: number;
}
