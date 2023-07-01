import { ApiProperty } from '@nestjs/swagger';
import { LeaderTeamResponse } from 'src/responses/leaderTeam.response';
import { PlayerResponseDTO } from './player.response.dto';
import { Type } from 'class-transformer';
import { Team } from 'src/entities/team.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class LeaderTeamResponseDTO extends ResponseDTOFactory implements LeaderTeamResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false })
  logo?: string;
  @ApiProperty({ type: PlayerResponseDTO, isArray: true })
  @Type(() => PlayerResponseDTO)
  players: Array<PlayerResponseDTO>;

  static from(team: Team, request: UserRequestInfo, mapper: EntityToDTOMapper): LeaderTeamResponseDTO {
    const { id, name, logo, players } = team;
    return toInstance(LeaderTeamResponseDTO, {
      id,
      name,
      logo,
      players: mapper.map(players, request, PlayerResponseDTO),
    });
  }
}
