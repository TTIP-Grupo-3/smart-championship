import { PayStatus } from 'src/enums/payStatus.enum';

export interface TeamLeaderEnrollmentResponse {
  id: number;
  championship: string;
  price: number;
  status: PayStatus;
}
