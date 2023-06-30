import { PhaseResponse } from 'src/responses/phase.response';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PhaseResponseDTO implements PhaseResponse {
  @ApiProperty({ type: PartialMatchResponseDTO, isArray: true })
  matches: Array<PartialMatchResponseDTO>;
}
