import { PhaseResponse } from 'src/responses/phase.response';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { Phase } from 'src/entities/phase.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PhaseResponseDTO extends ResponseDTOFactory implements PhaseResponse {
  @ApiProperty({ type: PartialMatchResponseDTO, isArray: true })
  matches: Array<PartialMatchResponseDTO>;

  static from(phase: Phase, request: UserRequestInfo, mapper: EntityToDTOMapper): PhaseResponseDTO {
    const { matches } = phase;
    return toInstance(PhaseResponseDTO, {
      matches: mapper.map(matches, request, PartialMatchResponseDTO),
    });
  }
}
