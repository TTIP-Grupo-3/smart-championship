import { ApiProperty } from '@nestjs/swagger';
import { LeaderTeamResponse } from 'src/responses/leaderTeam.response';
import { PlayerResponseDTO } from './player.response.dto';
import { Type } from 'class-transformer';
export class LeaderTeamResponseDTO implements LeaderTeamResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  logo?: string;
  @ApiProperty({ type: PlayerResponseDTO, isArray: true })
  @Type(() => PlayerResponseDTO)
  players: Array<PlayerResponseDTO>;
}
