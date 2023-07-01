import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MatchTeamsResponse } from 'src/responses/matchTeams.response';
import { TeamResponseDTO } from './team.response.dto';
import { Match } from 'src/entities/match.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class MatchTeamsResponseDTO extends ResponseDTOFactory implements MatchTeamsResponse {
  @ApiProperty()
  id: number;
  @ApiProperty({ example: new Date() })
  date: string;
  @ApiProperty({ example: new Date() })
  start: string;
  @ApiProperty({ example: new Date() })
  end: string;
  @ApiProperty()
  championshipId: number;
  @ApiProperty({ type: TeamResponseDTO })
  @Type(() => TeamResponseDTO)
  local: TeamResponseDTO;
  @ApiProperty({ type: TeamResponseDTO })
  @Type(() => TeamResponseDTO)
  visiting: TeamResponseDTO;

  static from(match: Match, request: UserRequestInfo, mapper: EntityToDTOMapper): MatchTeamsResponseDTO {
    const { id, status: matchStatus, championship } = match;
    const { localStatus, visitingStatus, date, start, end } = matchStatus;
    const { id: championshipId } = championship;
    const local = localStatus.team ? mapper.map(localStatus.team, request, TeamResponseDTO) : null;
    const visiting = visitingStatus.team ? mapper.map(visitingStatus.team, request, TeamResponseDTO) : null;
    return toInstance(MatchTeamsResponseDTO, {
      id,
      date,
      start,
      end,
      championshipId,
      local,
      visiting,
    });
  }
}
