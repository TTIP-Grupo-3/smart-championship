import { PayStatus } from 'src/enums/payStatus.enum';
import { ChampionshipResponse } from './championship.response';
import { PayDataResponse } from './payData.response';

export interface EnrollmentResponse {
  id: number;
  name: string;
  championship: ChampionshipResponse;
  price: number;
  status: PayStatus;
  receipt?: string;
  payData: PayDataResponse;
}
