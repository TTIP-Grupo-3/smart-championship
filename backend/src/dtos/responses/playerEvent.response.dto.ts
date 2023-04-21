import { ApiProperty } from '@nestjs/swagger';
import { PlayerEventResponse } from 'src/responses/playerEvent.response';
import { PlayerResponseDTO } from './player.response.dto';

export class PlayerEventResponseDTO implements PlayerEventResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  minute: number;
  @ApiProperty({ type: PlayerResponseDTO })
  player: PlayerResponseDTO;
}
