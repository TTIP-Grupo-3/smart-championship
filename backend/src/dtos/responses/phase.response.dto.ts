import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PhaseResponse } from 'src/responses/phase.response';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';

export class PhaseResponseDTO implements PhaseResponse {
  @ApiProperty({ type: PartialMatchResponseDTO })
  @Type(() => PartialMatchResponseDTO)
  matches: PartialMatchResponseDTO[];
  @ApiProperty({ type: PhaseResponseDTO, nullable: true })
  @Type(() => PhaseResponseDTO)
  next: PhaseResponseDTO | null;
}
