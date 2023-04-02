import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TeamStatusResponse } from 'src/responses/teamStatus.response';
import { CardsResponseDTO } from './cards.response.dto';

export class TeamStatusResponseDTO implements TeamStatusResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  goals: number;
  @ApiProperty({ type: CardsResponseDTO })
  @Type(() => CardsResponseDTO)
  cards: CardsResponseDTO;
}
