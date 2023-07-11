import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PartialTeamStatusResponse } from 'src/responses/partialTeamStatus.response';
import { PartialCardsResponseDTO } from './partialCards.response.dto';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PartialTeamStatusResponseDTO extends ResponseDTOFactory implements PartialTeamStatusResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  logo: string;
  @ApiProperty()
  goals: number;
  @ApiProperty({ type: PartialCardsResponseDTO })
  @Type(() => PartialCardsResponseDTO)
  cards: PartialCardsResponseDTO;

  static from(
    status: TeamStatus,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): PartialTeamStatusResponseDTO {
    const { team, goals } = status;
    return toInstance(PartialTeamStatusResponseDTO, {
      name: team.name,
      logo: team.logo,
      goals: goals.length,
      cards: mapper.map(status, request, PartialCardsResponseDTO),
    });
  }
}
