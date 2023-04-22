import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MatchTeamsResponse } from 'src/responses/matchTeams.response';
import { TeamResponseDTO } from './team.response.dto';

export class MatchTeamsResponseDTO implements MatchTeamsResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  championshipId: number;
  @ApiProperty({ type: TeamResponseDTO })
  @Type(() => TeamResponseDTO)
  local: TeamResponseDTO;
  @ApiProperty({ type: TeamResponseDTO })
  @Type(() => TeamResponseDTO)
  visiting: TeamResponseDTO;
}
