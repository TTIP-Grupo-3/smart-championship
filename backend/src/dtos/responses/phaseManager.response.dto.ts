import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PhaseManagerResponse } from 'src/responses/phaseManager.response';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { PhaseManager } from 'src/entities/phaseManager.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class PhaseManagerResponseDTO extends ResponseDTOFactory implements PhaseManagerResponse {
  @ApiProperty({ type: PartialMatchResponseDTO, isArray: true })
  @Type(() => PartialMatchResponseDTO)
  matches: PartialMatchResponseDTO[];
  @ApiProperty({ type: PhaseManagerResponseDTO, nullable: true })
  @Type(() => PhaseManagerResponseDTO)
  next: PhaseManagerResponseDTO | null;

  static from(
    phaseManager: PhaseManager,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): PhaseManagerResponseDTO {
    const { phase, next } = phaseManager;
    const { matches } = phase;
    return toInstance(PhaseManagerResponseDTO, {
      matches: mapper.map(matches, request, PartialMatchResponseDTO),
      next: next ? mapper.map(next, request, PhaseManagerResponseDTO) : null,
    });
  }
}
