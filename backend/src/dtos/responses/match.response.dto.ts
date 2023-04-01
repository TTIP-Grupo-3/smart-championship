import { ApiProperty } from '@nestjs/swagger';
import { MatchResponse } from 'src/responses/match.response';
import { TeamStatusResponseDTO } from './teamStatus.response.dto';

export class MatchResponseDTO implements MatchResponse {
  @ApiProperty()
  id: number;
  @ApiProperty({ type: TeamStatusResponseDTO })
  local: TeamStatusResponseDTO;
  @ApiProperty({ type: TeamStatusResponseDTO })
  visiting: TeamStatusResponseDTO;
}
