import { ApiProperty } from '@nestjs/swagger';
import { ScoreStatusResponse } from 'src/responses/scoreStatus.response';

export class ScoreStatusResponseDTO implements ScoreStatusResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  played: number;
  @ApiProperty()
  tied: number;
  @ApiProperty()
  lost: number;
  @ApiProperty()
  won: number;
}
