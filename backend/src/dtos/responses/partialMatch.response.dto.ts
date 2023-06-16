import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialMatchResponse } from 'src/responses/partialMatch.response';
import { PartialTeamStatusResponseDTO } from './partialTeamStatus.response.dto';
import { MatchResponseStatus } from 'src/responses/match.response';

export class PartialMatchResponseDTO implements PartialMatchResponse {
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
  @ApiProperty({ type: PartialTeamStatusResponseDTO })
  @Type(() => PartialTeamStatusResponseDTO)
  local: PartialTeamStatusResponseDTO;
  @ApiProperty({ type: PartialTeamStatusResponseDTO })
  @Type(() => PartialTeamStatusResponseDTO)
  visiting: PartialTeamStatusResponseDTO;
}
