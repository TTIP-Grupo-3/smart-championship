import { ApiProperty } from '@nestjs/swagger';
import { PhaseResponse } from 'src/responses/phase.response';
import { MatchResponseDTO } from './match.response.dto';

export class PhaseResponseDTO implements PhaseResponse {
  @ApiProperty({ type: MatchResponseDTO })
  matches: MatchResponseDTO[];
  @ApiProperty({ type: PhaseResponseDTO, nullable: true })
  next: PhaseResponseDTO | null;
}
