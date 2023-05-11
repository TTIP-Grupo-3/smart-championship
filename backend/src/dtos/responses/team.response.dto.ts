import { ApiProperty } from '@nestjs/swagger';
import { TeamResponse } from 'src/responses/team.response';
import { PlayerResponseDTO } from './player.response.dto';
import { Type } from 'class-transformer';

export class TeamResponseDTO implements TeamResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  logo: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: PlayerResponseDTO, isArray: true })
  @Type(() => PlayerResponseDTO)
  players: Array<PlayerResponseDTO>;
}
