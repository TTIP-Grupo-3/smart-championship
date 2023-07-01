import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MatchResponse, MatchResponseStatus } from 'src/responses/match.response';
import { TeamStatusResponseDTO } from './teamStatus.response.dto';
import { Match } from 'src/entities/match.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class MatchResponseDTO extends ResponseDTOFactory implements MatchResponse {
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

  static from(match: Match, request: UserRequestInfo, mapper: EntityToDTOMapper): MatchResponseDTO {
    const { id, status: matchStatus } = match;
    const { localStatus, visitingStatus, status, date, start, end } = matchStatus;
    const local = localStatus.team ? mapper.map(localStatus, request, TeamStatusResponseDTO) : null;
    const visiting = visitingStatus.team
      ? mapper.map(visitingStatus, request, TeamStatusResponseDTO)
      : null;
    return toInstance(MatchResponseDTO, { id, date, start, end, status, local, visiting });
  }
}
