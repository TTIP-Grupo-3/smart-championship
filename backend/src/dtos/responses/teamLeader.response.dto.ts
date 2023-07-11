import { TeamLeaderResponse } from 'src/responses/teamLeader.response';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LeaderTeamResponseDTO } from './leaderTeam.response.dto';
import { TeamLeaderEnrollmentResponseDTO } from './teamLeaderEnrollment.response.dto';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class TeamLeaderResponseDTO extends ResponseDTOFactory implements TeamLeaderResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  minimumSize: number;
  @ApiProperty({ type: LeaderTeamResponseDTO, required: false, nullable: true })
  @Type(() => LeaderTeamResponseDTO)
  team?: LeaderTeamResponseDTO;
  @ApiProperty({ type: TeamLeaderEnrollmentResponseDTO, isArray: true })
  @Type(() => TeamLeaderEnrollmentResponseDTO)
  enrollments: Array<TeamLeaderEnrollmentResponseDTO>;

  static from(
    teamLeader: TeamLeader,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): TeamLeaderResponseDTO {
    const { id, name, team, minimumTeamSize: minimumSize, enrollments } = teamLeader;
    return toInstance(TeamLeaderResponseDTO, {
      id,
      name,
      minimumSize,
      team: team ? mapper.map(team, request, LeaderTeamResponseDTO) : null,
      enrollments: mapper.map(enrollments, request, TeamLeaderEnrollmentResponseDTO),
    });
  }
}
