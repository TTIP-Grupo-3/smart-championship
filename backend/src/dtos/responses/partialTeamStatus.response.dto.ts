import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialTeamStatusResponse } from 'src/responses/partialTeamStatus.response';
import { PartialCardsResponseDTO } from './partialCards.response.dto';

export class PartialTeamStatusResponseDTO implements PartialTeamStatusResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  goals: number;
  @ApiProperty({ type: PartialCardsResponseDTO })
  @Type(() => PartialCardsResponseDTO)
  cards: PartialCardsResponseDTO;
}
