import { ApiProperty } from '@nestjs/swagger';
import { ScoreStatusResponse } from 'src/responses/scoreStatus.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { ScoreStatus } from 'src/entities/scoreStatus.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class ScoreStatusResponseDTO extends ResponseDTOFactory implements ScoreStatusResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  score: number;
  @ApiProperty()
  played: number;
  @ApiProperty()
  tied: number;
  @ApiProperty()
  lost: number;
  @ApiProperty()
  won: number;

  static from(
    status: ScoreStatus,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): ScoreStatusResponseDTO {
    const { team, score, played, tied, lost, won } = status;
    const { id, name } = team;
    return toInstance(ScoreStatusResponseDTO, {
      id,
      name,
      score,
      played: played.length,
      tied: tied.length,
      lost: lost.length,
      won: won.length,
    });
  }
}
