import { ApiProperty } from '@nestjs/swagger';
import { PlayerResponse } from 'src/responses/player.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { ChampionshipPlayer } from 'src/entities/championshipPlayer.entity';
import { Player } from 'src/entities/player.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PlayerResponseDTO extends ResponseDTOFactory implements PlayerResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  number: number;
  @ApiProperty()
  dni: number;

  static from(
    player: Player | ChampionshipPlayer,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): PlayerResponseDTO {
    const { id, name, number, dni } = player;
    return toInstance(PlayerResponseDTO, { id, name, number, dni });
  }
}
