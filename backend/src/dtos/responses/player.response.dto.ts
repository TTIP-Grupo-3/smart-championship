import { ApiProperty } from '@nestjs/swagger';
import { PlayerResponse } from 'src/responses/player.response';

export class PlayerResponseDTO implements PlayerResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  number: number;
}
