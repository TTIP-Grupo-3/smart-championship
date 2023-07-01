import { ApiProperty } from '@nestjs/swagger';
import { CardsResponse } from 'src/responses/cards.response';
import { PlayerEventResponseDTO } from './playerEvent.response.dto';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { UserRequestInfo } from 'src/utils/types';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class CardsResponseDTO extends ResponseDTOFactory implements CardsResponse {
  @ApiProperty({ type: PlayerEventResponseDTO, isArray: true })
  red: Array<PlayerEventResponseDTO>;
  @ApiProperty({ type: PlayerEventResponseDTO, isArray: true })
  yellow: Array<PlayerEventResponseDTO>;

  static from(status: TeamStatus, request: UserRequestInfo, mapper: EntityToDTOMapper): CardsResponseDTO {
    const { reds, yellows } = status;
    return toInstance(CardsResponseDTO, {
      red: mapper.map(reds, request, PlayerEventResponseDTO),
      yellow: mapper.map(yellows, request, PlayerEventResponseDTO),
    });
  }
}
