import { TeamLeaderResponse } from 'src/responses/teamLeader.response';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { LeaderTeamResponseDTO } from './leaderTeam.response.dto';
import { TeamLeaderEnrollmentResponseDTO } from './teamLeaderEnrollment.response.dto';

export class TeamLeaderResponseDTO implements TeamLeaderResponse {
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
}
