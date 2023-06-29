import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { PayStatus } from 'src/enums/payStatus.enum';
import { TeamLeaderEnrollmentResponse } from 'src/responses/teamLeaderEnrollment.response';

export class TeamLeaderEnrollmentResponseDTO implements TeamLeaderEnrollmentResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  championship: string;
  @ApiProperty()
  price: number;
  @ApiProperty({ enum: PayStatus })
  status: PayStatus;
  @ApiProperty({ enum: ChampionshipType })
  type: ChampionshipType;
}
