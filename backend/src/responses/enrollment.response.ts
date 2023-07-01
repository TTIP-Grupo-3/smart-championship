import { PayStatus } from 'src/enums/payStatus.enum';
import { ChampionshipResponse } from './championship.response';

export interface EnrollmentResponse {
  id: number;
  name: string;
  championship: ChampionshipResponse;
  price: number;
  status: PayStatus;
  receipt?: string;
}
