import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TeamStatusResponse } from 'src/responses/teamStatus.response';
import { PlayerEventResponseDTO } from './playerEvent.response.dto';
import { CardsResponseDTO } from './cards.response.dto';

export class TeamStatusResponseDTO implements TeamStatusResponse {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: PlayerEventResponseDTO, isArray: true })
  @Type(() => PlayerEventResponseDTO)
  goals: Array<PlayerEventResponseDTO>;
  @ApiProperty({ type: CardsResponseDTO })
  @Type(() => CardsResponseDTO)
  cards: CardsResponseDTO;
}
