import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MatchResponse, MatchResponseStatus } from 'src/responses/match.response';
import { TeamStatusResponseDTO } from './teamStatus.response.dto';

export class MatchResponseDTO implements MatchResponse {
  @ApiProperty()
  id: number;
  @ApiProperty({ example: new Date() })
  date: string;
  @ApiProperty({ example: new Date() })
  start: string;
  @ApiProperty({ example: new Date() })
  end: string;
  @ApiProperty({ enum: MatchResponseStatus })
  status: MatchResponseStatus;
  @ApiProperty({ type: TeamStatusResponseDTO })
  @Type(() => TeamStatusResponseDTO)
  local: TeamStatusResponseDTO;
  @ApiProperty({ type: TeamStatusResponseDTO })
  @Type(() => TeamStatusResponseDTO)
  visiting: TeamStatusResponseDTO;
}
