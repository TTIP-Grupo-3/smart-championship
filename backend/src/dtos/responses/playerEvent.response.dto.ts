import { ApiProperty } from '@nestjs/swagger';
import { PlayerEventResponse } from 'src/responses/playerEvent.response';
import { PlayerResponseDTO } from './player.response.dto';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { Card } from 'src/entities/card.entity';
import { Goal } from 'src/entities/goal.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PlayerEventResponseDTO extends ResponseDTOFactory implements PlayerEventResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  minute: number;
  @ApiProperty({ type: PlayerResponseDTO })
  player: PlayerResponseDTO;

  static from(
    event: Card | Goal,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): PlayerEventResponseDTO {
    const { id, minute, player } = event;
    return toInstance(PlayerEventResponseDTO, {
      id,
      minute,
      player: mapper.map(player, request, PlayerResponseDTO),
    });
  }
}
