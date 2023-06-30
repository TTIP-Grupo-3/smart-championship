import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PhaseManagerResponse } from 'src/responses/phaseManager.response';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';

export class PhaseManagerResponseDTO implements PhaseManagerResponse {
  @ApiProperty({ type: PartialMatchResponseDTO, isArray: true })
  @Type(() => PartialMatchResponseDTO)
  matches: PartialMatchResponseDTO[];
  @ApiProperty({ type: PhaseManagerResponseDTO, nullable: true })
  @Type(() => PhaseManagerResponseDTO)
  next: PhaseManagerResponseDTO | null;
}
