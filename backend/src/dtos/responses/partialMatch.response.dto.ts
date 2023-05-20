import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialMatchResponse } from 'src/responses/partialMatch.response';
import { PartialTeamStatusResponseDTO } from './partialTeamStatus.response.dto';

export class PartialMatchResponseDTO implements PartialMatchResponse {
  @ApiProperty()
  id: number;
  @ApiProperty({ example: new Date() })
  date: string;
  @ApiProperty({ example: new Date() })
  start: string;
  @ApiProperty({ example: new Date() })
  end: string;
  @ApiProperty({ type: PartialTeamStatusResponseDTO })
  @Type(() => PartialTeamStatusResponseDTO)
  local: PartialTeamStatusResponseDTO;
  @ApiProperty({ type: PartialTeamStatusResponseDTO })
  @Type(() => PartialTeamStatusResponseDTO)
  visiting: PartialTeamStatusResponseDTO;
}
