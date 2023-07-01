import { ApiProperty } from '@nestjs/swagger';
import { PartialCardsResponse } from 'src/responses/partialCards.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PartialCardsResponseDTO extends ResponseDTOFactory implements PartialCardsResponse {
  @ApiProperty()
  red: number;
  @ApiProperty()
  yellow: number;

  static from(
    status: TeamStatus,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): PartialCardsResponseDTO {
    const { reds, yellows } = status;
    return toInstance(PartialCardsResponseDTO, { red: reds.length, yellow: yellows.length });
  }
}
