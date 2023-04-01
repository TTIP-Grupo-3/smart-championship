import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PhaseResponse } from 'src/responses/phase.response';
import { MatchResponseDTO } from './match.response.dto';

export class PhaseResponseDTO implements PhaseResponse {
  @ApiProperty({ type: MatchResponseDTO })
  @Type(() => MatchResponseDTO)
  matches: MatchResponseDTO[];
  @ApiProperty({ type: PhaseResponseDTO, nullable: true })
  @Type(() => PhaseResponseDTO)
  next: PhaseResponseDTO | null;
}
