import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MatchResponse } from 'src/responses/match.response';
import { TeamStatusResponseDTO } from './teamStatus.response.dto';

export class MatchResponseDTO implements MatchResponse {
  @ApiProperty()
  id: number;
  @ApiProperty({ type: TeamStatusResponseDTO })
  @Type(() => TeamStatusResponseDTO)
  local: TeamStatusResponseDTO;
  @ApiProperty({ type: TeamStatusResponseDTO })
  @Type(() => TeamStatusResponseDTO)
  visiting: TeamStatusResponseDTO;
}
