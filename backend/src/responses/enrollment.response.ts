import { PayStatus } from 'src/enums/payStatus.enum';

export interface EnrollmentResponse {
  id: number;
  price: number;
  status: PayStatus;
  receipt?: string;
}
