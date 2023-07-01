import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TeamStatusResponse } from 'src/responses/teamStatus.response';
import { PlayerEventResponseDTO } from './playerEvent.response.dto';
import { CardsResponseDTO } from './cards.response.dto';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class TeamStatusResponseDTO extends ResponseDTOFactory implements TeamStatusResponse {
  @ApiProperty()
  name: string;
  @ApiProperty({ type: PlayerEventResponseDTO, isArray: true })
  @Type(() => PlayerEventResponseDTO)
  goals: Array<PlayerEventResponseDTO>;
  @ApiProperty({ type: CardsResponseDTO })
  @Type(() => CardsResponseDTO)
  cards: CardsResponseDTO;

  static from(
    status: TeamStatus,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): TeamStatusResponseDTO {
    const { team, goals } = status;
    return toInstance(TeamStatusResponseDTO, {
      name: team.name,
      logo: team.logo,
      goals: mapper.map(goals, request, PlayerEventResponseDTO),
      cards: mapper.map(status, request, CardsResponseDTO),
    });
  }
}
