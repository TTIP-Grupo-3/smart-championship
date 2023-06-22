import { TeamLeaderChampionshipResponse } from 'src/responses/teamLeaderChampionship.response';
import { PartialAdminChampionshipResponseDTO } from './partialAdminChampionship.response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class TeamLeaderChampionshipResponseDTO
  extends PartialAdminChampionshipResponseDTO
  implements TeamLeaderChampionshipResponse
{
  @ApiProperty()
  isEnrolled: boolean;
}
