import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialMatchResponse } from 'src/responses/partialMatch.response';
import { PartialTeamStatusResponseDTO } from './partialTeamStatus.response.dto';
import { MatchResponseStatus } from 'src/responses/match.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { Match } from 'src/entities/match.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PartialMatchResponseDTO extends ResponseDTOFactory implements PartialMatchResponse {
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

  static from(match: Match, request: UserRequestInfo, mapper: EntityToDTOMapper): PartialMatchResponseDTO {
    const { id, status: matchStatus } = match;
    const { localStatus, visitingStatus, status, date, start, end } = matchStatus;
    const local = localStatus.team ? mapper.map(localStatus, request, PartialTeamStatusResponseDTO) : null;
    const visiting = visitingStatus.team
      ? mapper.map(visitingStatus, request, PartialTeamStatusResponseDTO)
      : null;
    return toInstance(PartialMatchResponseDTO, {
      id,
      date,
      start,
      end,
      status,
      local,
      visiting,
    });
  }
}
