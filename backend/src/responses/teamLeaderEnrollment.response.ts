import { PayStatus } from 'src/enums/payStatus.enum';
import { ChampionshipResponse } from './championship.response';

export interface TeamLeaderEnrollmentResponse {
  id: number;
  championship: ChampionshipResponse;
  price: number;
  status: PayStatus;
}
