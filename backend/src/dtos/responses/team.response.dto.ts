import { ApiProperty } from '@nestjs/swagger';
import { TeamResponse } from 'src/responses/team.response';
import { PlayerResponseDTO } from './player.response.dto';
import { Type } from 'class-transformer';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { ChampionshipTeam } from 'src/entities/championshipTeam.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class TeamResponseDTO extends ResponseDTOFactory implements TeamResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  logo: string;
  @ApiProperty()
  name: string;
  @ApiProperty({ type: PlayerResponseDTO, isArray: true })
  @Type(() => PlayerResponseDTO)
  players: Array<PlayerResponseDTO>;

  static from(
    team: ChampionshipTeam,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): TeamResponseDTO {
    const { id, name, players } = team;
    return toInstance(TeamResponseDTO, {
      id,
      name,
      players: mapper.map(players, request, PlayerResponseDTO),
    });
  }
}
