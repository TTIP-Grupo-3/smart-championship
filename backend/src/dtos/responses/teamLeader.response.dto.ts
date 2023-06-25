import { TeamLeaderResponse } from 'src/responses/teamLeader.response';
import { PlayerResponseDTO } from './player.response.dto';
import { TeamLeaderEnrollmentResponseDTO } from './teamLeaderEnrollment.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TeamLeaderResponseDTO implements TeamLeaderResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  team: string;
  @ApiProperty({ required: false })
  logo?: string;
  @ApiProperty({ type: PlayerResponseDTO, isArray: true })
  @Type(() => PlayerResponseDTO)
  players: Array<PlayerResponseDTO>;
  @ApiProperty({ type: TeamLeaderEnrollmentResponseDTO, isArray: true })
  @Type(() => TeamLeaderEnrollmentResponseDTO)
  enrollments: Array<TeamLeaderEnrollmentResponseDTO>;
}
