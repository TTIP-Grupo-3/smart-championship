import { ChampionshipType } from 'src/enums/championshipType.enum';
import { PayStatus } from 'src/enums/payStatus.enum';

export interface TeamLeaderEnrollmentResponse {
  id: number;
  championship: string;
  type: ChampionshipType;
  price: number;
  status: PayStatus;
}
